'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step3Schema, Step3Values } from '@/features/auth/schemas/forgot-password.schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Button } from '@/shared/ui/button'
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { useState } from 'react'
import { Spinner } from '@/shared/ui/spinner'

interface NewPasswordStepProps {
  onSuccess: (password: string) => void
  isLoading: boolean
}

export function NewPasswordStep({ onSuccess, isLoading }: NewPasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false)
  
  const form = useForm<Step3Values>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ password }) => onSuccess(password))}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nueva contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input 
                    type={showPassword ? "text" : "password"} 
                    {...field} 
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Campo Confirm Password igual al anterior... */}
        <Button type="submit" className="w-full py-6" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Restablecer contraseña"}
        </Button>
      </form>
    </Form>
  )
}
