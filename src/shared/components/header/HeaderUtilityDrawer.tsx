"use client"

import { Menu, User, Moon, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/features/auth/context/AuthProvider"
import { useRouter } from "next/navigation"

export function HeaderUtilityDrawer() {
  const { logout } = useAuth()
  const router = useRouter()

  const handleLogout = async () => {
    console.log("Click Logout")
    try {
      await logout()
      router.replace("/login")
    } catch (error) {
      console.error("Error al cerrar sesión:", error)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9">
          <Menu className="size-5" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={8}
        className="w-56 rounded-xl p-2"
      >
        <DropdownMenuItem className="gap-2 py-2">
          <User className="size-4" />
          Mi cuenta
        </DropdownMenuItem>

        <DropdownMenuItem className="gap-2 py-2">
          <Moon className="size-4" />
          Tema
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleLogout}
          className="gap-2 py-2 text-red-500"
        >
          <LogOut className="size-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}