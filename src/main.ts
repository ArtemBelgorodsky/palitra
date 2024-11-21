import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Header from './components/Header.vue';
import DishCard from './components/DishCard.vue';
import OrderList from './components/OrderList.vue';
import { createPinia } from 'pinia';

const app = createApp(App);
app.component('Header', Header);
app.component('DishCard', DishCard);
app.component('OrderList', OrderList);
app.use(createPinia());
app.use(router);

app.mount('#app');
