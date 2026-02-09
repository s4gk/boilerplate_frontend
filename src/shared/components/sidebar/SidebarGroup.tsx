"use client"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarSeparator,
} from "@/shared/ui/sidebar"
import { SidebarItem } from "./SidebarItem"
import type { SidebarGroupConfig } from "@/shared/components/sidebar/sidebar.config"

type Props = {
  group: SidebarGroupConfig
  isCollapsed: boolean
  showSeparator: boolean
}

export function SidebarGroupSection({
  group,
  isCollapsed,
  showSeparator,
}: Props) {
  return (
    <>
      {isCollapsed && showSeparator && <SidebarSeparator className="my-2" />}

      <SidebarGroup>
        {!isCollapsed && (
          <SidebarGroupLabel>{group.groupLabel}</SidebarGroupLabel>
        )}

        <SidebarGroupContent>
          <SidebarMenu>
            {group.items.map(item => (
              <SidebarItem key={item.label} item={item} />
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </>
  )
}
