import { ClipboardList, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Notification } from "@/shared/types/notifications";
import { useNotifications } from "@/features/notifications/hooks/use-notifications";

export function NotificationItem({
  notification,
}: {
  notification: Notification;
}) {
  const { markAsRead } = useNotifications(notification.userId);

  const isUnread = !notification.isRead;
  const Icon =
    notification.type === "task_completed"
      ? CheckCircle2
      : ClipboardList;

  return (
    <div
      onClick={() => isUnread && markAsRead(notification.id)}
      className={cn(
        "group flex gap-3 px-4 py-3 border-b last:border-0 cursor-pointer transition-colors",
        isUnread
          ? "bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-50"
          : "hover:bg-muted/40"
      )}
    >
      {/* Icono */}
      <div
        className={cn(
          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          notification.type === "task_completed"
            ? "bg-emerald-100 text-emerald-600"
            : "bg-blue-100 text-blue-600"
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      {/* Contenido */}
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between gap-2">
          <p
            className={cn(
              "text-sm leading-snug",
              isUnread ? "font-semibold text-foreground" : "font-medium text-muted-foreground"
            )}
          >
            {notification.title}
          </p>

          {/* Indicador único de no leído */}
          {isUnread && (
            <span className="h-2 w-2 rounded-full bg-blue-600 shrink-0" />
          )}
        </div>

        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
          {notification.description}
        </p>

        <span className="text-[11px] text-muted-foreground/70">
          {new Date(notification.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
}
