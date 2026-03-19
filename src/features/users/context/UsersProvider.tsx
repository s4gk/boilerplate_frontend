"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import type { Employee } from "@/shared/types/employee"
import { usersService } from "../services/users.service"

interface UsersContextValue {
  employees: Employee[]
  isLoading: boolean
  error: string | null
  getEmployeeById: (id: string) => Employee | null
  refreshEmployees: () => Promise<void>
  addEmployee: (data: Omit<Employee, "id" | "createdAt">) => Promise<void>
  updateEmployee: (id: string, data: Omit<Employee, "id" | "createdAt">) => Promise<void>
  deleteEmployee: (id: string) => Promise<void>
}

const UsersContext = createContext<UsersContextValue | null>(null)

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await usersService.getAll({
        page: 1,
        limit: 10,
        is_active: true,
      })

      setEmployees(response.data)
    } catch (err) {
      console.error("Error fetching employees:", err)
      setError("No se pudieron cargar los empleados")
      setEmployees([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchEmployees()
  }, [fetchEmployees])

  const getEmployeeById = useCallback(
    (id: string) => employees.find((employee) => employee.id === id) ?? null,
    [employees]
  )

  const addEmployee = useCallback(async (_data: Omit<Employee, "id" | "createdAt">) => {
    setError("Crear empleados no está disponible con los endpoints actuales")
    return Promise.reject(new Error("Create endpoint not implemented"))
  }, [])

  const updateEmployee = useCallback(
    async (_id: string, _data: Omit<Employee, "id" | "createdAt">) => {
      setError("Actualizar empleados no está disponible con los endpoints actuales")
      return Promise.reject(new Error("Update endpoint not implemented"))
    },
    []
  )

  const deleteEmployee = useCallback(async (_id: string) => {
    setError("Eliminar empleados no está disponible con los endpoints actuales")
    return Promise.reject(new Error("Delete endpoint not implemented"))
  }, [])

  const value = useMemo<UsersContextValue>(
    () => ({
      employees,
      isLoading,
      error,
      getEmployeeById,
      refreshEmployees: fetchEmployees,
      addEmployee,
      updateEmployee,
      deleteEmployee,
    }),
    [
      employees,
      isLoading,
      error,
      getEmployeeById,
      fetchEmployees,
      addEmployee,
      updateEmployee,
      deleteEmployee,
    ]
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