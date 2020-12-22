const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
    {
        ingredientName: String,
        imagePath: String,
        onHandQty: Number
    }
);

const foodSchema = new mongoose.Schema(
    {
        foodName: String,
        imagePath: String,
        effect: String,
        onHandQty: Number,
        ingredients:  [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ingredient'
        }]
    }
);

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;

