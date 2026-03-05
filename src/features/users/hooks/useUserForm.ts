"use client"

import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { employeeSchema, EmployeeFormValues } from "../schemas/employee.schema"
import { useUsers } from "../context/UsersProvider"
import type { Employee } from "@/shared/types/employee"

interface UseUserFormOptions {
  employee?: Employee | null
  onSuccess?: () => void
}

export function useUserForm({ employee, onSuccess }: UseUserFormOptions = {}) {
  const router = useRouter()
  const { addEmployee, updateEmployee } = useUsers()
  const isEditing = !!employee

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      name: employee?.name ?? "",
      email: employee?.email ?? "",
      role: employee?.role ?? "viewer",
      status: employee?.status ?? "active",
    },
  })

  const onSubmit = async (values: EmployeeFormValues) => {
    if (isEditing && employee) {
      await updateEmployee(employee.id, values)
    } else {
      await addEmployee(values)
    }

    if (onSuccess) {
      onSuccess()
    } else {
      router.push("/users")
    }
  }

  return {
    form,
    onSubmit,
    isEditing,
    isLoading: form.formState.isSubmitting,
  }
}
