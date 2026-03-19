"use client";

import { useCallback } from "react";
import { UiPermission } from "@/features/permissions/ui-permissions";
import { 
  hasPermission, 
  hasAnyPermission, 
  hasAllPermissions 
} from "@/features/permissions/helpers";
import { currentUser } from "@/shared/__mocks__/user";

/**
 * Hook para validar permisos del usuario actual en componentes
 * 
 * @example
 * const { can, canAny } = usePermissions();
 * 
 * if (can(UI_PERMISSIONS.VENTAS_VER)) {
 *   // Mostrar botón
 * }
 */
export const usePermissions = () => {
  const userPermissions = currentUser.permissions;

  const can = useCallback(
    (permission?: string): boolean => {
      return hasPermission(userPermissions, permission);
    },
    [userPermissions]
  );

  const canAny = useCallback(
    (permissions: UiPermission[]): boolean => {
      return hasAnyPermission(userPermissions, permissions);
    },
    [userPermissions]
  );

  const canAll = useCallback(
    (permissions: UiPermission[]): boolean => {
      return hasAllPermissions(userPermissions, permissions);
    },
    [userPermissions]
  );

  return {
    can,
    canAny,
    canAll,
    permissions: userPermissions,
  };
};