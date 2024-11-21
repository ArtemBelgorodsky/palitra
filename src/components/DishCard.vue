<template>
  <div class="dish-card">
    <img :src="dish.img" :alt="dish.name" class="dish-image" />
    <div class="dish-details">
      <h3 class="dish-name">{{ dish.name }}</h3>
      <p class="dish-price">{{ dish.price }} руб.</p>
      <p class="dish-calories">{{ dish.calories }} ккал</p>
      <p class="selected-table">
        Выбранный стол: {{ selectTable || 'Не выбран' }}
      </p>
      <button class="add-button" @click="addToCart" :disabled="!selectTable">
        Добавить
      </button>
      <div v-if="showNotification" class="notification">Выберите стол</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type Dish from '../models/Dish';
import { ref } from 'vue';

const props = defineProps<{
  dish: Dish;
  selectTable: string;
}>();

const emit = defineEmits<{
  (e: 'addToCart', dish: Dish): void;
}>();

const showNotification = ref(false);

const addToCart = () => {
  if (!props.selectTable) {
    showNotification.value = true;
    setTimeout(() => {
      showNotification.value = false;
    }, 3000); // Скрыть уведомление через 3 секунды
    return;
  }
  emit('addToCart', props.dish);
};
</script>

<style scoped>
.dish-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  width: 250px;
  margin: 16px;
}

.dish-card:hover {
  transform: translateY(-5px);
}

.dish-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.dish-details {
  padding: 16px;
}

.dish-name {
  font-size: 1.25rem;
  margin-bottom: 8px;
}

.dish-price,
.dish-calories {
  font-size: 1rem;
  color: #666;
  margin-bottom: 4px;
}

.selected-table {
  font-size: 0.9rem;
  color: #888;
  margin-bottom: 8px;
}

.add-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 8px 16px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
  margin-top: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.add-button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.add-button:hover {
  background-color: #45a049;
}

.notification {
  background-color: #ff5252;
  color: white;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
}
</style>
