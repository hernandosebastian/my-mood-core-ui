import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { SidebarMenuButton } from "../ui/sidebar";
import { useNavigate } from "react-router-dom";

export function NavUserAnonymous(): JSX.Element {
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <SidebarMenuButton
        size="lg"
        className="text-text-secondary hover:text-text-primary transition-colors"
        onClick={() => navigate("/")}
      >
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">My Mood</span>
        </div>
      </SidebarMenuButton>
    </DropdownMenu>
  );
}
