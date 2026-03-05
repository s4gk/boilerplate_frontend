import { request } from "@/shared/lib/api"
import type { Employee } from "@/shared/types/employee"

export interface CreateEmployeeDTO {
  name: string
  email: string
  role: Employee["role"]
  status: Employee["status"]
}

export const usersService = {
  getAll() {
    return request<Employee[]>({
      route: "/WSglEmpleados",
      method: "GET",
    })
  },

  getById(id: string) {
    return request<Employee>({
      route: `/WSglEmpleado/${id}`,
      method: "GET",
    })
  },

  create(data: CreateEmployeeDTO) {
    return request<Employee>({
      route: "/WSglCrearEmpleado",
      method: "POST",
      data,
    })
  },

  update(id: string, data: CreateEmployeeDTO) {
    return request<Employee>({
      route: `/WSglActualizarEmpleado/${id}`,
      method: "PUT",
      data,
    })
  },

  remove(id: string) {
    return request<void>({
      route: `/WSglEliminarEmpleado/${id}`,
      method: "DELETE",
    })
  },
}
