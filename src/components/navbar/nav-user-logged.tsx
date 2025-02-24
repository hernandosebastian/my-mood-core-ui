import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "../ui/sidebar";
import { User } from "@/features/authentication/entity";
import { useLogOut } from "@/features/authentication/hooks/use-log-out";
import { useSidebar } from "@/hooks";
import { useNavigate } from "react-router-dom";

interface NavUserLoggedProps {
  user: User;
}

export function NavUserLogged({
  user,
}: Readonly<NavUserLoggedProps>): JSX.Element {
  const navigate = useNavigate();
  const logout = useLogOut();
  const { isMobile, closeSidebarIfMobile } = useSidebar();

  const handleNavigate = (path: string): void => {
    closeSidebarIfMobile();
    navigate(path);
  };

  const handleLogout = (): void => {
    closeSidebarIfMobile();
    navigate("/");
    logout();
  };

  const renderAvatar = (): JSX.Element => (
    <>
      <Avatar className="h-8 w-8 rounded-lg ">
        <AvatarImage src={user.avatarSrc} alt={"Avatar from user"} />
        <AvatarFallback className="rounded-lg bg-text-primary text-text-secondary">
          MM
        </AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span
          className="truncate font-semibold text-text-primary"
          id="sidebar-username"
        >
          {user.username}
        </span>
        <span
          className="truncate text-muted-foreground text-text-primary"
          id="sidebar-nickname"
        >
          {user.nickname}
        </span>
      </div>
    </>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-background-secondary data-[state=open]:text-text-primary text-text-secondary"
          data-testid="sidebar-open-menu-button"
        >
          {renderAvatar()}
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg bg-background-secondary border-border-primary"
        side={isMobile ? "bottom" : "right"}
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            {renderAvatar()}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-border-primary" />
        <DropdownMenuItem
          onClick={() => handleNavigate("/edit-profile")}
          className="cursor-pointer text-text-secondary hover:text-text-primary transition-colors"
          data-testid="sidebar-edit-profile-menu-item"
        >
          <BadgeCheck />
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-border-primary" />
        <DropdownMenuItem
          className="cursor-pointer text-text-secondary hover:text-text-primary transition-colors"
          onClick={handleLogout}
          id="sidebar-logout-menu-item"
          data-testid="sidebar-logout-menu-item"
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
