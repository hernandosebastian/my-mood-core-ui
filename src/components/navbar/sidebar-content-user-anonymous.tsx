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
            <SidebarMenuButton
              asChild
              size="lg"
              className="flex gap-3 text-text-secondary hover:text-text-primary hover:bg-transparent transition-colors"
            >
              <button
                onClick={handleLoginClick}
                data-testid="sidebar-log-in-button"
                className="bg-background-secondary border-border-primary border hover:bg-background-primary transition-colors"
              >
                <LogIn className="h-5 w-5" />
                <span className="text-base">Log in</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="Sign up">
            <SidebarMenuButton
              asChild
              size="lg"
              className="flex gap-3 text-text-secondary hover:text-text-primary hover:bg-transparent transition-colors"
            >
              <button
                onClick={handleSignUpClick}
                data-testid="sidebar-sign-up-button"
                className="bg-background-secondary border-border-primary border hover:bg-background-primary transition-colors"
              >
                <UserPlus className="h-5 w-5" />
                <span className="text-base">Sign up</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
