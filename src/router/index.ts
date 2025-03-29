import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Kitchen from '@/components/Kitchen.vue';
import Main from '@/components/Main.vue';
import Statistics from '@/components/Statistics.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },
    {
      path: '/waiter',
      name: 'waiter',
      component: Home,
    },
    {
      path: '/kitchen',
      name: 'kitchen',
      component: Kitchen,
    },
    {
      path: '/stat',
      name: 'stat',
      component: Statistics,
    },
  ],
});

export default router;
