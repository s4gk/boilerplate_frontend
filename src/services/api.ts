import axios from 'axios'

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
    }
    return Promise.reject(error)
  },
)

export interface RequestParams {
  route: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
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

export default api
