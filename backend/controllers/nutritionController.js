const asyncHandler = require("express-async-handler");
const Nutrition = require("../models/NutritionModel");

const getNutritionLogs = asyncHandler(async (req, res) => {
  try {
    const logs = await Nutrition.find({ user: req.user._id });
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching nutrition logs", error: error.message });
  }
});

const addNutrition = asyncHandler(async (req, res) => { // Renamed function
  const { foodItem, calories, protein, carbs, fats } = req.body;

  if (!foodItem || !calories || !protein || !carbs || !fats) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const nutrition = await Nutrition.create({
      user: req.user._id,
      foodItem,
      calories,
      protein,
      carbs,
      fats,
    });

    res.status(201).json(nutrition);
  } catch (error) {
    res.status(400).json({ message: "Error adding nutrition", error: error.message });
  }
});

module.exports = { getNutritionLogs,addNutrition }; // Updated export