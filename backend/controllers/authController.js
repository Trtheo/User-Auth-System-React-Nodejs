const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");

// REGISTER
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    db.run(query, [name, email, hashedPassword], function (err) {
      if (err) return res.status(400).json({ error: "Email already exists." });
      res.status(201).json({ id: this.lastID, name, email });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// LOGIN
exports.loginUser = (req, res) => {
  const { email, password } = req.body;
  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!user) return res.status(400).json({ error: "User not found" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid password" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  });
};

// GET ALL USERS
exports.getAllUsers = (req, res) => {
  db.all("SELECT id, name, email FROM users", (err, rows) => {
    if (err) return res.status(500).json({ error: "Failed to fetch users" });
    res.json(rows);
  });
};
