import { Suspense } from 'react'
import { LoginForm } from '@/features/auth/client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login Saves | Vestel',
  description: 'This is Signin Page Of Saves',
}

export default function SignIn() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
