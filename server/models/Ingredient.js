const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
    {
        ingredientName: String,
        onHandQty: Number
    }
);

const Ingredient = mongoose.model("Ingredient", ingredientSchema);

module.exports = Ingredient