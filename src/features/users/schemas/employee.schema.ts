import { z } from "zod"

const roles = ["admin", "editor", "viewer"] as const
const statuses = ["active", "inactive"] as const

export const employeeSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Ingresa un correo electrónico válido"),
  role: z.enum(roles, { message: "Selecciona un rol válido" }),
  status: z.enum(statuses, { message: "Selecciona un estado válido" }),
})

export type EmployeeFormValues = z.infer<typeof employeeSchema>