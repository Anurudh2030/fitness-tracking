const express = require("express");
const Appointment = require("../models/Appointment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// 📌 Book an Appointment
router.post("/book", authMiddleware, async (req, res) => {
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
      status: "pending",
    });

    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully", appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = mongoose.model("Appointment", appointmentSchema);

