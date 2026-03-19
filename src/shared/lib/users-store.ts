import { initialUsers } from "../types/initial-users"
import type { Employee } from "../types/employee"

let users: Employee[] = [...initialUsers]
let listeners: Array<() => void> = []

function notify() {
  listeners.forEach((l) => l())
}

export const usersStore = {
  getUsers() {
    return users
  },
  getUserById(id: string) {
    return users.find((u) => u.id === id) ?? null
  },
  addUser(data: Omit<Employee, "id" | "createdAt">) {
    const newUser: Employee = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
      createdAt: new Date().toISOString().split("T")[0],
    }
    users = [newUser, ...users]
    notify()
    return newUser
  },
  updateUser(id: string, data: Omit<Employee, "id" | "createdAt">) {
    users = users.map((u) =>
      u.id === id
        ? { ...u, name: data.name, email: data.email, role: data.role, status: data.status }
        : u
    )
    notify()
  },
  deleteUser(id: string) {
    users = users.filter((u) => u.id !== id)
    notify()
  },
  subscribe(listener: () => void) {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter((l) => l !== listener)
    }
  },
  getSnapshot() {
    return users
  },
}
