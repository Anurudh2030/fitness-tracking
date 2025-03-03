const express = require("express");
const {
  authUser,
  registerUser,
  getUserProfile
} = require("../controllers/userController");  // Ensure the path is correct

const { protect, admin } = require("../middleware/authMiddleware");  // Ensure this file exists and exports correctly

const router = express.Router();

// Routes
router.post("/signup", registerUser);
router.post("/login", authUser);
router.get("/profile", protect, getUserProfile);

// Admin route (Optional)
router.get("/admin", protect, admin, (req, res) => {
  res.json({ message: "Admin access granted" });
});

module.exports = router;
