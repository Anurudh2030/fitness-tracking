const mongoose = require("mongoose");

const nutritionSchema = mongoose.Schema(
  {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      date: { type: Date, default: Date.now },
      meals: [{ food: String, calories: Number, protein: Number, carbs: Number, fats: Number }]
  }
);

module.exports = mongoose.model("Nutrition", nutritionSchema);
