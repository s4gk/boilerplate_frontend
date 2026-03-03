import { DashboardHeader } from "@/shared/components/header/Header";
import { AppSidebar } from "@/shared/components/sidebar/Sidebar";
import { SidebarInset, SidebarProvider } from "@/shared/ui/sidebar";
import { AuthProvider } from "@/features/auth/context/AuthProvider";
import { currentUser } from "@/shared/__mocks__/user";
import { Providers } from "../providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Providers>
        <SidebarProvider className="flex min-h-screen w-full">
          <AppSidebar />

          <SidebarInset>
            <DashboardHeader />
            {children}
          </SidebarInset>
        </SidebarProvider>
      </Providers>
    </AuthProvider>

  );
}
