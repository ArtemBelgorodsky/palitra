<script setup lang="ts">
import type Dish from '../models/Dish';
const API_URL_MENU = 'https://204f29c22c36ffdb.mokky.dev/menu';
const API_URL = 'https://204f29c22c36ffdb.mokky.dev/';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { useNotificationsStore } from '@/store';

const dishes = ref<Dish[]>([]);
const orderItems = ref<Dish[]>([]);
const tables = ref([1, 2, 3, 4, 5]);
const selectTable = ref('');

onMounted(() => {
  fetchDataMenu();
});

const fetchDataMenu = () => {
  fetch(API_URL_MENU)
    .then((response) => response.json())
    .then((data) => (dishes.value = data));
};

const fetchDataTable = () => {
  fetch(API_URL + selectTable.value)
    .then((response) => response.json())
    .then((data) => (orderItems.value = data));
};

async function addToCart(dish: any) {
  const responsePost = await fetch(API_URL + selectTable.value, {
    method: 'POST',
    body: JSON.stringify(dish),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const response = await responsePost.json();
  const data = await response;
  console.log(data);
  const responseGet = await fetch(API_URL + selectTable.value);
  const dataGet = await responseGet.json();
  orderItems.value = dataGet;
}

async function deleteItem(id: number, selectTable: number) {
  const response = await fetch(API_URL + selectTable + '/' + id, {
    method: 'DELETE',
  });

  const responseGet = await fetch(API_URL + selectTable);
  const dataGet = await responseGet.json();
  orderItems.value = dataGet;
}

const notificationsStore = useNotificationsStore();
const notifications = notificationsStore.notifications;

const closeNotification = (index: number) => {
  notificationsStore.removeNotification(index);
};
</script>

<template>
  <div v-if="notifications.length > 0" class="notifications">
    <div
      v-for="(notification, index) in notifications"
      :key="index"
      class="notification"
    >
      <span
        >Официанту, заберите блюдо "{{ notification.dish }}" для стола №{{
          notification.table
        }}</span
      >
      <button class="close-button" @click="closeNotification(index)">
        Закрыть
      </button>
    </div>
  </div>
  <form class="table-select-form">
    <label for="table-select" class="table-select-label">Ваш стол</label>
    <select
      name="table"
      id="table-select"
      v-model="selectTable"
      @change="fetchDataTable"
      class="table-select"
    >
      <option value="">-- Выберите стол --</option>
      <option v-for="table in tables" :value="table">
        {{ table }}
      </option>
    </select>
  </form>
  <div class="wrapper">
    <OrderList
      :orderItems="orderItems"
      :selectTable="selectTable"
      @deleteItem="deleteItem"
    ></OrderList>
    <div class="dish-grid">
      <DishCard
        v-for="dish in dishes"
        :key="dish.id"
        :dish="dish"
        :selectTable="selectTable"
        @addToCart="addToCart"
        @fetchDataTable="fetchDataTable"
      />
    </div>
  </div>
</template>

<style>
.dish-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.wrapper {
  display: grid;
  grid-template-columns: 30% 70%;
}

.table-select-form {
  margin-bottom: 20px;
  text-align: center;
}

.table-select-label {
  display: block;
  font-size: 1.2rem;
  margin-bottom: 10px;
  color: #333;
}

.table-select {
  width: 200px;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  color: #333;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 95%;
  background-position-y: 50%;
}

.table-select:focus {
  outline: none;
  border-color: #4caf50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.5);
}

.notifications {
  margin-top: 20px;
}

.notification {
  background-color: #4caf50;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background-color: #ff5252;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.close-button:hover {
  background-color: #ff1744;
}
</style>
