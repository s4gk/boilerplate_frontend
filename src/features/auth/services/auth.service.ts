import { request } from "@/shared/lib/api"
import { AuthResponse, MeResponse } from "@/shared/types/user"

export const authService = {
  login(email: string, password: string) {
    return request<AuthResponse>({
      route: "/auth/login",
      method: "POST",
      data: { email, password },
    })
  },

  me(token?: string) {
    return request<MeResponse>({
      route: "/auth/me",
      method: "GET",
      ...(token && { headers: { Authorization: `Bearer ${token}` } }),
    })
  },

  logout() {
    return request<void>({
      route: "/auth/logout",
      method: "POST",
    })
  },

  refreshToken(refreshToken: string) {
    return request<{ token: string }>({
      route: "/auth/refresh",
      method: "POST",
      data: { refreshToken },
    })
  },
}