import { LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

export function SidebarContentUserAnonymous(): JSX.Element {
  const navigate = useNavigate();

  const handleLoginClick = (): void => {
    navigate("/log-in");
  };

  const handleSignUpClick = (): void => {
    navigate("/sign-up");
  };

  return (
    <SidebarGroup className="border-b border-border-primary">
      <SidebarGroupContent>
        <SidebarMenu className="gap-4">
          <SidebarMenuItem key="Log in">
            <SidebarMenuButton asChild size="default">
              <button
                onClick={handleLoginClick}
                data-testid="sidebar-log-in-button"
                className="text-text-secondary hover:text-text-primary hover:bg-transparent transition-colors"
              >
                <LogIn />
                <span>Log in</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="Sign up">
            <SidebarMenuButton asChild size="default">
              <button
                onClick={handleSignUpClick}
                data-testid="sidebar-sign-up-button"
                className="text-text-secondary hover:text-text-primary hover:bg-transparent transition-colors"
              >
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
