import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavSecondary } from "./nav-secondary";
import { NavUserAnonymous } from "./nav-user-anonymous";

import { useGetMe } from "@/features/authentication/hooks";
import { NavBarFooter } from "./nav-bar-footer";
import { NavUserLogged } from "./nav-user-logged";
import { SidebarContentUserAnonymous } from "./sidebar-content-user-anonymous";
import { SidebarContentUserLogged } from "./sidebar-content-user-logged";
import { useSidebar } from "@/hooks";
import { Loader2 } from "lucide-react";

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>): JSX.Element {
  const { isMobile } = useSidebar();
  const getMeQuery = useGetMe();
  const isLoggedIn = getMeQuery.data?.user !== undefined;

  if (getMeQuery.isLoading) {
    return (
      <Sidebar {...props} id="sidebar">
        {isMobile && (
          <div className="p-2 flex items-center border-b border-sidebar-border">
            <SidebarTrigger
              className="p-2 rounded-full hover:bg-sidebar-accent transition-all"
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
        <SidebarContent>
          <NavSecondary />
        </SidebarContent>
        <NavBarFooter />
      </Sidebar>
    );
  }

  return (
    <Sidebar {...props} id="sidebar">
      {isMobile && (
        <div className="p-2 flex items-center border-b border-sidebar-border">
          <SidebarTrigger
            className="p-2 rounded-full hover:bg-sidebar-accent transition-all"
            closeIcon={true}
            data-testid="toggle-sidebar-trigger-close-responsive"
          />
        </div>
      )}
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        {isLoggedIn && getMeQuery.data ? (
          <NavUserLogged user={getMeQuery.data.user} />
        ) : (
          <NavUserAnonymous />
        )}
      </SidebarHeader>
      <SidebarContent>
        {isLoggedIn ? (
          <SidebarContentUserLogged />
        ) : (
          <SidebarContentUserAnonymous />
        )}
      </SidebarContent>
      <SidebarContent>
        <NavSecondary />
      </SidebarContent>
      <NavBarFooter />
    </Sidebar>
  );
}
