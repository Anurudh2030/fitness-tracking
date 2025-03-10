const asyncHandler = require("express-async-handler");
const Nutrition = require("../models/NutritionModel");

const addNutrition = asyncHandler(async (req, res) => {
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

module.exports = { addNutrition };
