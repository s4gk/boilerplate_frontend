import { ForgotPasswordForm } from './forgot-password-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forgot Password Saves | Vestel',
  description: 'This is Forgot Password Page Of Saves',
}

export default function page() {
  return (
    <>
      <ForgotPasswordForm />
    </>
  )
}
