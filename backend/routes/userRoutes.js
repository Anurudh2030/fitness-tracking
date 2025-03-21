// const express = require("express");
// const {
//   getUserDashboard,
//   authUser,
//   registerUser,
//   getUserProfile,
//   updateUserProfile,
//   getAllUsers,
//   deleteUser,
//   getUserById
// } = require("../controllers/userController");
// const { protect, admin } = require("../middleware/authMiddleware");


// const router = express.Router();

// // ✅ User Authentication (Login)
// router.post("/login", authUser);

// // ✅ User Registration
// router.post("/register", registerUser);

// // ✅ Get User Profile (Protected Route)
// router.get("/profile", protect, getUserProfile);

// // ✅ Update User Profile (Protected Route)
// router.put("/profile", protect, updateUserProfile);

// // ✅ Get User Dashboard (Protected Route)
// router.get("/dashboard", protect, getUserDashboard);

// // ✅ Get All Users (Admin Only)
// router.get("/", protect, admin, getAllUsers);

// // ✅ Delete User by ID (Admin Only)
// router.delete("/:id", protect, admin, deleteUser);

// // ✅ Get User by ID
// router.get("/:id", protect, getUserById);

// module.exports = router;


const express = require("express");
const {
  getUserDashboard,
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getAllUsers,
  deleteUser,
  getUserById
} = require("../controllers/userController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ User Authentication (Login)
router.post("/login", authUser);

// ✅ User Registration
router.post("/register", registerUser);

// ✅ Get User Profile (Protected Route)
router.get("/profile", protect, getUserProfile);

// ✅ Update User Profile (Protected Route)
router.put("/profile", protect, updateUserProfile);

// ✅ Get User Dashboard (Protected Route)
router.get("/dashboard", protect, getUserDashboard);

// Test route - protected but not admin-only
router.get("/test-auth", protect, (req, res) => {
  res.json({ 
    message: "Authentication successful!",
    user: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    } 
  });
});

// ✅ Get All Users (Admin Only)
router.get("/", protect, admin, getAllUsers);

// ✅ Delete User by ID (Admin Only)
router.delete("/:id", protect, admin, deleteUser);

// ✅ Get User by ID - MUST BE LAST route with path parameter
router.get("/:id", protect, getUserById);

module.exports = router;