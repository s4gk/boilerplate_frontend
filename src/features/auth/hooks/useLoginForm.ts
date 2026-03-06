import { LoginFormValues, loginSchema } from "@/features/auth/schemas/login.schema"
import { authService } from "@/features/auth/services/auth.service"
import { mapApiError } from "@/shared/lib/apiError"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useAuth } from "@/features/auth/context/AuthProvider"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"

export function useLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    setError(null)

    try {
      const response = await authService.login(values.email, values.password)

      const cookieOptions = values.rememberMe ? { expires: 7 } : undefined

      // Guardamos el token
      Cookies.set("auth_token", response.access_token, cookieOptions)

      if (response.refresh_token) {
        Cookies.set("refresh_token", response.refresh_token, { expires: 30 })
      }

      // Llamamos a /auth/me pasando el token directamente
      const user = await authService.me(response.access_token)

      // Guardamos el usuario en el contexto
      login(user)

      const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"
      router.push(callbackUrl)
    } catch (err) {
      setError(mapApiError(err, "LOGIN_FAILED"))
    }
  }

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
    error,
  }
}