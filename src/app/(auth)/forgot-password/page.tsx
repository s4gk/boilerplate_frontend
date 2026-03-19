
import { ForgotPasswordForm } from '@/features/auth/client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login Saves | Vestel',
  description: 'This is Signin Page Of Saves',
}

export default function SignIn() {
  return (
    <>
      <ForgotPasswordForm />
    </>
  )
}
