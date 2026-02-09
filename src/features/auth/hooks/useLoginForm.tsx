'use client'

import { LoginFormValues, loginSchema } from "@/features/auth/schemas/login.schema"
import { authService } from '@/features/auth/services/auth.service'
import { mapApiError } from "@/shared/lib/apiError"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { useForm } from "react-hook-form"

export function useLoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (values: LoginFormValues) => {
    setError(null)

    try {
      const response = await authService.login(values.email, values.password)
      
      // 💾 Guardar token si remember me está activo
      if (values.rememberMe) {
        localStorage.setItem('auth_token', response.token)
      } else {
        sessionStorage.setItem('auth_token', response.token)
      }

      // 🔄 Redirigir al dashboard
      router.push('/dashboard')
    } catch (err) {
      // ✅ Usar el helper de errores
      setError(mapApiError(err, 'LOGIN_FAILED'))
    }
  }

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
    error,
  }
}