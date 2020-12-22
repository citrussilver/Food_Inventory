const { Router } = require('express');
const FoodItem = require('../../models/Food');
const IngredientItem = require('../../models/Ingredient');

const router = Router()

router.get('/', async(req, res) =>{
    try {
        const food = await FoodItem.find() 
            .populate('ingredients')
            .exec();
        res.json(food);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

router.patch('/:ingredientId', async(req, res) =>{
    // res.send(req.params);
    // res.send("Server:\nFood ID is: " + req.body.foodId +"\nIngredient ID is: " + req.params.ingredientId + "\nOn Hand Qty is: " + req.body.onHandQty);
    const ingredientId = req.params.ingredientId;
    
    const onHandQty = req.body.onHandQty;
    const ingredientName = req.body.ingredientName;
    const ingredient = await IngredientItem.updateOne({ _id: ingredientId }, { onHandQty: onHandQty }, function(err){
        if(err) {
            res.send(err);
        } else {
            res.send("[Ingredients] Successfully updated " + ingredientName + " quantity.");
        }
    });
});

// router.post('/', async(req, res) => {
//     const newfood = new FoodItem(req.body)

//     try {
//         const food = await newfood.save();
//         if(!food) throw new Error('Something went wrong saving the food')
//         res.status(200).json(food);
//     } catch (error) {
//         res.status(500).json({ message: error.message})
//     }
// })

// router.delete('/:id', async (req, res) => {
//     const { id } = req.params
//     try {
//         const removed = await FoodItem.findByIdAndDelete(id)
//         if (!removed) throw Error('Something went wrong ')
//         res.status(200).json(removed)
//     } catch (error) {
//         res.status(500).json({ message: error.message })
//     }
// })

module.exports = router