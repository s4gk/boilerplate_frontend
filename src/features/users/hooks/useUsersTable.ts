"use client"

import { useMemo, useState } from "react"
import type { Employee } from "@/shared/types/employee"
import { useUsers } from "../context/UsersProvider"

export function useUsersTable() {
  const {
    employees,
    isLoading,
    error,
    addEmployee,
    updateEmployee,
    deleteEmployee,
  } = useUsers()

  const [searchQuery, setSearchQuery] = useState("")
  const [formOpen, setFormOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null)

  const filteredEmployees = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()

    if (!query) return employees

    return employees.filter((employee) => {
      return (
        employee.name.toLowerCase().includes(query) ||
        employee.email.toLowerCase().includes(query) ||
        employee.roles.some((role) =>
          role.name.toLowerCase().includes(query)
        ) ||
        employee.status.toLowerCase().includes(query)
      )
    })
  }, [employees, searchQuery])

  const handleEdit = (employee: Employee) => {
    setSelectedEmployee(employee)
    setFormOpen(true)
  }

  const handleDeleteClick = (employee: Employee) => {
    setSelectedEmployee(employee)
    setDeleteOpen(true)
  }

  const handleSave = async (data: Omit<Employee, "id" | "createdAt">) => {
    if (selectedEmployee) {
      await updateEmployee(selectedEmployee.id, data)
    } else {
      await addEmployee(data)
    }

    setFormOpen(false)
    setSelectedEmployee(null)
  }

  const handleDeleteConfirm = async () => {
    if (!selectedEmployee) return

    await deleteEmployee(selectedEmployee.id)
    setDeleteOpen(false)
    setSelectedEmployee(null)
  }

  const handleToggleStatus = async (employee: Employee) => {
    const nextStatus: Employee["status"] =
      employee.status === "active" ? "inactive" : "active"

    await updateEmployee(employee.id, {
      name: employee.name,
      email: employee.email,
      roles: employee.roles,
      status: nextStatus,
    })
  }

  return {
    employees,
    filteredEmployees,
    isLoading,
    error,
    searchQuery,
    setSearchQuery,
    formOpen,
    setFormOpen,
    deleteOpen,
    setDeleteOpen,
    selectedEmployee,
    setSelectedEmployee,
    handleEdit,
    handleDeleteClick,
    handleSave,
    handleDeleteConfirm,
    handleToggleStatus
  }
}