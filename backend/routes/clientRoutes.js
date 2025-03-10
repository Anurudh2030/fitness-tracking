// const express = require('express');
// const { registerClient, clientLogin, getClientDashboard  } = require('../controllers/clientController');
// const authMiddleware = require("../middleware/authMiddleware");
// const router = express.Router();

// router.get("/dashboard", authMiddleware, getClientDashboard);
// router.post('/register', registerClient);
// router.post('/login', clientLogin);
// module.exports = router;


const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); // Ensure correct path
const { getClientDashboard } = require("../controllers/clientController"); // Ensure correct import

if (!getClientDashboard) {
    throw new Error("getClientDashboard function is undefined. Check your clientController.js");
}

// Protected route for client dashboard
router.get("/dashboard", protect, getClientDashboard);

module.exports = router;