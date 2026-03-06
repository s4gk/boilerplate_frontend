import { useState } from "react"
import { forgotPasswordService } from "@/features/auth/services/forgot-password.service"
import { mapApiError } from "@/shared/lib/apiError"

export type ForgotStep = 'EMAIL' | 'CODE' | 'RESET' | 'SUCCESS'

export function useForgotPassword() {
  const [step, setStep] = useState<ForgotStep>('EMAIL')
  const [email, setEmail] = useState<string | null>(null)
  const [code, setCode] = useState<string | null>(null)
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
      await forgotPasswordService.sendEmail({ email: emailValue })

      setEmail(emailValue)
      setStep('CODE')
    } catch (err) {
      setError(mapApiError(err, 'EMAIL_FAILED'))
    } finally {
      setIsLoading(false)
    }
  }

  const submitCode = async (codeValue: string) => {
    if (!email) return

    setIsLoading(true)
    setError(null)

    try {  
      const response = await forgotPasswordService.verifyCode({
        email,
        code: codeValue,
      });

      if (!response.verified) {
        setError('INVALID_CODE');
        return;
      }

      setCode(codeValue);
      setStep('RESET');
    } catch (err) {
      setError(mapApiError(err, 'INVALID_CODE'));
    } finally {
      setIsLoading(false);
    }
  }

  const submitNewPassword = async (newPassword: string) => {    
    if (!email || !code) {
      setError('RESET_FAILED')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      await forgotPasswordService.resetPassword({
        email,
        code,
        new_password: newPassword,
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