const Workout = require("../models/Workout");

// ✅ Add a new workout
const addWorkout = async (req, res) => {
    try {
        const { title, exercises } = req.body;

        if (!title || !exercises || !Array.isArray(exercises)) {
            return res.status(400).json({ message: "Title and exercises are required" });
        }

        const workout = new Workout({ title, exercises });
        await workout.save();

        res.status(201).json({ message: "Workout added successfully", workout });
    } catch (error) {
        res.status(500).json({ message: "Error adding workout", error: error.message });
    }
};

// ✅ Get all workouts for a user
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workouts", error: error.message });
  }
};

// ✅ Get a single workout by ID
const getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ message: "Error fetching workout", error: error.message });
  }
};

// ✅ Update a workout by ID
const updateWorkout = async (req, res) => {
  try {
    const { title, exercises, duration, caloriesBurned } = req.body;
    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      { title, exercises, duration, caloriesBurned },
      { new: true, runValidators: true }
    );

    if (!updatedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }

    res.status(200).json(updatedWorkout);
  } catch (error) {
    res.status(500).json({ message: "Error updating workout", error: error.message });
  }
};

// ✅ Delete a workout by ID
const deleteWorkout = async (req, res) => {
  try {
    const deletedWorkout = await Workout.findByIdAndDelete(req.params.id);
    if (!deletedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting workout", error: error.message });
  }
};

module.exports = {
    addWorkout,
    getWorkouts,
    getWorkoutById,
    updateWorkout,
    deleteWorkout,
};
