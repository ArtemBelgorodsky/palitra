<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <Header></Header>
    <nav class="nav-links">
      <RouterLink to="/" class="nav-link">Главная</RouterLink>
      <RouterLink to="/waiter" class="nav-link">Обслуживание гостей</RouterLink>
      <RouterLink to="/kitchen" class="nav-link">Кухня</RouterLink>
      <RouterLink to="/stat" class="nav-link">Статистика</RouterLink>
    </nav>
  </header>

  <RouterView />
  <div class="footer">© 2025, Палитра вкуса. Все права защищены.</div>
</template>

<style scoped>
/* Общие стили для навигации */
.nav-links {
  display: flex;
  justify-content: center;
  background-color: #ffffff;
  padding: 10px 0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Стили для ссылок */
.nav-link {
  color: rgb(0, 0, 0);
  text-decoration: none;
  padding: 10px 20px;
  margin: 0 5px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

/* Активная ссылка */
.nav-link.router-link-exact-active {
  background-color: #4caf50;
  color: white;
}

/* Стили при наведении */
.nav-link:hover {
  background-color: #a5f8be;
  color: rgb(0, 0, 0);
}

.footer {
  height: 10vh;
  background-color: #65e77b;
  text-align: left;
  display: flex;
  align-items: center;
  color: black;
  font-weight: bold;
  padding: 8px 16px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
}
</style>
