import { createApp } from 'vue';
import axios from 'axios';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import 'primeicons/primeicons.css';
import './assets/style.css';
import ZutorPreset from './theme';
import App from './App.vue';
import router from './router';
import store from './store';

// Set token to header on start
const token = localStorage.getItem('token');
if (token) {
  axios.defaults.headers.common['Authorization'] = token;
}

const app = createApp(App);
app.config.globalProperties.$http = axios;
app.use(PrimeVue, {
  theme: {
    preset: ZutorPreset,
    // Light theme only; the logo is dark blue on transparent
    options: { darkModeSelector: '.app-dark' }
  }
});
app.use(ToastService);
app.use(ConfirmationService);
app.use(store);
app.use(router);
app.mount('#app');
