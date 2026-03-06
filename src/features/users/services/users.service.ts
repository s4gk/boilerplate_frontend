import { request } from "@/shared/lib/api"
import type { Employee } from "@/shared/types/employee"

export interface GetUsersParams {
  page?: number
  limit?: number
  is_active?: boolean
}

interface BackendUser {
  id: string
  email: string
  username: string
  first_name: string
  last_name: string
  avatar_url: string | null
  is_active: boolean
  is_verified: boolean
  last_login_at: string | null
  created_at: string
  roles: Array<{
    id: string
    name: string
  }>
}

interface BackendUsersResponse {
  data: BackendUser[]
  meta: {
    total: number
    page: number
    limit: number
    total_pages: number
  }
}

function mapBackendUserToEmployee(user: BackendUser): Employee {
  const fullName = `${user.first_name} ${user.last_name}`.trim()

  return {
    id: user.id,
    name: fullName || user.username || user.email,
    email: user.email,
    roles: user.roles ?? [],
    status: user.is_active ? "active" : "inactive",
    createdAt: user.created_at,
    lastLoginAt: user.last_login_at,
  }
}

export const usersService = {
  async getAll(params: GetUsersParams = {}) {
    const searchParams = new URLSearchParams()

    searchParams.set("page", String(params.page ?? 1))
    searchParams.set("limit", String(params.limit ?? 10))

    if (typeof params.is_active === "boolean") {
      searchParams.set("is_active", String(params.is_active))
    }

    const response = await request<BackendUsersResponse>({
      route: `/users?${searchParams.toString()}`,
      method: "GET",
    })

    return {
      data: response.data.map(mapBackendUserToEmployee),
      meta: response.meta,
    }
  },

  async getById(id: string) {
    const response = await request<BackendUser>({
      route: `/users/${id}`,
      method: "GET",
    })

    return mapBackendUserToEmployee(response)
  },
}