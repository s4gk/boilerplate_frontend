import Link from "next/link"
import { BarChart3 } from "lucide-react"
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/shared/ui/sidebar"

export function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild>
          <Link href="/">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <BarChart3 className="size-4" />
            </div>
            <div className="flex flex-col gap-0.5 leading-none">
              <span className="font-semibold">Mi App</span>
              <span className="text-xs text-muted-foreground">v1.0.0</span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
