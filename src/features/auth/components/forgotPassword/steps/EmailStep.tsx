'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { step1Schema, Step1Values } from '@/features/auth/schemas/forgot-password.schema'
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
import { Spinner } from "@/components/ui/spinner"

interface EmailStepProps {
  onSuccess: (email: string) => void
  isLoading: boolean
  error?: string | null
}

export function EmailStep({ onSuccess, isLoading, error }: EmailStepProps) {
  const form = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: { email: '' },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(({ email }) => onSuccess(email))}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo electrónico</FormLabel>
              <FormControl>
                <Input placeholder="correo@email.com" {...field} />
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
         <Button type="submit" className="w-full py-6" disabled={isLoading}>
          {isLoading ? <Spinner /> : "Enviar código"}
        </Button>
      </form>
    </Form>
  )
}
