"use client"

import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumbs } from "@/shared/components/header/Breadcrumbs"
import { SearchInput } from "@/shared/components/header/SearchInput"
import { HeaderProfile } from "@/shared/components/header/HeaderProfile"
import { HeaderUtilityDrawer } from "@/shared/components/header/HeaderUtilityDrawer"
import { Notifications } from "../../../features/notifications/components/Notification"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 h-16 w-full border-b bg-background/80 backdrop-blur-md px-4">
      <div className="mx-auto flex h-full items-center justify-between gap-4">
        
        {/* LADO IZQUIERDO: Navegación y Contexto */}
        <div className="flex items-center gap-2 md:gap-4 shrink-0">
          <SidebarTrigger className="h-9 w-9 hover:bg-muted transition-colors" />
          <Separator orientation="vertical" className="hidden h-5 md:block opacity-50" />
          <div className="hidden md:block">
            <Breadcrumbs />
          </div>
        </div>

        {/* LADO DERECHO: Acciones Integradas */}
        <div className="flex items-center gap-1.5 md:gap-3">
          
          {/* Quitamos envoltorios restrictivos y dejamos que el componente maneje su responsive */}
          <SearchInput />
          
          <div className="hidden lg:block h-5 w-[1px] bg-border mx-1" />

          <Notifications />

          {/* Lógica de visibilidad para Profile/Drawer */}
          <div className="lg:hidden">
            <HeaderUtilityDrawer />
          </div>
          
          <div className="hidden lg:block">
            <HeaderProfile />
          </div>
        </div>
      </div>
    </header>
  )
}