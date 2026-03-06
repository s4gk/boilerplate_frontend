import axios from "axios"
import Cookies from "js-cookie"

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

export interface ApiError {
  status?: number
  code?: string
  message: string
}

// Interceptor para agregar el token en cada petición
api.interceptors.request.use((config) => {
  const token = Cookies.get("auth_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Solo redirigir al login si es 401 y NO estamos en una ruta de auth
    const requestUrl = error.config?.url || ""
    const isAuthRoute = requestUrl.includes("/auth/login") || requestUrl.includes("/auth/forgot-password") || requestUrl.includes("/auth/me")

    if (error.response?.status === 401 && !isAuthRoute) {
      Cookies.remove("auth_token")
      Cookies.remove("refresh_token")
      Cookies.remove("user_name")
      Cookies.remove("user_role")
      if (typeof window !== "undefined") {
        window.location.href = "/login"
      }
    }

    return Promise.reject({
      status: error.response?.status,
      code: error.response?.data?.code,
      message:
        error.response?.data?.message || "Unexpected error",
    } satisfies ApiError)
  }
)

export interface RequestParams {
  route: string
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE"
  data?: unknown
  params?: unknown
  headers?: Record<string, string>
}

export async function request<T>({
  route,
  method,
  data,
  params,
  headers,
}: RequestParams): Promise<T> {
  const res = await api({
    url: route,
    method,
    data,
    params,
    headers,
  })

  return res.data
}