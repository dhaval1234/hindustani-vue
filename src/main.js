import { createApp } from 'vue';
import App from './App.vue';
import './assets/index.css';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Notifications from '@kyvg/vue3-notification';

axios.defaults.baseURL = 'http://localhost:8000/api/';

const app = createApp(App)
app.use(router);
app.use(Notifications);
app.use(VueAxios,axios);
app.mount('#app');

