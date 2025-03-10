const express = require("express");
const router = express.Router();
const trainerController = require("../controllers/trainerController");


router.post("/register", trainerController.registerTrainer);
router.get("/", trainerController.getTrainers);
router.post("/assign-client", trainerController.assignClient);

module.exports = router;
