import { useState } from "react"
import { forgotPasswordService } from "@/features/auth/services/forgot-password.service"
import { mapApiError } from "@/shared/lib/apiError"

export type ForgotStep = 'EMAIL' | 'CODE' | 'RESET' | 'SUCCESS'

export function useForgotPassword() {
  const [step, setStep] = useState<ForgotStep>('EMAIL')
  const [email, setEmail] = useState<string | null>(null)
  const [codigo, setCodigo] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const goToEmail = () => {
    setStep('EMAIL')
    setError(null)
  }

  const submitEmail = async (emailValue: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await forgotPasswordService.sendEmail({ email: emailValue })

      if (!response.ok || !response.correo_estado) {
        setError('EMAIL_NOT_FOUND')
        return
      }

      setEmail(response.correo)
      setStep('CODE')
    } catch (err) {
      setError(mapApiError(err, 'EMAIL_FAILED'))
    } finally {
      setIsLoading(false)
    }
  }

  const submitCode = async (codigoValue: string) => {
    if (!email) return

    setIsLoading(true)
    setError(null)

    try {  
      const response = await forgotPasswordService.verifyCode({
        email,
        codigo: codigoValue,
      });

      if (!response.ok) {
        setError('INVALID_CODE');
        return;
      }

      setCodigo(codigoValue);
      setStep('RESET');
    } catch (err) {
      setError(mapApiError(err, 'INVALID_CODE'));
    } finally {
      setIsLoading(false);
    }
  }

  const submitNewPassword = async (newPassword: string) => {
    console.log("Valores actuales:", { email, codigo, newPassword });
    if (!email || !codigo) {
      alert("Error: El email o el código se perdieron en el estado.");
      return;
    }

    setIsLoading(true)
    setError(null)

    try {
      await forgotPasswordService.resetPassword({
        email,
        codigo,
        password: newPassword,
      })

      setStep('SUCCESS')
    } catch (err) {
      setError(mapApiError(err, 'RESET_FAILED'))
    } finally {
      setIsLoading(false)
    }
  }

  return {
    step,
    isLoading,
    error,
    submitEmail,
    submitCode,
    submitNewPassword,
    goToEmail,
  }
}