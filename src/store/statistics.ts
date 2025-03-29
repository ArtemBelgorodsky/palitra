import { defineStore } from 'pinia';

interface DishStatistics {
  name: string;
  quantity: number;
  revenue: number;
  rating: number;
}

interface WaiterStatistics {
  name: string;
  orders: number;
  revenue: number;
  averageRating: number;
}

interface TableStatistics {
  tableNumber: number;
  orders: number;
  revenue: number;
  averageVisitDuration: number;
}

interface TimeStatistics {
  hour: number;
  visitors: number;
  revenue: number;
}

interface Review {
  id: number;
  rating: number;
  comment: string;
  date: string;
  tableNumber: number;
}

export const useStatisticsStore = defineStore('statistics', {
  state: () => ({
    dishes: [] as DishStatistics[],
    waiters: [] as WaiterStatistics[],
    tables: [] as TableStatistics[],
    timeStats: [] as TimeStatistics[],
    reviews: [] as Review[],
    totalRevenue: 0,
    totalVisitors: 0,
    averageCheck: 0,
    averageVisitDuration: 0,
    turnoverRate: 0,
  }),

  getters: {
    getTopDishes: (state) => {
      return [...state.dishes]
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);
    },
    getTopWaiters: (state) => {
      return [...state.waiters]
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);
    },
    getPeakHours: (state) => {
      return [...state.timeStats]
        .sort((a, b) => b.visitors - a.visitors)
        .slice(0, 3);
    },
    getAverageRating: (state) => {
      return (
        state.reviews.reduce((acc, review) => acc + review.rating, 0) /
        state.reviews.length
      );
    },
  },

  actions: {
    async fetchStatistics() {
      this.dishes = [
        {
          name: 'Цезарь с курицей',
          quantity: 350,
          revenue: 45000,
          rating: 4.8,
        },
        {
          name: 'Стейк из говядины',
          quantity: 250,
          revenue: 80000,
          rating: 4.9,
        },
        { name: 'Пицца Маргарита', quantity: 600, revenue: 60000, rating: 4.7 },
      ];

      this.waiters = [
        { name: 'Анна', orders: 150, revenue: 225000, averageRating: 4.8 },
        { name: 'Иван', orders: 120, revenue: 180000, averageRating: 4.6 },
        { name: 'Мария', orders: 180, revenue: 270000, averageRating: 4.9 },
      ];

      this.tables = [
        {
          tableNumber: 1,
          orders: 45,
          revenue: 67500,
          averageVisitDuration: 45,
        },
        {
          tableNumber: 2,
          orders: 38,
          revenue: 57000,
          averageVisitDuration: 40,
        },
        {
          tableNumber: 3,
          orders: 42,
          revenue: 63000,
          averageVisitDuration: 50,
        },
      ];

      this.timeStats = [
        { hour: 12, visitors: 45, revenue: 67500 },
        { hour: 13, visitors: 60, revenue: 90000 },
        { hour: 14, visitors: 55, revenue: 82500 },
      ];

      this.reviews = [
        {
          id: 1,
          rating: 5,
          comment: 'Отличный сервис!',
          date: '2024-03-29',
          tableNumber: 1,
        },
        {
          id: 2,
          rating: 4,
          comment: 'Вкусная еда',
          date: '2024-03-29',
          tableNumber: 2,
        },
      ];

      this.calculateGeneralStatistics();
    },

    calculateGeneralStatistics() {
      this.totalRevenue = this.tables.reduce(
        (acc, table) => acc + table.revenue,
        0
      );
      this.totalVisitors = this.timeStats.reduce(
        (acc, time) => acc + time.visitors,
        0
      );
      this.averageCheck = this.totalRevenue / this.totalVisitors;
      this.averageVisitDuration =
        this.tables.reduce(
          (acc, table) => acc + table.averageVisitDuration,
          0
        ) / this.tables.length;
      this.turnoverRate =
        this.tables.reduce((acc, table) => acc + table.orders, 0) /
        (this.tables.length * 24);
    },
  },
});
