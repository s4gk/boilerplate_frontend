import { UI_PERMISSIONS, UiPermission } from "@/features/permissions/ui-permissions";

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  initials: string;
  role: string;
  permissions: UiPermission[];
}

export const currentUser: User = {
  id: 1,
  name: "Carlos Rodríguez",
  email: "carlos.rodriguez@empresa.com",
  avatar: "https://i.pravatar.cc/150?img=68",
  initials: "CR",
  role: "Administrador",
  permissions: Object.values(UI_PERMISSIONS),
};