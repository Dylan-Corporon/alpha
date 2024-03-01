import { createApp } from 'vue';

import App from './App.vue';
import PrimeVue from 'primevue/config';
import Lara from './presets/Lara';      //import preset

import './style.css';

const app = createApp(App);
app.use(PrimeVue, {
    unstyled: true,
    pt: Lara                            //apply preset
});
app.mount('#app');
