import * as z from "zod";

export const step1Schema = z.object({
  email: z
    .string()
    .min(1, "El correo es requerido")
    .email("Correo no válido")
    .toLowerCase(),
});
export type Step1Values = z.infer<typeof step1Schema>;

export const step2Schema = z.object({
  code: z
    .string()
    .min(4, "El código debe tener al menos 4 dígitos")
    .max(6, "El código debe tener máximo 6 dígitos")
    .regex(/^[a-zA-Z0-9]+$/, "El código solo debe contener letras y números")
    .transform((val) => val.toUpperCase()),
});
export type Step2Values = z.infer<typeof step2Schema>;

export const step3Schema = z.object({
  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .max(100, "La contraseña es demasiado larga")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[a-z]/, "Debe contener al menos una minúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),
  confirmPassword: z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});
export type Step3Values = z.infer<typeof step3Schema>;