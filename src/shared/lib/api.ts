import axios from "axios"

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

api.interceptors.response.use(
  (response) => response,
  (error) => {
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
}

export async function request<T>({
  route,
  method,
  data,
  params,
}: RequestParams): Promise<T> {
  const res = await api({
    url: route,
    method,
    data,
    params,
  })

  return res.data
}
