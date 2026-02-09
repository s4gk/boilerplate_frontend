"use client"

import Link from "next/link"
import { ChevronRight } from "lucide-react"
import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/shared/ui/sidebar"
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/shared/ui/collapsible"
import type { SidebarItem } from "@/shared/components/sidebar/sidebar.config"

export function SidebarItem({ item }: { item: SidebarItem }) {
  if (item.children?.length) {
    return (
      <Collapsible asChild className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={item.label}>
              {item.icon && <item.icon className="size-4" />}
              <span>{item.label}</span>
              <ChevronRight className="ml-auto size-4 transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children.map(child => (
                <SidebarMenuSubItem key={child.label}>
                  <SidebarMenuSubButton asChild>
                    <Link href={child.href ?? "#"}>
                      <span>{child.label}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    )
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild tooltip={item.label}>
        <Link href={item.href ?? "#"}>
          {item.icon && <item.icon className="size-4" />}
          <span>{item.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
