"use client";

import { useMemo } from "react";
import { sidebarConfig, SidebarGroupConfig } from "@/shared/components/sidebar/sidebar.config";
import { filterSidebarGroups } from "@/features/permissions/sidebar/filterSidebarGroup";
import { UiPermission } from "@/features/permissions/ui-permissions";

/**
 * Hook que retorna los grupos del sidebar filtrados por permisos del usuario
 * Usa memoización para evitar recalcular en cada render
 */
export const useSidebarGroups = (userPermissions: UiPermission[]): SidebarGroupConfig[] => {
  return useMemo(
    () => filterSidebarGroups(sidebarConfig, userPermissions),
    [userPermissions]
  );
};