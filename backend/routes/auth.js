const express = require("express");
const router = express.Router();

// Import controller functions
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/authController");

// POST /api/auth/register
router.post("/register", registerUser);

// POST /api/auth/login
router.post("/login", loginUser);

// GET /api/auth/users 
router.get("/users", getAllUsers);

module.exports = router;
