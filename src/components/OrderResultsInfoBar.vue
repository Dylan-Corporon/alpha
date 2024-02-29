<template>

    <div class="container mt-10">
        <div class="order-details-wrapper mx-auto bg-gray-100 p-10">

            <h2 class="text-lg font-medium pb-2"><strong>Order #:</strong> {{ orderNumber }}</h2>

            <div class="columns-2">

                  <div class="left-side">
                    <p>This order contains <strong>{{ numberOfItems }}</strong> item(s)</p>
                    <p><strong>Email:</strong> {{ email }}</p>
                  </div>

                  <div class="right-side">
                    <p><strong>Order Date:</strong> {{ orderDate }}</p>
                  </div>

            </div>
          </div>
    </div>

</template>

<script>
export default {
  name: 'OrderResultsInfoBar',
  props: {
        orderNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        orderDate: {
            type: Number,
            required: true
        },
        numberOfItems: {
            type: String,
            required: true
        }
    },
}

</script>

<style scoped>
/* Your component styles here */
</style>
