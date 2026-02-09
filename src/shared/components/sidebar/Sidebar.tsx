"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/shared/ui/sidebar"
import { SidebarLogo } from "@/shared/components/sidebar/SidebarLogo"
import { SidebarNavigation } from "@/shared/components/sidebar/SidebarNavigation"

export function AppSidebar() {
  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent className="sidebar-scroll">
        <SidebarNavigation />
      </SidebarContent>
    </Sidebar>
  )
}
