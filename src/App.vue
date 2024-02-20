<template>
  <div class="container">
    <h2>Order Details</h2>

    <InputText placeholder="Email" v-model="email" class="mb-2" />
    <InputText type="number" placeholder="Order Number" v-model="orderNumber" class="mb-2" />

    <Button label="Submit" @click="handleSubmit" :disabled="!isFormValid" />


    <!-- Need to make this use the OrderResults.vue file -->
    <div v-if="submitted">

      <div v-if="matchingItem">
        <h2>Order Details</h2>

        <p>Order ID: {{ matchingItem.id }}</p>
        <p>SKU: {{ matchingItem.sku }}</p>
        <p>Description (French): {{ matchingItem.french }}</p>
        <p>WooCommerce ID: {{ matchingItem.wooId }}</p>
        <p>Status: {{ matchingItem.status }}</p>
        <p>Fulfillment Date: {{ matchingItem.fulfillmentDate }}</p>
        <p>Tracking Number: {{ matchingItem.trackingNumber }}</p>
        <p>Courier: {{ matchingItem.courier }}</p>

        <button :disabled="returnButtonDisabled" class="p-button p-component" type="button" aria-label="Return" data-pc-name="button" data-pc-section="root">
        <span class="p-button-label" data-pc-section="label">Return</span></button>

      </div>

      <div v-if="submitted">
        <div v-if="matchingItem"> </div> <div v-else-if="orderNotFound">
          <ErrorMessage />
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import axios from 'axios';

import ErrorMessage from './components/ErrorMessage.vue';

export default {
  name: 'App',
  components: {
    Button,
    InputText,
    ErrorMessage,

  },
  data() {
    return {
      email: '',
      orderNumber: '',
      submitted: false,
      orders: [],
      matchingOrder: null,
      orderDetails: null,
      orderNotFound: false, // Initially, no error state
      matchedOrder: null, // Add a property to store matching order
      matchingMessage: false, // Variable to display Bingo message
      matchingItem: null, //  Store the matching WooCommerce order
      matchError: null, // Stores the error if no matching order
      returnButtonDisabled: true, // Initially disabled
   };
  },
  computed: {
    isFormValid() {
      return this.email.trim() !== '' && this.orderNumber.trim() !== '';
    }
  },
  methods: {
    handleSubmit() {
      this.fetchData();
      this.submitted = true;
      this.matchingItem = null;
      this.matchingMessage = false;
      this.matchError = null;
      this.orderNotFound = false;
    },
    fetchData() {
      const apiEndpoint = 'http://localhost:1337/api/orders';
      axios.get(apiEndpoint)
        .then(response => {
          this.orders = response.data.data;
          this.findMatchingOrder();
        })
        .catch(error => {
          console.error("Error fetching data:", error);
        });
    },
    findMatchingOrder() {
      const matchingOrder = this.orders.find(order => order.attributes.email.toLowerCase() === this.email.toLowerCase());
      if (matchingOrder) {
        this.matchingOrder = matchingOrder;
        this.orderNotFound = false;
        this.fetchOrderDetails();
      } else {
        this.matchingOrder = null;
        this.orderDetails = null;
        this.orderNotFound = true;
        this.matchingOrder = null;
        this.orderDetails = null;

      }
    },
    fetchOrderDetails() {
    if (this.matchingOrder) {
      const orderId = this.matchingOrder.id;
      const orderDetailEndpoint = `http://localhost:1337/api/orders/${orderId}?populate=*`;
      axios.get(orderDetailEndpoint)
        .then(response => {

          const orderData = response.data. data.attributes.orderData;
          const matchingItem = orderData.find(item => item.wooId === this.orderNumber);

          if (matchingItem) {
            this.matchingMessage = true;
            this.matchingItem = matchingItem; // Store the matching item
            this.returnButtonDisabled = false; // Enable the button
          }  else {
            // Case: matchingItem not found (Add display logic)
            this.matchError = "No matching WooCommerce order found.";
         }
        })
        .catch(error => {
          console.error("Error fetching order details:", error);
          // Case: API call resulted in error (Add display logic)
        });
    } else { // Case: No matching order at all
        this.orderNotFound = true;
      }
  }
}
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.mb-2 {
  margin-bottom: 10px;
}
</style>
