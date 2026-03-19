import { ApiError } from "@/shared/lib/api"

export function mapApiError(
  err: unknown,
  fallback: string
): string {
  const error = err as ApiError

  if (error.status === 404) return "EMAIL_NOT_FOUND"
  if (error.status === 400) return "INVALID_CODE"
  if (error.status === 429) return "TOO_MANY_REQUESTS"

  return fallback
}
