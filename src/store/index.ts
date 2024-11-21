import { defineStore } from 'pinia';

interface Notification {
  table: number;
  dish: string;
}

export const useNotificationsStore = defineStore('notifications', {
  state: () => ({
    notifications: [] as Notification[],
  }),
  actions: {
    addNotification(notification: Notification) {
      this.notifications.push(notification);
    },
    removeNotification(index: number) {
      this.notifications.splice(index, 1);
    },
  },
});
