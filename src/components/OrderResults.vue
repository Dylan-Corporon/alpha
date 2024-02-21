<template>

  <div class="order-details-wrapper">
    <div class="flex flex-col sm:flex-row flex-wrap justify-between gap-4 bg-gray-200 p-6">

      <div class="container">

        <div class="col-span-2">
          <p class="orderNumber font-bold-600">Order #342342</p>
          <p class="orderDetails">This order contains <strong>{{ recipes.length }}</strong>. These items may ship separately.</p>
          <p class="orderEmail"><strong>Email:</strong> Email address</p>
        </div>
        <div class="col-span-2">
          <p><strong>Order Date:</strong> June 19, 2024</p>
        </div>
      </div>
    </div>
  </div>

  <div class="container mx-auto flex flex-col sm:flex-row flex-wrap justify-center gap-4 p-4">

    <div class="flex flex-wrap justify-between gap-4">
      <div v-for="recipe in recipes" :key="recipe.id" class="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <img :src="recipe.image" alt="Placeholder Image" class="w-full h-40 object-cover mb-4 rounded-lg">
        <h2>{{ recipe.name }}</h2>
        <p>Cooking Time: {{ recipe.cookTimeMinutes }} minutes</p>
        <p>Order Items:</p> <ul>
          <li v-for="tag in recipe.tags" :key="tag" class="tag">
            {{ tag }}
          </li>
        </ul>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: {
    recipes: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.order-details-wrapper {
  min-width: 100vw;
}

.order-details-wrapper .container {
  display: flex;
    justify-content: space-evenly;
    align-items: flex-end;
}
.tag {
  background: #f1f1f1;
  padding: 0.2rem 0.6rem;
  margin: 0.2rem;
  width: fit-content;
  border-radius: 1rem;
  border: 1px solid #e2e2e2;
}

</style>
