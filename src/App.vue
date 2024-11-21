<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <Header></Header>
    <nav class="nav-links">
      <RouterLink to="/" class="nav-link">Официант</RouterLink>
      <RouterLink to="/kitchen" class="nav-link">Кухня</RouterLink>
    </nav>
  </header>

  <RouterView />
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
</style>
