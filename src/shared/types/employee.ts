export interface Role {
  id: string
  name: string
}

export interface Employee {
  id: string
  name: string
  email: string
  roles: Role[]
  status: "active" | "inactive"
  createdAt: string
  lastLoginAt?: string | null
}
