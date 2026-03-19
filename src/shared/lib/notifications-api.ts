import { Notification } from "@/shared/types/notifications";

let notifications: Notification[] = [
  {
    id: "1",
    userId: "13",
    title: "Nueva tarea asignada",
    description: "Revisar inventario de proteínas",
    type: "task_assigned",
    createdAt: new Date().toISOString(),
    isRead: false,
  },
];

export async function fetchNotifications(userId: string) {
  await new Promise(r => setTimeout(r, 300));
  return notifications.filter(n => n.userId === userId);
}

export async function markNotificationAsRead(id: string) {
  await new Promise(r => setTimeout(r, 200));
  notifications = notifications.map(n =>
    n.id === id ? { ...n, isRead: true } : n
  );
}
