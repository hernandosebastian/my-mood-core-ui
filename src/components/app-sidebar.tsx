import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { LifeBuoy, Send } from "lucide-react";
import { NavSecondary } from "./nav-secondary";
import { NavUserLogged } from "./nav-user-logged";
import { NavUserAnonymous } from "./nav-user-anonymous";
import { SidebarContentUserLogged } from "./sidebar-content-user-logged";
import { SidebarContentUserAnonymous } from "./sidebar-content-user-anonymous";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navSecondary: [
    { title: "Support", url: "#", icon: LifeBuoy },
    { title: "Feedback", url: "#", icon: Send },
  ],
};

export function AppSidebar({
  isLoggedIn = false,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  isLoggedIn?: boolean;
}): JSX.Element {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        {isLoggedIn ? <NavUserLogged user={data.user} /> : <NavUserAnonymous />}
      </SidebarHeader>
      <SidebarContent>
        {isLoggedIn ? (
          <SidebarContentUserLogged />
        ) : (
          <SidebarContentUserAnonymous />
        )}
      </SidebarContent>
      <SidebarContent>
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter className="text-center">
        <small>
          Made with <a href="https://github.com/shadcn-ui/ui">shadcn-ui</a>
        </small>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
