import { request } from "@/shared/lib/api"
import { AuthResponse } from "@/shared/types/user"

export const authService = {
  login(email: string, password: string) {
    return request<AuthResponse>({
      route: "/WSglLogin",
      method: "POST",
      data: { email, password },
    })
  },

  logout() {
    return request<void>({
      route: "/auth/logout/",
      method: "POST",
    })
  },

  refreshToken(refreshToken: string) {
    return request<{ token: string }>({
      route: "/auth/refresh/",
      method: "POST",
      data: { refreshToken },
    })
  },
}