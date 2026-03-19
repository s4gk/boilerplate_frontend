import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchNotifications, markNotificationAsRead } from "@/shared/lib/notifications-api";
import type { Notification } from "@/shared/types/notifications";

export function useNotifications(userId: string) {
  const queryClient = useQueryClient();

  const query = useQuery<Notification[]>({
    queryKey: ["notifications", userId],
    queryFn: () => fetchNotifications(userId),
  });

  const markAsRead = useMutation<void, Error, string, { prev?: Notification[] }>({
    mutationFn: markNotificationAsRead,

    onMutate: async (id) => {
      await queryClient.cancelQueries({
        queryKey: ["notifications", userId],
      });

      const prev = queryClient.getQueryData<Notification[]>([
        "notifications",
        userId,
      ]);

      queryClient.setQueryData<Notification[]>(
        ["notifications", userId],
        (old) =>
          old
            ? old.map((n) =>
                n.id === id ? { ...n, isRead: true } : n
              )
            : []
      );

      return { prev };
    },

    onError: (_err, _id, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(
          ["notifications", userId],
          ctx.prev
        );
      }
    },
  });

  return {
    ...query,
    markAsRead: markAsRead.mutate,
  };
}
