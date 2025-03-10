const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  weight: { type: Number, required: false },
});

const workoutSchema = mongoose.Schema({
    title: { type: String, required: true },
    exercises: [
      {
        name: { type: String, required: true },
        sets: { type: Number, required: true },
        reps: { type: Number, required: true },
      },
    ],
  }, { timestamps: true });

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
