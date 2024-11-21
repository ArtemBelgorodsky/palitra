<script setup lang="ts">
import { ref } from 'vue';

const text = ref('Информационная система ресторана "Палитра вкуса"');
</script>

<template>
  <div class="header">
    <div class="logo">
      <img src="@/assets/logo.png" alt="Логотип ресторана" />
    </div>
    <div class="title">{{ text }}</div>
  </div>
</template>

<style scoped>
.header {
  height: 100px;
  background-color: #65e77b;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.logo img {
  height: 80px;
  width: auto;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #000000;
  text-transform: uppercase;
  letter-spacing: 2px;
}
</style>
