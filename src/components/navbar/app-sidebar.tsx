import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavUserAnonymous } from "./nav-user-anonymous";

import { useGetMe } from "@/features/authentication/hooks";
import { NavBarFooter } from "./nav-bar-footer";
import { NavUserLogged } from "./nav-user-logged";
import { SidebarContentUserAnonymous } from "./sidebar-content-user-anonymous";
import { SidebarContentUserLogged } from "./sidebar-content-user-logged";
import { useSidebar } from "@/hooks";
import { Loader2, ChartNoAxesColumn } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>): JSX.Element {
  const navigate = useNavigate();
  const { isMobile } = useSidebar();
  const getMeQuery = useGetMe();
  const isLoggedIn = getMeQuery.data?.user !== undefined;

  if (isLoggedIn && getMeQuery.isLoading) {
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
          <>
            <SidebarContentUserLogged />
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem
                    key="Stats"
                    className="text-text-secondary hover:text-text-primary hover:bg-transparent transition-colors"
                  >
                    <SidebarMenuButton
                      asChild
                      size="lg"
                      className="flex gap-3 bg-background-secondary border-border-primary border hover:bg-background-primary transition-colors"
                    >
                      <button
                        onClick={() => navigate("/stats")}
                        data-testid="sidebar-stats-button"
                      >
                        <ChartNoAxesColumn className="h-5 w-5" />
                        <span className="text-base">Stats</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </>
        ) : (
          <SidebarContentUserAnonymous />
        )}
      </SidebarContent>
      <NavBarFooter />
    </Sidebar>
  );
}
