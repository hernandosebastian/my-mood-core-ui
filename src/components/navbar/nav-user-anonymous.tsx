import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "../ui/sidebar";
import { useSidebar } from "@/hooks";

export function NavUserAnonymous(): JSX.Element {
  const { toggleSidebar } = useSidebar();

  return (
    <DropdownMenu>
      <SidebarMenuButton
        size="lg"
        className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground cursor-pointer"
        onClick={() => toggleSidebar()}
        id="close-sidebar"
      >
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">Welcome Guest</span>
        </div>
      </SidebarMenuButton>
    </DropdownMenu>
  );
}