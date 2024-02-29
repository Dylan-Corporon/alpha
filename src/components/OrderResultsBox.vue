<template>
    <div>
        <div class="container">

            <div
                v-if="orderContents && orderContents.length > 0"
                :class="`columns-1 md:columns-2 lg:columns-${columnCount} mx-auto`"
            >

                <div v-for="(order, orderIndex) in orderContents" :key="orderIndex"
                    class="bg-white p-4 rounded-md shadow-md min-w-2xl max-w-4xl"
                >
                    <ul>
                        <li
                            v-for="item in order.subItems" :key="item.sku"
                        >
                            {{ item.description }}
                            <p>SKU: {{ item.sku }}</p>
                            <p>Status: {{ item.status }}</p>
                        </li>
                    </ul>
                </div>
            </div>
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
    columnCount() {
      if (this.orderContents && this.orderContents.length > 0) {
        return this.orderContents.length;
      } else {
        return 1; // Default to a single column if no orders
      }
    }
  },
  mounted() {
    // Your component mounted hook logic here
  },
};
</script>

<style scoped>
/* Your component styles here */
</style>
