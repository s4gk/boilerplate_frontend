"use client"

import { Menu, User, Moon, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/shared/ui/dropdown-menu"
import { Button } from "@/shared/ui/button"

export function HeaderUtilityDrawer() {
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

        <DropdownMenuItem className="gap-2 py-2 text-red-500">
          <LogOut className="size-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
