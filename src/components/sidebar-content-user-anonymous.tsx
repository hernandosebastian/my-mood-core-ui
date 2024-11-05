import { LogIn, LucideIcon, UserPlus } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";

export function SidebarContentUserAnonymous(): JSX.Element {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem key="Log in">
            <SidebarMenuButton asChild size="default">
              <button>
                <LogIn />
                <span>Log in</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="Sign up">
            <SidebarMenuButton asChild size="default">
              <button>
                <UserPlus />
                <span>Sign up</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

