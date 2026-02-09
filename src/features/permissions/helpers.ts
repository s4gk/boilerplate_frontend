import { UiPermission } from "./ui-permissions";

export const hasPermission = (
  userPermissions: UiPermission[],
  requiredPermission?: string
): boolean => {
  if (!requiredPermission) return true;
  return userPermissions.includes(requiredPermission as UiPermission);
};


// Verifica si el usuario tiene al menos uno de los permisos requeridos
export const hasAnyPermission = (
  userPermissions: UiPermission[],
  requiredPermissions: UiPermission[]
): boolean => {
  if (requiredPermissions.length === 0) return true;
  
  return requiredPermissions.some(permission =>
    userPermissions.includes(permission)
  );
};


// Verifica si el usuario tiene todos los permisos requeridos
export const hasAllPermissions = (
  userPermissions: UiPermission[],
  requiredPermissions: UiPermission[]
): boolean => {
  if (requiredPermissions.length === 0) return true;
  
  return requiredPermissions.every(permission =>
    userPermissions.includes(permission)
  );
};