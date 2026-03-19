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

// Control para evitar múltiples refresh simultáneos
let isRefreshing = false
let failedQueue: Array<{
  resolve: (token: string) => void
  reject: (error: unknown) => void
}> = []

const processQueue = (error: unknown, token: string | null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (token) {
      resolve(token)
    } else {
      reject(error)
    }
  })
  failedQueue = []
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
  async (error) => {
    const originalRequest = error.config
    const requestUrl = originalRequest?.url || ""

    // Rutas que no deben intentar refresh
    const isAuthRoute =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/forgot-password") ||
      requestUrl.includes("/auth/refresh")

    // Si es 401 y no es ruta de auth y no se ha reintentado
    if (error.response?.status === 401 && !isAuthRoute && !originalRequest._retry) {
      const refreshToken = Cookies.get("refresh_token")

      // Si no hay refresh token, ir al login
      if (!refreshToken) {
        clearAuthCookies()
        redirectToLogin()
        return Promise.reject(formatError(error))
      }

      // Si ya se está refrescando, encolar la petición
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            return api(originalRequest)
          })
          .catch((err) => Promise.reject(err))
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // Intentar refresh
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          { refresh_token: refreshToken }
        )

        const newToken = data.access_token
        const newRefreshToken = data.refresh_token

        // Guardar nuevos tokens
        Cookies.set("auth_token", newToken)
        if (newRefreshToken) {
          Cookies.set("refresh_token", newRefreshToken, { expires: 30 })
        }

        // Procesar cola de peticiones pendientes
        processQueue(null, newToken)

        // Reintentar la petición original con el nuevo token
        originalRequest.headers.Authorization = `Bearer ${newToken}`
        return api(originalRequest)
      } catch (refreshError) {
        // Refresh falló, limpiar todo y al login
        processQueue(refreshError, null)
        clearAuthCookies()
        redirectToLogin()
        return Promise.reject(formatError(error))
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(formatError(error))
  }
)

function clearAuthCookies() {
  Cookies.remove("auth_token")
  Cookies.remove("refresh_token")
  Cookies.remove("user_name")
  Cookies.remove("user_role")
}

function redirectToLogin() {
  if (typeof window !== "undefined") {
    window.location.href = "/login"
  }
}

function formatError(error: any): ApiError {
  return {
    status: error.response?.status,
    code: error.response?.data?.code,
    message: error.response?.data?.message || "Unexpected error",
  }
}

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