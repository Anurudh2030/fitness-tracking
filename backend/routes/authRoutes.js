const express = require("express");
const { register, login } = require("../controllers/authController"); // Import controller functions
const router = express.Router();

router.post("/register", register); // Registration Route
router.post("/login", login); // Login Route

module.exports = router;
