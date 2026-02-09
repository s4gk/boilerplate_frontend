'use client'

import { EmailStep } from './steps/EmailStep'
import { CodeStep } from './steps/CodeStep'
import { NewPasswordStep } from './steps/NewPasswordStep'
import { useForgotPassword } from '@/features/auth/hooks/useForgotPassowrd'
import { StepIndicator } from './steps/StepIndicator'
import Link from 'next/link'
import { SuccessStep } from './steps/SuccesStep'

export function ForgotPasswordForm() {
  const {
    step,
    submitEmail,
    submitCode,
    submitNewPassword,
    isLoading,
    goToEmail,
  } = useForgotPassword()

  return (
    <div className="flex w-full flex-col items-center justify-center md:w-1/2">
      <div className="w-full max-w-[70%] px-2 mb-12">
        <div className="mb-8 space-y-2  items-center justify-center">
          <h1 className="text-3xl font-bold text-left">
            Restablecer contraseña
          </h1>

          <p className="text-muted-foreground text-sm">
            Sigue los pasos para recuperar el acceso a tu cuenta.
          </p>
        </div>
        <StepIndicator step={step} />
        {step === 'EMAIL' && <EmailStep onSuccess={submitEmail} isLoading={isLoading} />}
        {step === 'CODE' && (
          <CodeStep
            onSuccess={submitCode}
            onBack={goToEmail}
          />
        )}
        {step === 'RESET' && <NewPasswordStep onSuccess={submitNewPassword} isLoading={isLoading} />}
        {step === 'SUCCESS' && <SuccessStep />}
      </div>
      {step !== 'SUCCESS' && (
      <div className="text-muted-foreground text-center text-sm">
        ¿Ya recordaste tu contraseña? {''}
        <Link
          href="/login"
          className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
        >
          Inicia sesión
        </Link>
      </div>)}
    </div>
  )
}

