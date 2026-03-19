export interface Tenant {
  id: string
  name: string
  slug: string
  logo_url: string | null
  plan: string
}

export interface UserRole {
  id: string
  name: string
}

export interface User {
  id: string
  email: string
  username: string
  first_name: string
  last_name: string
  avatar_url: string | null
  is_super_admin: boolean
  tenant: Tenant
  roles: UserRole[]
  permissions: string[]
}

// Respuesta del /auth/me
export type MeResponse = User

// Respuesta del login
export interface AuthResponse {
  access_token: string
  refresh_token: string
}