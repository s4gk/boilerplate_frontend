'use client'

import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { useLoginForm } from '@/hooks/useLoginForm'
import Link from 'next/link'

export function LoginForm() {
  const { form, onSubmit, isLoading, error } = useLoginForm()

  return (
    <div className="flex w-full items-center justify-center md:w-1/2">
      <div className="w-full max-w-[70%] px-2">
        <div className="mb-12 space-y-8 text-left">
          <h1 className="text-3xl font-bold">Bienvenido a Saves</h1>
          <p className="text-muted-foreground text-sm">
            Ingrese sus credenciales para acceder a la plataforma.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo electrónico*</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña*</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="flex w-full">
                    <FormLabel>Recordar mi cuenta</FormLabel>
                    <Link
                      href="/forgot-password"
                      className="text-muted-foreground hover:text-primary ml-auto text-sm"
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </div>
                </FormItem>
              )}
            />

            {error && (
              <p className="text-destructive text-center text-sm">{error}</p>
            )}

            <Button type="submit" disabled={isLoading} className="w-full py-6">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión'
              )}
            </Button>
          </form>
        </Form>
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-6">
              ¿Necesitas ayuda?
            </span>
          </div>
        </div>

        <p className="text-muted-foreground text-center text-sm">
          Si tienes problemas para acceder, comunícate con el{' '}
          <Link
            href="/support"
            className="text-primary underline-offset-4 hover:underline"
          >
            área de sistemas
          </Link>
        </p>
      </div>
    </div>
  )
}
