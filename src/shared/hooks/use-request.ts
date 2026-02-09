'use client'

import { useState } from 'react'
import { request, RequestParams } from '@/shared/lib/api'

export function useRequest<T>() {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const execute = async (params: RequestParams): Promise<T> => {
    setLoading(true)
    setError(null)

    try {
      const response = await request<T>(params)
      setData(response)
      return response
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, execute }
}
