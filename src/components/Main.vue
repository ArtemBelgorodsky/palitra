<script setup lang="ts">
import { ref } from 'vue';
</script>

<template>
  <main class="main-container">
    <div class="features-grid">
      <div class="feature-card"><h1>Администратор</h1></div>

      <div class="feature-card"><h1>Менеджер</h1></div>

      <div class="feature-card"><h1>Официант</h1></div>

      <div class="feature-card"><h1>Шеф-повар</h1></div>

      <div class="feature-card"><h1>Повар</h1></div>

      <div class="feature-card"><h1>Кладовщик</h1></div>
    </div>
  </main>
</template>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.welcome-section {
  text-align: center;
  margin-bottom: 3rem;
}

.welcome-section h1 {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.2rem;
  color: #666;
}

.features-grid {
  display: grid;
  grid-template-columns: 30% 30% 30%;
  grid-template-rows: 100px 100px;
  gap: 3rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .main-container {
    padding: 1rem;
  }

  .welcome-section h1 {
    font-size: 2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>
