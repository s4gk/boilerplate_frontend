"use client"

import { useState } from "react"
import type { Employee } from "@/shared/types/employee"
import { useUsers } from "../context/UsersProvider"

export function useUsersTable() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useUsers()
  const [searchQuery, setSearchQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const filteredEmployees = employees.filter((e) => {
    const q = searchQuery.toLowerCase()
    return (
      e.name.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.role.toLowerCase().includes(q)
    )
  })

  function handleEdit(employee: Employee) {
    setSelectedEmployee(employee)
    setFormOpen(true)
  }

  function handleDeleteClick(employee: Employee) {
    setSelectedEmployee(employee)
    setDeleteOpen(true)
  }

  async function handleSave(
    data: Omit<Employee, "id" | "createdAt"> & { id?: string; createdAt?: string }
  ) {
    if (data.id) {
      await updateEmployee(data.id, {
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status,
      })
    } else {
      await addEmployee({
        name: data.name,
        email: data.email,
        role: data.role,
        status: data.status,
      })
    }
    setFormOpen(false)
    setSelectedEmployee(null)
  }

  async function handleDeleteConfirm() {
    if (!selectedEmployee) return
    await deleteEmployee(selectedEmployee.id)
    setDeleteOpen(false)
    setSelectedEmployee(null)
  }

  return {
    employees,
    filteredEmployees,
    searchQuery,
    setSearchQuery,
    formOpen,
    setFormOpen,
    deleteOpen,
    setDeleteOpen,
    selectedEmployee,
    handleEdit,
    handleDeleteClick,
    handleSave,
    handleDeleteConfirm,
  }
}
