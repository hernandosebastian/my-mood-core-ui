import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavUserAnonymous } from "./nav-user-anonymous";

import { useGetMe } from "@/features/authentication/hooks";
import { NavBarFooter } from "./nav-bar-footer";
import { NavUserLogged } from "./nav-user-logged";
import { SidebarContentUserAnonymous } from "./sidebar-content-user-anonymous";
import { SidebarContentUserLogged } from "./sidebar-content-user-logged";
import { useSidebar } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { SidebarLoading } from "./sidebar-loading";

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>): JSX.Element {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const getMeQuery = useGetMe();
  const isLoggedIn = getMeQuery.data?.user !== undefined;

  if (isLoggedIn && getMeQuery.isLoading) {
    return <SidebarLoading {...props} />;
  }

  return (
    <Sidebar {...props} id="sidebar" className="border-border-primary">
      {isMobile && (
        <div className="p-2 flex items-center border-b border-border-primary">
          <SidebarTrigger
            className="p-2 rounded-full transition-all"
            closeIcon={true}
            data-testid="toggle-sidebar-trigger-close-responsive"
          />
        </div>
      )}
      <SidebarHeader className="h-16 border-b border-border-primary">
        {isLoggedIn && getMeQuery.data ? (
          <NavUserLogged user={getMeQuery.data.user} />
        ) : (
          <NavUserAnonymous />
        )}
      </SidebarHeader>
      <SidebarContent>
        {isLoggedIn ? (
          <SidebarContentUserLogged navigate={navigate} />
        ) : (
          <SidebarContentUserAnonymous />
        )}
      </SidebarContent>
      <NavBarFooter />
    </Sidebar>
  );
}
