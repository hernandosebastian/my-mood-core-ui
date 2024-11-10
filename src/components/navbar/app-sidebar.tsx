import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavSecondary } from "./nav-secondary";
import { NavUserAnonymous } from "./nav-user-anonymous";

import { useGetMe } from "@/features/authentication/hooks";
import { NavBarFooter } from "./nav-bar-footer";
import { NavUserLogged } from "./nav-user-logged";
import { SidebarContentUserAnonymous } from "./sidebar-content-user-anonymous";
import { SidebarContentUserLogged } from "./sidebar-content-user-logged";

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>): JSX.Element {
  const getMeQuery = useGetMe();
  const isLoggedIn = getMeQuery.data?.user !== undefined;
  return (
    <Sidebar {...props}>
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
