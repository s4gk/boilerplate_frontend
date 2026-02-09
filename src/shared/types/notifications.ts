// types/notification.ts
export type NotificationType =
  | "task_assigned"
  | "task_completed";

export interface Notification {
  id: string;
  userId: string;
  title: string;
  description: string;
  type: NotificationType;
  createdAt: string; // ISO string
  isRead: boolean;
}
