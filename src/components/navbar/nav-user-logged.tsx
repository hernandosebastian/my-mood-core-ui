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

interface NavUserLoggedProps {
  user: User;
}

export function NavUserLogged({
  user,
}: Readonly<NavUserLoggedProps>): JSX.Element {
  const logout = useLogOut();

  const handleLogout = (): void => {
    logout();
  };

  const renderAvatar = (): JSX.Element => (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage
          src={
            "https://i.pinimg.com/736x/77/88/7e/77887e10a46a811c26ffcacec6fd4259.jpg"
          }
          alt={"Avatar from user"}
        />
        <AvatarFallback className="rounded-lg">CN</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{user.username}</span>
      </div>
    </>
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
          id="sidebar-user-menu-trigger"
        >
          {renderAvatar()}
          <ChevronsUpDown className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side="right"
        align="start"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            {renderAvatar()}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <BadgeCheck />
          Account
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={handleLogout}
          id="sidebar-logout-menu-item"
        >
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
