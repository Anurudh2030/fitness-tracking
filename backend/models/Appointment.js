const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    trainer: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true },
    date: { type: Date, required: true },
    timeSlot: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Confirmed", "Completed"], default: "Pending" }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", AppointmentSchema);