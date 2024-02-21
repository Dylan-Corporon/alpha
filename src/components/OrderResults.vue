<template>
  <ul>
    <li v-for="recipe in recipes" :key="recipe.id">
      {{ recipe.name }} - Cooking Time: {{ recipe.cookTimeMinutes }} minutes
    </li>
  </ul>
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
