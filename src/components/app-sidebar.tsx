import * as React from "react";

import { DatePicker } from "@/components/date-picker";
import { NavUser } from "@/components/nav-user";
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
  ...props
}: React.ComponentProps<typeof Sidebar>): JSX.Element {
  return (
    <Sidebar {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarHeader>
      <SidebarContent>
        <DatePicker />
        <SidebarSeparator className="mx-0" />
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
