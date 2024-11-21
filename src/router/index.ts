import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Kitchen from '@/components/Kitchen.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/kitchen',
      name: 'kitchen',
      component: Kitchen,
    },
  ],
});

export default router;
