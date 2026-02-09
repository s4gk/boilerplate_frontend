"use client"

import { createContext, useContext, useMemo, useState } from "react"
import { UiPermission } from "@/features/permissions/ui-permissions"
import { hasPermission } from "@/features/permissions/helpers"
import { User } from "@/shared/types/user"

interface AuthContextValue {
  user: User | null
  permissions: UiPermission[]
  isAuthenticated: boolean
  has: (permission?: string) => boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const storedUser = localStorage.getItem("current_user")
      return storedUser ? JSON.parse(storedUser) : null
    } catch {
      localStorage.removeItem("current_user")
      return null
    }
  })

  const login = (userData: User) => {
    setUser(userData)
    localStorage.setItem("current_user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("current_user")
    localStorage.removeItem("auth_token")
    sessionStorage.removeItem("auth_token")
  }

  const value = useMemo<AuthContextValue>(() => ({
    user,
    permissions: user?.permissions ?? [],
    isAuthenticated: !!user,
    has: (permission?: string) =>
      hasPermission(user?.permissions ?? [], permission),
    login,
    logout,
  }), [user])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error("useAuth must be used inside AuthProvider")
  }
  return ctx
}
