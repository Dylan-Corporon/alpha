<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4"> <div v-for="recipe in recipes" :key="recipe.id" class="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <img :src="recipe.image" alt="Placeholder Image" class="w-full h-40 object-cover mb-4 rounded-lg">
      <h2>{{ recipe.name }}</h2>
      <p>Cooking Time: {{ recipe.cookTimeMinutes }} minutes</p>
      </div>
  </div>

</template>

<script>
export default {
  props: {
    recipes: { // Declare the 'recipes' prop
      type: Array,
      required: true
    }
  }
}
</script>
