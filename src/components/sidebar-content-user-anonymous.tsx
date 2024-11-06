import { LogIn, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

export function SidebarContentUserAnonymous(): JSX.Element {
  const navigate = useNavigate();

  const handleLoginClick = (): void => {
    navigate("/login");
  };

  const handleSignUpClick = (): void => {
    navigate("/signup");
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem key="Log in">
            <SidebarMenuButton asChild size="default">
              <button onClick={handleLoginClick}>
                <LogIn />
                <span>Log in</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem key="Sign up">
            <SidebarMenuButton asChild size="default">
              <button onClick={handleSignUpClick}>
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
