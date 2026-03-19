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
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'
import { Spinner } from '@/components/ui/spinner'

interface NewPasswordStepProps {
  onSuccess: (password: string) => void
  isLoading: boolean
  error?: string | null
}

export function NewPasswordStep({ onSuccess, isLoading, error }: NewPasswordStepProps) {
  const [showPassword, setShowPassword] = useState(false)
  
  const form = useForm<Step3Values>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  // Esto te dirá en consola si hay errores de validación que bloquean el envío
  console.log("Errores de validación:", form.formState.errors);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ password }) => onSuccess(password))}
        className="space-y-6"
      >
        {/* NUEVA CONTRASEÑA */}
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
                    placeholder="••••••••"
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

        {/* CONFIRMAR CONTRASEÑA - ¡Este campo es OBLIGATORIO para el esquema! */}
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar contraseña</FormLabel>
              <FormControl>
                <Input 
                  type={showPassword ? "text" : "password"} 
                  {...field} 
                  disabled={isLoading}
                  placeholder="••••••••"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

        <Button type="submit" className="w-full py-6" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Restablecer contraseña"}
        </Button>
      </form>
    </Form>
  )
}