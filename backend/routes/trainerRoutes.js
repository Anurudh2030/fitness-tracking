// const express = require("express");
// const router = express.Router();
// const trainerController = require("../controllers/trainerController");


// router.post("/register", trainerController.registerTrainer);
// router.get("/", trainerController.getTrainers);
// router.post("/assign-client", trainerController.assignClient);

// module.exports = router;



const express = require("express");
const { getTrainers, getTrainerById } = require("../controllers/trainerController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getTrainers);
router.get("/:id", protect, getTrainerById);

module.exports = router;

