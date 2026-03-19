"use client"

import {
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  User,
  CreditCard,
  Sparkles,
} from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { currentUser } from "@/shared/__mocks__/user"

const roleLabels: Record<string, string> = {
  admin: "Administrador",
  user: "Usuario",
  viewer: "Visualizador",
}

export function HeaderProfile() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-10 items-center gap-2 px-2 hover:bg-muted/50 transition-all rounded-full"
        >
          <div className="relative">
            <Avatar className="h-8 w-8 border shadow-sm">
              <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
              <AvatarFallback className="bg-primary/5 text-primary text-xs">
                {currentUser.initials}
              </AvatarFallback>
            </Avatar>
            {/* Indicador de estado online (opcional, le da un toque vivo) */}
            <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 border-2 border-background" />
          </div>
          
          <div className="hidden lg:flex flex-col items-start gap-0 text-left mr-1">
            <span className="text-sm font-medium leading-none">{currentUser.name}</span>
            <span className="text-[10px] text-muted-foreground leading-tight">Vestel S.A.S</span>
          </div>

          <ChevronDown className="size-3.5 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={12}
        className="w-72 rounded-xl p-0 shadow-xl border-muted-foreground/10 overflow-hidden"
      >
        {/* Header con Background sutil */}
        <div className="relative px-4 py-6 bg-muted/30">
          <div className="flex flex-col items-center text-center gap-2">
            <div className="relative">
               <Avatar className="h-14 w-14 border-2 border-background shadow-md">
                <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                <AvatarFallback className="text-lg bg-background font-bold">{currentUser.initials}</AvatarFallback>
              </Avatar>
              <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0 h-5 bg-primary text-[10px] border-2 border-background uppercase tracking-wider">
                {roleLabels[currentUser.role]}
              </Badge>
            </div>
            
            <div className="mt-2">
              <p className="text-sm font-bold leading-none">{currentUser.name}</p>
              <p className="text-xs text-muted-foreground mt-1.5">{currentUser.email || "usuario@ejemplo.com"}</p>
            </div>
          </div>
        </div>

        <DropdownMenuSeparator className="m-0" />

        {/* Acciones de Cuenta */}
        <div className="p-1.5">
          <DropdownMenuGroup>
            <DropdownMenuItem className="py-2.5 px-3 rounded-lg cursor-pointer">
              <User className="mr-3 size-4 text-muted-foreground" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">Mi Perfil</span>
                <span className="text-[10px] text-muted-foreground">Datos personales y avatar</span>
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuItem className="py-2.5 px-3 rounded-lg cursor-pointer">
              <Settings className="mr-3 size-4 text-muted-foreground" />
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">Configuración</span>
                <span className="text-[10px] text-muted-foreground">Preferencias del sistema</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </div>

        <DropdownMenuSeparator className="m-0" />

        {/* Soporte */}
        <div className="p-1.5">
          <DropdownMenuItem className="py-2.5 px-3 rounded-lg cursor-pointer">
            <HelpCircle className="mr-3 size-4 text-muted-foreground" />
            <span className="text-sm font-medium">Centro de Ayuda</span>
          </DropdownMenuItem>
        </div>

        <DropdownMenuSeparator className="m-0" />

        {/* Logout */}
        <div className="p-1.5">
          <DropdownMenuItem className="py-2.5 px-3 rounded-lg cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
            <LogOut className="mr-3 size-4" />
            <span className="text-sm font-semibold">Cerrar sesión</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}