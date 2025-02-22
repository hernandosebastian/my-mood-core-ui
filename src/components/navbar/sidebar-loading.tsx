import { useSidebar } from "@/hooks";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "../ui/sidebar";
import { Loader2 } from "lucide-react";
import { NavBarFooter } from "./nav-bar-footer";

export function SidebarLoading({
  ...props
}: React.ComponentProps<typeof Sidebar>): JSX.Element {
  const { isMobile } = useSidebar();

  return (
    <Sidebar {...props} id="sidebar" className="border-sidebar-border">
      {isMobile && (
        <div className="p-2 flex items-center border-b border-sidebar-border">
          <SidebarTrigger
            className="p-2 rounded-full transition-all"
            closeIcon={true}
            data-testid="toggle-sidebar-trigger-close-responsive"
          />
        </div>
      )}
      <SidebarHeader className="h-16 border-b border-sidebar-border justify-center items-center">
        <Loader2 className="h-6 w-6 animate-spin text-inherit" />
      </SidebarHeader>
      <SidebarContent className="justify-center items-center">
        <Loader2 className="h-6 w-6 animate-spin text-inherit" />
      </SidebarContent>
      <NavBarFooter />
    </Sidebar>
  );
}
