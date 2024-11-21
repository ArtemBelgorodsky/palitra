<script setup lang="ts">
import type Dish from '../models/Dish';
import { computed } from 'vue';

const API_URL = 'https://204f29c22c36ffdb.mokky.dev/';
const props = defineProps({
  selectTable: Number,
  orderItems: Array<Dish>,
});
const emit = defineEmits<{
  (e: 'deleteItem', id: number, selectTable: number): void;
}>();

const deleteItem = (id: number, selectTable: number) => {
  emit('deleteItem', id, selectTable);
};

const totalPrice = computed(() => {
  return props.orderItems
    ? props.orderItems.reduce((acc, item) => acc + item.price, 0)
    : 0;
});
</script>

<template>
  <div class="order-list" v-if="props.orderItems?.length">
    <h2>Заказ для стола №{{ selectTable }}</h2>
    <ul>
      <li v-for="item in orderItems" :key="item.id" class="order-item">
        <span class="item-name">{{ item.name }}</span>
        <span class="item-price">{{ item.price }} руб.</span>
        <button
          class="delete-button"
          @click="deleteItem(item.id, props.selectTable as number)"
        >
          Удалить
        </button>
      </li>
    </ul>
    <div class="total">
      <span>Итого:</span>
      <span class="total-price">{{ totalPrice }} руб.</span>
    </div>
  </div>
  <div class="order-list" v-else>
    <h2>Заказа нет</h2>
  </div>
</template>

<style scoped>
.order-list {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  margin-top: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 16px;
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

.delete-button {
  background-color: #ff5252;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.2s;
}

.delete-button:hover {
  background-color: #ff1744;
}

.total {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
}

.total-price {
  color: #4caf50;
}
</style>
