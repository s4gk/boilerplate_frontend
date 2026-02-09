import { LoginForm } from '../../../features/auth/components/login/login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login Saves | Vestel',
  description: 'This is Signin Page Of Saves',
}

export default function SignIn() {
  return (
    <>
      <LoginForm />
    </>
  )
}
