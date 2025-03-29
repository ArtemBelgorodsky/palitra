<script setup lang="ts">
import { ref } from 'vue';

const welcomeMessage = ref('Добро пожаловать в систему управления рестораном');
</script>

<template>
  <main class="main-container">
    <div class="welcome-section">
      <h1>{{ welcomeMessage }}</h1>
      <p class="subtitle">Управляйте заказами и меню с легкостью</p>
    </div>

    <div class="features-grid">
      <div class="feature-card">
        <div class="icon">🍽️</div>
        <h3>Управление заказами</h3>
        <p>Принимайте и обрабатывайте заказы от клиентов</p>
      </div>

      <div class="feature-card">
        <div class="icon">👨‍🍳</div>
        <h3>Кухня</h3>
        <p>Отслеживайте и управляйте заказами на кухне</p>
      </div>

      <div class="feature-card">
        <div class="icon">📊</div>
        <h3>Статистика</h3>
        <p>Анализируйте работу ресторана</p>
      </div>
    </div>
  </main>
</template>

<style scoped>
.main-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.feature-card {
  background: white;
  border-radius: 10px;
  padding: 2rem;
  text-align: center;
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
