"use client"

import { createContext, useCallback, useContext, useMemo, useState } from "react"
import type { Employee } from "@/shared/types/employee"
import { initialUsers } from "@/shared/__mocks__/employee"
import { usersService } from "../services/users.service"

interface UsersContextValue {
  employees: Employee[]
  isLoading: boolean
  error: string | null
  getEmployeeById: (id: string) => Employee | null
  addEmployee: (data: Omit<Employee, "id" | "createdAt">) => Promise<void>
  updateEmployee: (id: string, data: Omit<Employee, "id" | "createdAt">) => Promise<void>
  deleteEmployee: (id: string) => Promise<void>
}

const UsersContext = createContext<UsersContextValue | null>(null)

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>(initialUsers)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getEmployeeById = useCallback(
    (id: string) => employees.find((e) => e.id === id) ?? null,
    [employees]
  )

  const addEmployee = useCallback(async (data: Omit<Employee, "id" | "createdAt">) => {
    setIsLoading(true)
    setError(null)
    try {
      const created = await usersService.create(data)
      setEmployees((prev) => [created, ...prev])
    } catch {
      // Fallback: crear localmente si la API no está disponible
      const newEmployee: Employee = {
        id: crypto.randomUUID(),
        ...data,
        createdAt: new Date().toISOString().split("T")[0],
      }
      setEmployees((prev) => [newEmployee, ...prev])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateEmployee = useCallback(async (id: string, data: Omit<Employee, "id" | "createdAt">) => {
    setIsLoading(true)
    setError(null)
    try {
      const updated = await usersService.update(id, data)
      setEmployees((prev) => prev.map((e) => (e.id === id ? updated : e)))
    } catch {
      // Fallback: actualizar localmente si la API no está disponible
      setEmployees((prev) => prev.map((e) => (e.id === id ? { ...e, ...data } : e)))
    } finally {
      setIsLoading(false)
    }
  }, [])

  const deleteEmployee = useCallback(async (id: string) => {
    setIsLoading(true)
    setError(null)
    try {
      await usersService.remove(id)
    } catch {
      // Fallback: continuar con el delete local si la API no está disponible
    } finally {
      setEmployees((prev) => prev.filter((e) => e.id !== id))
      setIsLoading(false)
    }
  }, [])

  const value = useMemo<UsersContextValue>(
    () => ({
      employees,
      isLoading,
      error,
      getEmployeeById,
      addEmployee,
      updateEmployee,
      deleteEmployee,
    }),
    [employees, isLoading, error, getEmployeeById, addEmployee, updateEmployee, deleteEmployee]
  )

  return <UsersContext.Provider value={value}>{children}</UsersContext.Provider>
}

export function useUsers() {
  const ctx = useContext(UsersContext)
  if (!ctx) {
    throw new Error("useUsers must be used inside UsersProvider")
  }
  return ctx
}
