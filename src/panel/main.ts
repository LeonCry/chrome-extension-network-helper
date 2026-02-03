import { createPinia } from 'pinia';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/style.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App).use(router).use(pinia);
app.mount('#app');
