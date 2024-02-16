<template>
    <div class="order-details">
      <h2>Order Details</h2>
      <p>Order ID: {{ orderItem.id }}</p>
      <p>SKU: {{ orderItem.sku }}</p>
      <p>Description (French): {{ orderItem.french }}</p>
      <p>WooCommerce ID: {{ orderItem.wooId }}</p>
      <p>Status: {{ orderItem.status }}</p>
      <p>Fulfillment Date: {{ orderItem.fulfillmentDate }}</p>
      <p>Tracking Number: {{ orderItem.trackingNumber }}</p>
      <p>Courier: {{ orderItem.courier }}</p>
      <Button label="Return" disabled />
    </div>
  </template>

  <script>
  export default {
    name: 'OrderDetails',
    props: {
      orderItem: { // <-- Important
        type: Object,
        required: true
      }
    }
  }
  </script>

  <style scoped>
  /* Add any styling for your order details here */
  </style>
