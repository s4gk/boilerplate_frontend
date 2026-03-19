import * as z from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Ingrese un correo válido'),
  password: z.string().min(5, 'La contraseña debe tener al menos 5 caracteres'),
  rememberMe: z.boolean().optional(),
})

export type LoginFormValues = z.infer<typeof loginSchema>
