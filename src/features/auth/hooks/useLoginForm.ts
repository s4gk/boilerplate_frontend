import { LoginFormValues, loginSchema } from "@/features/auth/schemas/login.schema"
import { authService } from '@/features/auth/services/auth.service'
import { mapApiError } from "@/shared/lib/apiError"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation'
import { useAuth } from "@/features/auth/context/AuthProvider"
import { useSearchParams } from 'next/navigation'
import { useState } from "react"
import { useForm } from "react-hook-form"
import Cookies from 'js-cookie'

export function useLoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login } = useAuth()
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

      const cookieOptions = values.rememberMe
        ? { expires: 7 }
        : undefined

      // Guardamos el token
      Cookies.set('auth_token', response.access, cookieOptions)
      
      // Guardamos info del usuario para usarla en la app
      Cookies.set('user_name', response.empleado, cookieOptions);
      Cookies.set('user_role', response.rol, cookieOptions);

      if (response.refreshToken) {
        Cookies.set('refresh_token', response.refreshToken, { expires: 30 })
      }

      // Llamamos login() del contexto con los datos del usuario real
      login({
        id: response.empleado_id,
        name: response.empleado,
        email: values.email,
        avatar: '',
        role: response.rol,
        permissions: response.lista_permisos as any,
      })

      const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
      router.push(callbackUrl)

    } catch (err) {
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