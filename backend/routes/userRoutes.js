// const express = require("express");
// const { authUser, registerUser, getUserProfile } = require("../controllers/userController");  
// const { protect, admin } = require("../middleware/authMiddleware");  

// const router = express.Router();

// // Routes
// router.post("/register", registerUser);
// router.post("/login", authUser);
// router.get("/profile", protect, getUserProfile);

// // Admin route (Optional)
// router.get("/admin", protect, admin, (req, res) => {
//   res.json({ message: "Admin access granted" });
// });

// module.exports = router;

const express = require("express");
const {
  authUser,
  registerUser,
  getUserProfile,
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// User Registration
router.post("/register", registerUser);

// User Login
router.post("/login", authUser);

// Get User Profile (Protected Route)
router.get("/profile", protect, getUserProfile);

// Admin-only Route (Optional)
router.get("/admin", protect, admin, (req, res) => {
  res.json({ message: "Admin access granted" });
});

// Handle invalid routes
router.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

module.exports = router;
