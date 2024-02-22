<template>

  <!-- Page Content Start -->
  <div class="flex flex-col justify-center items-center">

    <div v-if="!showSnapMessenge">

    <template v-if="isLoading">
      <div class="animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-40 mb-4"></div>
      </div>
    </template>

    <template v-else>
      <!-- page template inputs start -->
      <div id="target" class="container mx-auto p-4 max-w-500 max-w-xl">
        <h1 class="text-4xl text-center mb-4 font-bold">{{ pageTitle }}</h1>
        <div class="flex flex-col gap-2 mb-4 text-left">
            <p class="">{{ emailTitle }}</p>
          <InputText placeholder="Email Address" class="w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          <p>{{ orderTitle }}</p>
          <p><small>search for food items, like chicken</small></p>
          <InputText type="text" placeholder="Order Number" class="w-full p-2 border border-gray-300 rounded-md shadow-sm" v-model="orderNumber" />
          <Button label="Submit" class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow-sm" @click="handleSubmit" />
        </div>
      </div>
      <!-- page template inputs end -->
    </template>

    <div v-if="buttonPressed">
      <div>

        <OrderResults
          v-if="showResults"
          :recipes="fetchedData.recipes"
          @itemSelected="handleItemSelected"
        />
      </div>
    </div>

    </div>

    <div v-else>

      <div class="flex flex-col items-center justify-center h-screen">
        <div v-if="showSnapMessenge">
          <img :src="selectedRecipe.image" alt="Placeholder Image" class="w-full h-40 object-cover mb-4 rounded-lg">
      <h2>{{ selectedRecipe.name }}</h2>
      <li v-for="ingredient in selectedRecipe.ingredients" :key="ingredient" class="ingredient">
            {{ ingredient }}
          </li>
      <p><strong>Cooking Time:</strong> {{ selectedRecipe.cookTimeMinutes }}</p>
      </div>
        <Button label="close" class="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow-sm" @click="showSnapMessenge = false" />
      </div>

  </div>
</div>



</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import OrderResults from './components/OrderResults.vue';

import axios from 'axios';

export default {
  name: 'App',
  components: {
    InputText,
    Button,
    OrderResults
  },
  data() {
    return {
      isLoading: true, // Initialize isLoading
      pageContent: '', // Initialize pageContent
      buttonPressed: false,
      fetchedData: {},
      showResults: false,
      emailAddress: '',
      orderNumber: '',
      selectedItem: null, // Store selected item
      showSnapMessenge : false,
      selectedRecipe: null, // To hold the selected recipe
    };
  },
  mounted() {
   this.fetchData();
  },
  methods: {
    // this is to get the page content
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:1337/api/returnpage');
        this.pageTitle    = response.data.data.attributes.Title;
        this.emailTitle   = response.data.data.attributes.Login;
        this.orderTitle   = response.data.data.attributes.OrderNumber;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.isLoading = false;
      }
    },
    // this is to get the order number and then find the orders
    async handleSubmit() {
      try {
        if (!this.orderNumber) { // Check if orderNumber is empty
          return; // Do nothing if empty
        }

        const response = await fetch(`https://dummyjson.com/recipes/search?q=${this.orderNumber}`);
        // Notice the template literal for URL construction
        this.fetchedData = await response.json();
        this.buttonPressed = true;
        this.showResults = true;
      } catch (error) {
        console.error("Error fetching recipes:", error);
        // Handle the error (e.g., display an error message to the user)
      }
    },
    handleItemSelected(recipe) {
      console.log('Heard from child component:', recipe);
      this.selectedRecipe = recipe; // Store the recipe
      this.showSnapMessenge = true;
    },
  }
}
</script>

<style>
/* Add Tailwind CSS classes here */
</style>
