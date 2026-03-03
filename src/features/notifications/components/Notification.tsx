"use client";

import { Bell, CheckCheck, Inbox } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { NotificationItem } from "./NotificationItem";
import { useNotifications } from "@/features/notifications/hooks/use-notifications";
import { Separator } from "@/components/ui/separator";

export function Notifications() {
  const userId = "13";
  const { data = [], isLoading } = useNotifications(userId);

  const unreadCount = data.filter(n => !n.isRead).length;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative hover:bg-accent">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-bold"
            >
              {unreadCount > 9 ? "9+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-80 p-0 mt-2" align="end">
        {/* Header con acciones rápidas */}
        <div className="flex items-center justify-between p-4 pb-2">
          <h4 className="text-sm font-semibold">Notificaciones</h4>
          {unreadCount > 0 && (
            <Button variant="ghost" className="h-auto p-0 text-xs text-primary hover:bg-transparent">
              Marcar todo como leído
            </Button>
          )}
        </div>
        
        <Separator />

        <ScrollArea className="h-[400px]">
          {data.length > 0 ? (
            <div className="flex flex-col">
              {data.map((n) => (
                <NotificationItem key={n.id} notification={n} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex h-[300px] flex-col items-center justify-center space-y-2 text-center">
              <div className="rounded-full bg-muted p-3">
                <Inbox className="h-6 w-6 text-muted-foreground" />
              </div>
              <p className="text-sm font-medium">No hay notificaciones</p>
              <p className="text-xs text-muted-foreground">Te avisaremos cuando pase algo.</p>
            </div>
          )}
        </ScrollArea>
        
        <Separator />
        
        <div className="p-2">
          <Button variant="ghost" className="w-full justify-center text-xs text-muted-foreground">
            Ver todas las notificaciones
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}