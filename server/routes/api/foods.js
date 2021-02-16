const { Router } = require('express');
const FoodItem = require('../../models/Food');
const IngredientItem = require('../../models/Ingredient');

const router = Router()

router.get('/', async(req, res) =>{
    try {
        const food = await FoodItem.find() 
            .populate('ingredients')
            .exec();
        res.status(200).json(food);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.patch('/:ingredientId', async(req, res) =>{
    const ingredientId = req.params.ingredientId;    
    const onHandQty = req.body.onHandQty;
    const ingredientName = req.body.ingredientName;

    try {
        const ingredient = await IngredientItem.updateOne({ _id: ingredientId }, { onHandQty: onHandQty })
        if (!ingredient.nModified) throw Error('Something went wrong ')
        res.status(200).send("[Ingredients] Successfully updated " + ingredientName + " quantity.")
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

module.exports = router