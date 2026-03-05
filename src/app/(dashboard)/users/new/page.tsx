"use client"

import { UserForm } from "@/features/users/components/UserForm"
import type { Employee } from "@/shared/types/employee"

export default function NuevoUsuarioPage() {
  function createUser(data: Omit<Employee, "id" | "createdAt">) {
    // TODO: validar + persistir (API call)
    console.log("create user:", data)
  }

  return (
    <UserForm
      title="Nuevo usuario"
      description="Completa los datos para registrar un nuevo empleado en el sistema."
      onSave={createUser}
    />
  )
}