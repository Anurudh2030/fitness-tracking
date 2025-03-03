const express = require("express");
const router = express.Router();
//const appointmentController = require("../controllers/appointmentController");
const { bookAppointment } = require("./appointmentController");
router.post("/book", appointmentController.bookAppointment);
router.get("/", appointmentController.getAppointments);

module.exports = router;
