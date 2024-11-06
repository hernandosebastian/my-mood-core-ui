import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 justify-center">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
