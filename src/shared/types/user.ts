import { UiPermission } from "@/features/permissions/ui-permissions"

export interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: string
  permissions: UiPermission[]
}

// Tipo para la respuesta del login
export interface AuthResponse {
  user: User
  access: string
  empleado: string
  empleado_id: number
  rol: string
  refreshToken?: string
  lista_permisos: UiPermission[]
}