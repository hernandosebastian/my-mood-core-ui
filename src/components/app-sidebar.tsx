import * as React from "react";

import { DatePicker } from "@/components/date-picker";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { LifeBuoy, Send } from "lucide-react";
import { NavSecondary } from "./nav-secondary";
import { NavUserLogged } from "./nav-user-logged";
import { NavUserAnonymous } from "./nav-user-anonymous";

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

function SidebarContentUserLogged(): JSX.Element {
  return (
    <>
      <DatePicker />
      <SidebarSeparator className="mx-0" />
    </>
  );
}

function SidebarContentUserAnonymous(): JSX.Element {
  return (
    <>
      <SidebarSeparator className="mx-0" />
    </>
  );
}

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
        <NavSecondary items={data.navSecondary} className="mt-auto" />{" "}
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
