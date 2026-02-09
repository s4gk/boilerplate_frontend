import { 
  SidebarGroupConfig, 
  SidebarItem 
} from "@/shared/components/sidebar/sidebar.config";
import { UiPermission } from "@/features/permissions/ui-permissions";
import { hasPermission } from "@/features/permissions/helpers";

const filterSidebarItems = (
  items: SidebarItem[],
  userPermissions: UiPermission[]
): SidebarItem[] => {
  return items
    .filter(item => {
      return hasPermission(userPermissions, item.permission);
    })
    .map(item => {
      if (item.children && item.children.length > 0) {
        const filteredChildren = filterSidebarItems(item.children, userPermissions);
        if (filteredChildren.length === 0) {
          return null;
        }
        
        return {
          ...item,
          children: filteredChildren,
        };
      }
      return item;
    })
    .filter((item): item is SidebarItem => item !== null);
};

export const filterSidebarGroups = (
  groups: SidebarGroupConfig[],
  userPermissions: UiPermission[]
): SidebarGroupConfig[] => {
  return groups
    .map(group => {
      const filteredItems = filterSidebarItems(group.items, userPermissions);
      if (filteredItems.length === 0) {
        return null;
      }
      
      return {
        ...group,
        items: filteredItems,
      };
    })
    .filter((group): group is SidebarGroupConfig => group !== null);
};