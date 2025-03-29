<script setup lang="ts">
import { onMounted } from 'vue';
import { useStatisticsStore } from '@/store/statistics';

const statisticsStore = useStatisticsStore();

onMounted(async () => {
  await statisticsStore.fetchStatistics();
});
</script>

<template>
  <div class="statistics-container">
    <h1 class="page-title">Статистика ресторана</h1>

    <!-- Общая статистика -->
    <div class="general-stats">
      <div class="stat-card">
        <h3>Общая выручка</h3>
        <p class="stat-value">
          {{ statisticsStore.totalRevenue.toLocaleString() }} ₽
        </p>
      </div>
      <div class="stat-card">
        <h3>Средний чек</h3>
        <p class="stat-value">
          {{ statisticsStore.averageCheck.toLocaleString() }} ₽
        </p>
      </div>
      <div class="stat-card">
        <h3>Количество гостей</h3>
        <p class="stat-value">{{ statisticsStore.totalVisitors }}</p>
      </div>
      <div class="stat-card">
        <h3>Оборачиваемость</h3>
        <p class="stat-value">{{ statisticsStore.turnoverRate.toFixed(2) }}</p>
      </div>
    </div>

    <!-- Статистика по блюдам -->
    <section class="stat-section">
      <h2>Топ блюд</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Блюдо</th>
              <th>Количество</th>
              <th>Выручка</th>
              <th>Рейтинг</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="dish in statisticsStore.getTopDishes" :key="dish.name">
              <td>{{ dish.name }}</td>
              <td>{{ dish.quantity }}</td>
              <td>{{ dish.revenue.toLocaleString() }} ₽</td>
              <td>{{ dish.rating.toFixed(1) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Статистика официантов -->
    <section class="stat-section">
      <h2>Топ официантов</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Официант</th>
              <th>Заказы</th>
              <th>Выручка</th>
              <th>Рейтинг</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="waiter in statisticsStore.getTopWaiters"
              :key="waiter.name"
            >
              <td>{{ waiter.name }}</td>
              <td>{{ waiter.orders }}</td>
              <td>{{ waiter.revenue.toLocaleString() }} ₽</td>
              <td>{{ waiter.averageRating.toFixed(1) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Статистика по столам -->
    <section class="stat-section">
      <h2>Статистика по столам</h2>
      <div class="table-container">
        <table>
          <thead>
            <tr>
              <th>Стол</th>
              <th>Заказы</th>
              <th>Выручка</th>
              <th>Среднее время</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="table in statisticsStore.tables"
              :key="table.tableNumber"
            >
              <td>{{ table.tableNumber }}</td>
              <td>{{ table.orders }}</td>
              <td>{{ table.revenue.toLocaleString() }} ₽</td>
              <td>{{ table.averageVisitDuration }} мин</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Пиковые часы -->
    <section class="stat-section">
      <h2>Пиковые часы посещения</h2>
      <div class="peak-hours">
        <div
          v-for="hour in statisticsStore.getPeakHours"
          :key="hour.hour"
          class="peak-hour-card"
        >
          <h3>{{ hour.hour }}:00</h3>
          <p>Гостей: {{ hour.visitors }}</p>
          <p>Выручка: {{ hour.revenue.toLocaleString() }} ₽</p>
        </div>
      </div>
    </section>

    <!-- Отзывы -->
    <section class="stat-section">
      <h2>Отзывы гостей</h2>
      <div class="reviews-container">
        <div class="average-rating">
          <h3>Средний рейтинг</h3>
          <p class="rating-value">
            {{ statisticsStore.getAverageRating.toFixed(1) }}
          </p>
        </div>
        <div class="reviews-list">
          <div
            v-for="review in statisticsStore.reviews"
            :key="review.id"
            class="review-card"
          >
            <div class="review-header">
              <span class="rating">★ {{ review.rating }}</span>
              <span class="date">{{ review.date }}</span>
            </div>
            <p class="comment">{{ review.comment }}</p>
            <span class="table">Стол: {{ review.tableNumber }}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.statistics-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 2rem;
}

.general-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #4caf50;
  margin-top: 0.5rem;
}

.stat-section {
  background: white;
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stat-section h2 {
  color: #2c3e50;
  margin-bottom: 1rem;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

th {
  background-color: #f5f5f5;
  font-weight: 600;
}

.peak-hours {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.peak-hour-card {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
}

.reviews-container {
  display: grid;
  gap: 1.5rem;
}

.average-rating {
  text-align: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.rating-value {
  font-size: 2rem;
  font-weight: bold;
  color: #4caf50;
}

.reviews-list {
  display: grid;
  gap: 1rem;
}

.review-card {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.rating {
  color: #ffc107;
  font-weight: bold;
}

.date {
  color: #666;
}

.comment {
  margin: 0.5rem 0;
}

.table {
  color: #666;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .statistics-container {
    padding: 1rem;
  }

  .general-stats {
    grid-template-columns: 1fr;
  }

  .peak-hours {
    grid-template-columns: 1fr;
  }
}
</style>
