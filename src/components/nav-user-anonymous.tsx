import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "./ui/sidebar";

export function NavUserAnonymous(): JSX.Element {
  return (
    <DropdownMenu>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
      >
        <Avatar className="h-8 w-8 rounded-lg">
          <AvatarImage src={"user.avatar"} alt="My Mood logo" />
          <AvatarFallback className="rounded-lg">MM</AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">My Mood</span>
          <span className="truncate text-xs">Monitor your daily mood</span>
        </div>
      </SidebarMenuButton>
    </DropdownMenu>
  );
}

