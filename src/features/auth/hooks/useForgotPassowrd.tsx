'use client'

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

  const goToEmail = () => setStep('EMAIL')

  const submitEmail = async (email: string) => {
    setIsLoading(true)
    setError(null)

    try {
      await new Promise((r) => setTimeout(r, 800))
      //await forgotPasswordService.sendEmail({ email })
      setEmail(email)
      setStep('CODE')
    } catch (err) {
      setError(mapApiError(err, 'EMAIL_FAILED'))
    } finally {
      setIsLoading(false)
    }
  }

  const submitCode = async (code: string) => {
    if (!email) return

    setIsLoading(true)
    setError(null)

    try {
      await new Promise((r) => setTimeout(r, 800))
      //await forgotPasswordService.verifyCode({ email, code })
      setCode(code)
      setStep('RESET')
    } catch (err) {
      setError(mapApiError(err, 'INVALID_CODE'))
    } finally {
      setIsLoading(false)
    }
  }

  const submitNewPassword = async (newPassword: string) => {
    if (!email || !code) return

    setIsLoading(true)
    setError(null)

    try {
      await new Promise((r) => setTimeout(r, 800))
      /*await forgotPasswordService.resetPassword({
        email,
        code,
        newPassword,
      })*/
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
