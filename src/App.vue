<template>
  <div class="flex flex-col justify-center items-center h-screen">

    <template v-if="isLoading">
      <div class="animate-pulse">
        <div class="h-6 bg-gray-200 rounded w-40 mb-4"></div>
      </div>
    </template>

    <template v-else>
      <div class="container mx-auto p-4 max-w-500 max-w-xl">
        <h1 class="text-4xl text-center mb-4 font-bold">{{ pageContent }}</h1>
        <div class="flex flex-col gap-2 mb-4 text-left">
            <p class="">Email Address:</p>
          <InputText placeholder="Email Address" class="w-full p-2 border border-gray-300 rounded-md shadow-sm"/>
          <p>Order Number:</p>
          <InputText type="number" placeholder="Order Number" class="w-full p-2 border border-gray-300 rounded-md shadow-sm" v-model="orderNumber" />
          <Button label="Submit" class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow-sm" @click="handleSubmit" />
        </div>
      </div>
    </template>

    <div v-if="buttonPressed">
      <p>Button was pressed!</p>
      <ul v-if="showResults">
        <li v-for="recipe in fetchedData.recipes" :key="recipe.id">
          {{ recipe.name }} - Cooking Time: {{ recipe.cookTimeMinutes }} minutes
        </li>
      </ul>

    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import OrderDetails from './components/OrderResults.vue';

import axios from 'axios';

export default {
  name: 'App',
  components: {
    InputText,
    Button,
    OrderDetails,
  },
  data() {
    return {
      isLoading: true, // Initialize isLoading
      pageContent: '', // Initialize pageContent
      buttonPressed: false,
      fetchedData: {},
      showResults: false,
      orderNumber: '',
    };
  },
  mounted() {
   this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const response = await axios.get('http://localhost:1337/api/returnpage');
        this.pageContent = response.data.data.attributes.Title; // Adjust 'someTextProperty'
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error gracefully, maybe display an error message
      } finally {
        this.isLoading = false;
      }
    },
    async handleSubmit() {
      try {
        const response = await fetch('https://dummyjson.com/recipes');
        this.fetchedData = await response.json();
        this.buttonPressed = true;
        this.showResults = true;
      } catch (error) {
        console.error("Error fetching from dummy API:", error);
      } finally {
        console.log("Order Number:", this.orderNumber); // will need to remove later
      }
    }
  }
}
</script>

<style>
/* Add Tailwind CSS classes here */
</style>
