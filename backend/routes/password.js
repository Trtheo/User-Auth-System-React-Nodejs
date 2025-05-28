const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const db = require("../db");
const bcrypt = require("bcrypt");

const resetTokens = {}; // In-memory store (use Redis/db in production)

// 🔐 POST /api/password/forgot-password
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Email is required" });

  db.get("SELECT * FROM users WHERE email = ?", [email], (err, user) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!user) return res.status(404).json({ error: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    resetTokens[token] = {
      userId: user.id,
      email: user.email,
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
    };

    console.log(
      `🔗 Reset link: http://localhost:3000/reset-password?token=${token}`
    );

    // You may also set the token in cookie if needed
    // res.cookie('reset_token', token, { httpOnly: true, maxAge: 15 * 60 * 1000 });

    return res.json({
      message: "Reset token generated successfully.",
      token,
    });
  });
});

// 🔄 POST /api/password/reset-password
router.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;

  const data = resetTokens[token];
  if (!data || data.expires < Date.now()) {
    return res.status(400).json({ error: "Token expired or invalid" });
  }

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    db.run(
      "UPDATE users SET password = ? WHERE id = ?",
      [hashedPassword, data.userId],
      (err) => {
        if (err) return res.status(500).json({ error: "Reset failed" });

        delete resetTokens[token]; // 🧹 Remove token after use
        return res.json({
          message: "Password updated successfully",
          email: data.email,
        });
      }
    );
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
