<script setup lang="ts">
import type Dish from '../models/Dish';
const API_URL = 'https://204f29c22c36ffdb.mokky.dev/';

import { onMounted } from 'vue';
import { ref } from 'vue';
import { useNotificationsStore } from '@/store';

const tables = ref([1, 2, 3, 4, 5]);
const orders = ref<[Dish][]>([]);

onMounted(() => {
  fetchDataMenu();
});

async function fetchDataMenu() {
  for (let i = 1; i <= 5; i++) {
    const response = await fetch(API_URL + i);
    const data = await response.json();
    orders.value[i] = await data;
  }
  console.log(orders.value);
}

async function deleteItemShief(id: number, table: number) {
  const response = await fetch(API_URL + table + '/' + id, {
    method: 'DELETE',
  });
  fetchDataMenu();
  const notificationsStore = useNotificationsStore();
  const dish = orders.value[table].find((order) => order.id === id)?.name;
  if (dish) {
    notificationsStore.addNotification({ table, dish });
  }
}
</script>

<template>
  <div class="kitchen">
    <h1>Кухня</h1>
    <div class="orders-grid">
      <div v-for="table in tables" :key="table" class="table-orders">
        <h2>Стол №{{ table }}</h2>
        <ul>
          <li v-for="order in orders[table]" :key="order.id" class="order-item">
            <span class="item-name">{{ order.name }}</span>
            <span class="item-price">{{ order.price }} руб.</span>
            <button
              class="mark-done-button"
              @click="deleteItemShief(order.id, table)"
            >
              Готово
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.kitchen {
  padding: 20px;
  width: 100%;
}

h1 {
  font-size: 2rem;
  margin-bottom: 20px;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.table-orders {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  min-width: 390px;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #4caf50;
}

ul {
  list-style-type: none;
  padding: 0;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.item-name {
  font-weight: bold;
  flex-grow: 1;
}

.item-price {
  color: #666;
  margin-right: 16px;
}

.mark-done-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.mark-done-button:hover {
  background-color: #45a049;
}
</style>
