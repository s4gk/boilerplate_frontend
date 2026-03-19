/**
 * Verifica si el usuario tiene un permiso específico
 * Los permisos vienen del backend en formato: "modulo.submodulo.accion"
 * Ejemplo: "dashboard.principal.ver", "usuarios.administrar.crear"
 */
export const hasPermission = (
  userPermissions: string[],
  requiredPermission?: string
): boolean => {
  if (!requiredPermission) return true
  return userPermissions.includes(requiredPermission)
}

// Verifica si el usuario tiene al menos uno de los permisos requeridos
export const hasAnyPermission = (
  userPermissions: string[],
  requiredPermissions: string[]
): boolean => {
  if (requiredPermissions.length === 0) return true

  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  )
}

// Verifica si el usuario tiene todos los permisos requeridos
export const hasAllPermissions = (
  userPermissions: string[],
  requiredPermissions: string[]
): boolean => {
  if (requiredPermissions.length === 0) return true

  return requiredPermissions.every((permission) =>
    userPermissions.includes(permission)
  )
}

/**
 * Verifica si el usuario tiene permisos para un módulo completo
 * Ejemplo: hasModuleAccess(permisos, "dashboard") → true si tiene cualquier permiso de dashboard.*
 */
export const hasModuleAccess = (
  userPermissions: string[],
  module: string
): boolean => {
  return userPermissions.some((p) => p.startsWith(`${module}.`))
}