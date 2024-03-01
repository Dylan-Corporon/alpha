<template>

    <div>

    <template v-if="loading">

        <div class="animate-pulse">
            <div class="h-6 rounded w-40 mb-4"></div>
        </div>

    </template>

    <template v-else>

        <div class="container mx-auto p-10">

            <div class="columns-1 mx-auto max-w-md">

                <div class="flex items-center justify-center mb-10">
                    <h2 class="font-bold text-4xl">{{ pageTitle }}</h2>
                    <img class="pl-5 max-h-[30px]" :src="pageIcon" alt="Page Icon">
                </div>


                <div class="flex flex-col mb-5">
                    <p>{{ emailTitle }}</p>
                    <InputText type="email" placeholder="Email Address" class="w-full p-2 border border-gray-300 rounded-md shadow-sm" v-model="inputEmailAddress" />
                </div>

                <div class="flex flex-col mb-5">
                    <p>{{ orderTitle }}</p>
                    <InputText type="number" placeholder="Order Number" class="w-full p-2 border border-gray-300 rounded-md shadow-sm" v-model="inputOrderNumber"/>
                </div>

                <Button label="Submit"
                class="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-md shadow-sm w-full"
                @click="handleSubmit"
                />

            </div>
        </div>

        <div class="container mx-auto mt-10 mb-10">
            <OrderResultsBar v-if="orderDataReady"
                :orderNumber="inputOrderNumber"
                :email="inputEmailAddress"
                :orderDate="orderDate"
                :numberOfItems="numberOfItems"
            />
        </div>

        <div class="container">
            <OrderResults
                v-if="orderDataReady"
                :orderContents="orderContents"
            />
        </div>

    </template>


    </div>

</template>

<script>
// import components
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

import OrderResultsBar from '../components/OrderResultsInfoBar.vue';
import OrderResults from '../components/OrderResultsBox.vue';

// axios allows us to make requests
import axios from 'axios';

export default {

    name: 'ReturnFlow',
    components: {
        InputText,
        Button,
        OrderResultsBar,
        OrderResults,
    },

    data() {
        return {
            loading: true, // Initialize loading
            inputOrderNumber: '',
            inputEmailAddress: '',
            orderSubmitted: false,
            orderDataReady: false,
            numberOfItems: '',
            orderContents: [],
            pageTitle: '',
            pageIcon: '',
            emailTitle: '',
            orderTitle: '',
        };
    },
    mounted() {
        this.fetchData();
    },

    methods: {
        async fetchData() {
            try {
                // this gets the page title, email address, and order number from the API
                const response      = await axios.get('http://localhost:1337/api/return-page?populate[returnsItemPage][populate]=*&populate[returnsConfirmationPage][populate]=*&populate[returnsUploadPage][populate]=*');
                console.log(response, ' what');
                this.pageTitle      = response.data.data.attributes.title;
                this.pageIcon       = 'http://localhost:1337' + response.data.data.attributes.icon;
                this.emailTitle     = response.data.data.attributes.login;
                this.orderTitle     = response.data.data.attributes.orderNumber;

            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                this.loading = false;
            }
        },
        async handleSubmit() {
            // this is to handle the submit button actions
            if (!this.inputEmailAddress || !this.inputOrderNumber) {
                console.log('Please enter an email address and order number');
                return;
            }
            this.orderSubmitted = true;

            // Fetch order status
            const orderStatusUrl = `https://data.goodmorning.com/a/orderStatus?email=${this.inputEmailAddress}&wooId=${this.inputOrderNumber}`;
              const orderStatusResponse = await fetch(orderStatusUrl, {
                method: 'GET',
                mode: 'cors',
                redirect: 'follow',
                credentials: 'omit',
                cache: 'no-cache'
              });

            if (orderStatusResponse.ok) {
                const data = await orderStatusResponse.json();
                this.orderDate = data.createdOn; // Assuming orderDate exists in the data
                this.numberOfItems = data.items.length; // Assuming items is an array
                this.orderContents = data.items; // Assuming items is an array
                console.log(this.orderContents, ' my order');
                // Everything is ready
                this.orderDataReady = true;
            } else {
                console.error('Error fetching order status:', orderStatusResponse);
            }
        },
    },
}
</script>

<style scoped>
/* Your scoped styles here */
</style>
