const asyncHandler = require("express-async-handler");
const Workout = require("../models/Workout");
const Nutrition = require("../models/NutritionModel");

const getDashboardData = asyncHandler(async (req, res) => {
  const workouts = await Workout.find({ user: req.user._id });
  const nutrition = await Nutrition.find({ user: req.user._id });

  const totalCaloriesBurned = workouts.reduce((acc, w) => acc + w.caloriesBurned, 0);
  const totalCaloriesConsumed = nutrition.reduce((acc, n) => acc + n.calories, 0);

  res.json({
    totalWorkouts: workouts.length,
    totalCaloriesBurned,
    totalCaloriesConsumed,
    netCalories: totalCaloriesConsumed - totalCaloriesBurned
  });
});

module.exports = { getDashboardData };
