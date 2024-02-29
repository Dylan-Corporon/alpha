<template>

      <template v-if="isLoading">
        <div class="animate-pulse">
          <div class="h-6 w-40 mb-4"></div>
        </div>
      </template>

      <template v-else>

        <ReturnFlow />

      </template>

</template>

<script>

// import components
import ReturnFlow from './pages/ReturnFlow.vue';

export default {
  name: 'App',
  components: {
    ReturnFlow,
  },
  data() {
    return {
        isLoading: true, // Initialize isLoading
        numberOfItems: null, // Initialize as null
        orderDataReady: false, // New flag
      };
  },
  mounted() {
    this.isLoading = false; // Set isLoading to false
  },
  methods: {}
}


</script>

<style>
/* Add Tailwind CSS classes here */
</style>
