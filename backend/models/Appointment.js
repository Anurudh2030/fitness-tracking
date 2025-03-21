const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  trainer: { type: mongoose.Schema.Types.ObjectId, ref: "Trainer", required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "canceled", "completed"], default: "pending" }
}, { timestamps: true });

module.exports = mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema);
