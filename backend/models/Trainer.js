const mongoose = require("mongoose");
const trainerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    clients: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]  
  });

const Trainer = mongoose.model("Trainer", trainerSchema);
module.exports = Trainer;
