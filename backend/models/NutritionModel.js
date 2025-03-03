const mongoose = require("mongoose");

const nutritionSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  foodItem: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model("Nutrition", nutritionSchema);
