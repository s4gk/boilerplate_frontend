'use client'

import { LoginFormValues, loginSchema } from "@/schemas/login.schema"
import { authService } from '@/services/auth.service'
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
      await authService.login(values.email, values.password)
      router.push('/dashboard')
    } catch {
      setError('LOGIN_FAILED')
    }
  }

  return {
    form,
    onSubmit,
    isLoading: form.formState.isSubmitting,
    error,
  }
}
