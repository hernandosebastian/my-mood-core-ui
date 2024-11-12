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
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem key="Log in">
            <SidebarMenuButton asChild size="default">
              <button onClick={handleLoginClick} id="sidebar-login-button">
                <LogIn />
                <span>Log in</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="Sign up">
            <SidebarMenuButton asChild size="default">
              <button onClick={handleSignUpClick} id="sidebar-sign-up-button">
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
