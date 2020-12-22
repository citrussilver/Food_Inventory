<template>
    <div>
        <div class="food-item-container">
            <div class="food-block" :key="food.id" v-for="food in foodsData">
                <div class="tile is-ancestor">
                    <div class="tile is-parent">
                        <div class="tile is-child box">
                            <div id="food-name">{{ food.foodName }}</div>
                            <div id="food-img">
                                <img :src="require(`../assets/images/food_inv/${food.imagePath}.png`)" :alt="food.foodName" :title="food.foodName" />
                            </div>    
                        </div>
                    </div>
                    <div class="tile is-4 is-vertical is-parent">
                        <div class="tile is-child box">
                            <p class="count-label">On Hand:</p>
                            <p class="count-figure">{{ food.onHandQty }}</p>
                            <!-- <input class="input is-primary on-hand-input" type="number" min="0" v-model="food.onHandQty"> -->
                        </div>
                        <div class="tile is-child box">
                            <p class="count-label">Deficit:</p>
                            <p class="count-figure">{{ requiredOnHand(food.onHandQty) }}</p>
                        </div>
                    </div>
                </div>
                <div class="tile is-ancestor">
                    <div class="tile">
                        <div class="tile is-parent">
                            <article class="tile is-child box">
                            <p>Effect</p>
                            <p><textarea class="textarea is-info has-fixed-size txtarea-custom" v-model="food.effect" disabled /></p>
                            </article>
                        </div>
                    </div>    
                </div>
                <div class="tile is-ancestor">
                    <div class="tile">
                        <div class="tile is-parent">
                            <div class="tile is-child box">
                                <template v-if="food.ingredients">
                                    <div class="ingredients-block">
                                        <p>Ingredients List:</p>
                                        <ul class="ingredients-list">
                                            <li class="row" v-for="ingredient in food.ingredients" :key="ingredient._id">
                                                <div id="ingredient-image-container">
                                                    <img class="image is-64x64" :src="require(`../assets/images/food_inv/${ingredient.imagePath}.png`)" alt="ingredient.ingredientName" :title="ingredient.ingredientName">
                                                </div>
                                                <div class="required-qty-container">
                                                    <!-- <i class="material-icons" id="required-inner-qty">food_bank</i> -->
                                                    <!-- Required:
                                                    {{ ingredient.requiredQty }} -->
                                                    {{ingredient.ingredientName}}
                                                </div>
                                                <div class="on-hand-qty-container">
                                                    <p>On Hand:</p>
                                                    <div class="qty-input-button">
                                                        <div class="qty-input">
                                                            <input v-if="ingredient.onHandQty < 1" class="input is-danger on-hand-input" type="number" v-model="ingredient.onHandQty" min="0">
                                                            <input v-else class="input is-primary on-hand-input" type="number" v-model="ingredient.onHandQty" min="0">
                                                        </div>
                                                        <div class="qty-button">
                                                            <!-- <button class="button is-primary save-button" @click="test({ingredient_id: ingredient._id, onhandqty: ingredient.onHandQty})"><i class="material-icons">save</i></button> -->
                                                            <button class="button is-primary save-button" @click="$emit('update-qtys', { ingredient_id: ingredient._id, ingredientName: ingredient.ingredientName, onhandqty: ingredient.onHandQty})"><i class="material-icons">save</i></button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <button class="button is-primary" @click="$emit('update-qtys', [food, food.id])">Save Changes</button> -->
                <!-- <button class="button is-primary" @click="test(ingredient._id)">Save Changes</button> -->
            </div>
        </div>
    </div>  
</template>

<script>
// import ImageRef from './ImageRef.vue'
export default {
  components: { 
    //   ImageRef 
    },
    props: ['foodsData'],
    methods: {
        requiredOnHand: function(value) {
            if(value < 20) {
                return 20 - value;
            } else {
                return 0;
            }
        },
        test: function(Id) {
            console.log(Id);
        }
    }
}
</script>

<style scoped>

.tile {
    background: #323232;
    color: #fff;
    padding: 0.30em;
}

.tile .count-label {
    font-size: 20px;
    text-align: center;
}

.tile .on-hand-input {
    width: 5rem;
}

.tile .count-figure {
    font-size: 40px;
    text-align: center;
}

.tile #food-name {
    text-align: center;
    font-size: 20px;
    padding: 0.5rem;
}

.tile #food-img {
    text-align: center;
}

.food-item-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 4rem auto;
    max-width: 95%;
}

.food-item-container > .food-block {
    background: #323232;
    max-width: 50rem;
    margin: 4rem auto;
    padding: 2rem;
    border-radius: 3px;
    box-shadow: 0 2px 0 rgba(230, 145, 56, 0.05), 0 5px 20px rgba(230, 145, 56, 0.5);
    transition: all 100ms ease-in-out;
}

.food-block:hover {
    box-shadow: 0 0 0 0.5em #007acc;
}

.txtarea-custom {
    background: #323232;
    color: #fff;
    cursor: pointer;
}

.ingredients-block {
    background: #323232;
}

.ingredients-block p {
    padding: 0.1rem;
}

.ingredients-list {
    background: #252526;
    width: 100%;
}

.ingredients-list .row {
    padding: 0.5em;
    margin: 0%;
    display: flex;
    flex-direction: row;
}

.ingredients-list .row:hover {
    background-color: #007acc;
}

.row #ingredient-image-container {
    flex: 5%;
    display: grid;
}

.row .required-qty-container {
    flex: 5%; 
}

#required-qty p {
    text-align: center; 
}

#required-inner-qty {
    font-size: 5rem;
}

.row .on-hand-qty-container {
    flex: 26.5%;
    padding: 0 0.5rem;
}

.on-hand-qty-container .save-button {
    width: 2rem;
}

.qty-input-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
}



.on-hand-input {
    width: 40%;
}
</style>