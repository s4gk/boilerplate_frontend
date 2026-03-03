'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step2Schema, Step2Values } from '@/features/auth/schemas/forgot-password.schema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { Button } from '@/shared/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/shared/ui/input-otp'

interface CodeStepProps {
  onSuccess: (code: string) => void
  onBack: () => void
  error?: string | null
}

export function CodeStep({ onSuccess, onBack, error }: CodeStepProps) {
  const form = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: { code: '' },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ code }) => onSuccess(code))}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center space-y-6">
              <FormLabel>Código de verificación</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field} pattern="^[a-zA-Z0-9]+$">
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded">
            <p className="text-sm">
              {error}
            </p>
          </div>
        )}
        <div className="flex gap-4">
          <Button type="button" variant="outline" onClick={onBack} className="w-full">
            Atrás
          </Button>
          <Button type="submit" className="w-full">
            Verificar
          </Button>
        </div>
      </form>
    </Form>
  )
}
