const Appointment = require("../models/Appointment");

const bookAppointment = async (req, res) => {
  try {
    const { userId, trainerId, date, time, status } = req.body;
    const newAppointment = new Appointment({
      userId,
      trainerId,
      date,
      time,
      status: status || "pending",
    });
    await newAppointment.save();
    res.status(201).json({ message: "Appointment booked successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { bookAppointment };

const getAppointments = async (req, res) => {
  try {
    res.status(200).json({ appointments: [] });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = { bookAppointment, getAppointments };

