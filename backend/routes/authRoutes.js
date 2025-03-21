// const express = require("express");
// const { register, login } = require("../controllers/authController"); // Import controller functions
// const router = express.Router();

// router.post("/register", register); // Registration Route
// //router.post("/login", login);
// router.post("/users/login", login);// Login Route

// module.exports = router;


const express = require("express");
const router = express.Router();
const { loginUser } = require("../controllers/authController");

router.post("/users/login", loginUser); // ✅ This must match your frontend request!

module.exports = router;
