"use client"

import { use } from "react"
import { notFound } from "next/navigation"
import { UserForm } from "@/features/users/components/UserForm"
import { useUsers } from "@/features/users/context/UsersProvider"
import { Employee } from "@/shared/types/employee"

export default function EditarUsuarioPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { getEmployeeById } = useUsers()
  const employee = getEmployeeById(id)

  if (!employee) {
    notFound()
  }

  const handleSave = (data: Omit<Employee, "id" | "createdAt">) => {
    // TODO: Implement save logic here
    console.log("Saving employee:", data)
  }

  return (
    <UserForm
      employee={employee}
      onSave={handleSave}
      title="Editar usuario"
      description={`Modifica la informacion de ${employee.name}.`}
    />
  )
}
