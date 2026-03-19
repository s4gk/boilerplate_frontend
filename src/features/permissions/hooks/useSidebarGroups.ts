"use client";

import { useMemo } from "react";
import { sidebarConfig, SidebarGroupConfig } from "@/shared/components/sidebar/sidebar.config";
import { filterSidebarGroups } from "@/features/permissions/sidebar/filterSidebarGroup";

/**
 * Hook que retorna los grupos del sidebar filtrados por permisos del usuario
 * Usa memoización para evitar recalcular en cada render
 */
export const useSidebarGroups = (userPermissions: string[]): SidebarGroupConfig[] => {
  return useMemo(
    () => filterSidebarGroups(sidebarConfig, userPermissions),
    [userPermissions]
  );
};