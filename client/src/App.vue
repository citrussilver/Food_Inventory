<template>
  <div id="app">
    <nav class="navbar is-dark">
      <div class="navbar-brand">
        <span id="navspan">[WIP] Genshin Impact Food-Ingredients Inventory</span>
      </div>
    </nav>
    <Food :foodsData="foodsData" v-on:update-qtys="updateOnHandQtys"/>
    <footer class="footer footerspan">
      <div class="content has-text-centered">
        <p>2020 GI Food-Ingredients Inventory</p>
        <p>by Hisokage</p>
      </div>
    </footer>
  </div>
</template>

<script>
import Food from './components/Food.vue'
import axios from "axios"
import { toast } from 'bulma-toast'

export default {
  components: {
    Food
  },
  data() {
    return {
      foodsData: []
    }
  },
  async mounted() {
    const response = await axios.get('api/foods/')
    this.foodsData = response.data;
  },
  methods: {
    async updateOnHandQtys(objects){
      // console.log("\nFood ID: " + objects.food_id + "\nOn Hand Qty passed: " + objects.onhandqty + "\nIngredient ID:" + objects.ingredient_id);
      
      const response = await axios.patch('api/foods/' + objects.ingredient_id, {
        onHandQty : objects.onhandqty,
        ingredientName: objects.ingredientName
      });
      toast({
        message: 'Successfully updated ' + objects.ingredientName + ' quantity',
        type: 'is-info',
        position: "top-center",
        dismissible: true,
        pauseOnHover: true,
        closeOnClick: true
      })
      console.log(response.data)
    }
  }
}
</script>

<style scoped>

#navspan {
  padding: 1rem;
}

.footerspan {
  background-color: #363636;
}


</style>
