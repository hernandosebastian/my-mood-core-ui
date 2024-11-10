import * as React from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { navSecondaryItems } from "./utils/navSecondaryItems";

export function NavSecondary({
  ...props
}: Readonly<React.ComponentPropsWithoutRef<typeof SidebarGroup>>): JSX.Element {
  return (
    <SidebarGroup className="mt-auto" {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {navSecondaryItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
