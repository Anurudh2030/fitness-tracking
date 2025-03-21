// const express = require("express");
// const { addNutrition } = require("../controllers/nutritionController");
// const { protect } = require("../middleware/authMiddleware");

// const router = express.Router();

// router.post("/", protect, addNutrition);

// module.exports = router;

const express = require("express");
const { addNutrition } = require("../controllers/nutritionController");
const { protect } = require("../middleware/authMiddleware"); // No .js extension in require

const router = express.Router();

router.post("/", protect, addNutrition);

module.exports = router; 


