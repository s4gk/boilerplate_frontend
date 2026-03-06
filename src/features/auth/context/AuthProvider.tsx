"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"
import { User } from "@/shared/types/user"
import { authService } from "@/features/auth/services/auth.service"
import Cookies from "js-cookie"

interface AuthContextValue {
  user: User | null
  permissions: string[]
  isAuthenticated: boolean
  isLoading: boolean
  has: (permission?: string) => boolean
  login: (user: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Al cargar la app, si hay token, llamamos a /auth/me para restaurar la sesión
  useEffect(() => {
    const token = Cookies.get("auth_token")
    if (!token) {
      setIsLoading(false)
      return
    }

    authService
      .me()
      .then((userData) => {
        setUser(userData)
      })
      .catch(() => {
        // Token inválido o expirado, limpiamos todo
        Cookies.remove("auth_token")
        Cookies.remove("refresh_token")
        Cookies.remove("user_name")
        Cookies.remove("user_role")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [])

  const login = (userData: User) => {
    setUser(userData)
  }

  const logout = async () => {
    try {
      const refresh_token = Cookies.get("refresh_token")
      if (refresh_token) {
        await authService.logout(refresh_token)
      }
    } catch (error) {
      console.error("Error en logout backend:", error)
    } finally {
      setUser(null)
      Cookies.remove("auth_token")
      Cookies.remove("refresh_token")
      Cookies.remove("user_name")
      Cookies.remove("user_role")
    }
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      permissions: user?.permissions ?? [],
      isAuthenticated: !!user,
      isLoading,
      has: (permission?: string) => {
        if (!permission) return true
        if (user?.is_super_admin) return true
        return (user?.permissions ?? []).includes(permission)
      },
      login,
      logout,
    }),
    [user, isLoading]
  )

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