"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { useSidebarGroups } from "@/features/permissions/hooks/useSidebarGroups";
import { SidebarGroupSection } from "./SidebarGroup";
import { useAuth } from "@/features/auth/context/AuthProvider";
import { currentUser } from "@/shared/__mocks__/user";

export function SidebarNavigation() {
  const { state } = useSidebar();
  const { user } = useAuth();
  const isCollapsed = state === "collapsed";

  // ✅ Usar el hook directamente
  const visibleGroups = useSidebarGroups(user?.permissions ?? []);

  if (visibleGroups.length === 0) {
    return (
      <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
        No tienes permisos asignados
      </div>
    );
  }

  return (
    <>
      {visibleGroups.map((group, index) => (
        <SidebarGroupSection
          key={group.groupLabel}
          group={group}
          isCollapsed={isCollapsed}
          showSeparator={index > 0}
        />
      ))}
    </>
  );
}