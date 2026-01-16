import { request } from "@/lib/api"

export interface User {
  id: string
  email: string
  name: string
  role: 'admin' | 'user'
}


export interface AuthResponse {
  user: User
  token: string
}

export const authService = {
  login(email: string, password: string) {
    return request<AuthResponse>({
      route: "/auth/login/",
      method: "POST",
      data: { email, password },
    })
  },
}
