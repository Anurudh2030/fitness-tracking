const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
// Use the correct path to your middleware
const { protect } = require("../middleware/authMiddleware");

// Import controller methods individually to ensure they're functions
const { 
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment
} = require("../controllers/appointmentController");

// Define routes using controller methods
router.post("/create", createAppointment);
router.get("/", getAllAppointments);
router.get("/:id", getAppointmentById);
router.put("/:id", updateAppointment);
router.delete("/:id", deleteAppointment);

// Direct route for booking an appointment
router.post("/book", protect, async (req, res) => {
  try {
    const { trainerId, date, timeSlot } = req.body;

    if (!trainerId || !date || !timeSlot) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newAppointment = new Appointment({
      user: req.user.id,
      trainer: trainerId,
      date,
      timeSlot,
      status: "Pending",
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;