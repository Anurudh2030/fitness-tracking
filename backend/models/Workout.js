const mongoose = require("mongoose");

// Exercise Schema
const exerciseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    sets: { type: Number, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: false }, // Optional weight field
  },
  // Prevents MongoDB from auto-assigning an _id to each exercise
);

// Workout Schema
const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    exercises: [exerciseSchema],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Fix: added user field
  },
  { timestamps: true }
);

// Export the Workout Model
const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
