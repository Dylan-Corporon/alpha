<template>
    <div>
      <h2>Kachow</h2>
        <div v-for="(order, orderIndex) in orderContents" :key="orderIndex">
            <ul v-for="item in order.subItems" :key="item.sku">
                    <li>{{ item.name }}</li>
                    <li>{{ item.description }}</li>
                    <li>{{ item.sku }}</li>
                    <li>{{ item.status }}</li>
            </ul>
        </div>
    </div>


  </template>

<script>
export default {
    name: 'OrderResultsBox',
    props: {
        orderContents: {
        type: Array,
        required: true
        }
    },
  data() {
    return {
      // Your component data here
    };
  },
  methods: {
    // Your component methods here
  },
  computed: {
    // Your computed properties here
  },
  mounted() {
    // Your component mounted hook logic here
  },
};
</script>

<style scoped>
/* Your component styles here */
</style>
