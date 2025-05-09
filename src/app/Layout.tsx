import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/navbar/app-sidebar";

import { AppHeader } from "@/components/navbar/app-header";
import { Footer } from "@/features/footer/components";
import { useScrollToTop } from "@/hooks";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  useScrollToTop();

  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <AppHeader />
        <SidebarInset className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10 justify-center bg-background-primary">
          {children}
        </SidebarInset>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
