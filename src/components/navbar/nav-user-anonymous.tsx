import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "../ui/sidebar";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "@/hooks";
export function NavUserAnonymous(): JSX.Element {
  const navigate = useNavigate();
  const { closeSidebarIfMobile } = useSidebar();

  const handleNavigate = (path: string): void => {
    closeSidebarIfMobile();
    navigate(path);
  };

  return (
    <DropdownMenu>
      <SidebarMenuButton
        size="lg"
        className="text-text-secondary hover:text-text-primary transition-colors"
        onClick={() => handleNavigate("/")}
      >
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">My Mood</span>
        </div>
      </SidebarMenuButton>
    </DropdownMenu>
  );
}
