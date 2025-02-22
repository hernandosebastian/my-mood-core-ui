import { Button } from "../ui/button";
import { SidebarTrigger } from "../ui/sidebar";
import { HomeIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
export function AppHeader(): JSX.Element {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-6 border-b bg-background-primary px-4 border-border-primary">
      <SidebarTrigger
        className="-ml-1 text-text-secondary hover:text-text-primary transition-colors"
        data-testid="toggle-sidebar-trigger"
      />
      <Button
        variant="ghost"
        size="icon"
        className="-7 w-7 text-text-secondary hover:text-text-primary transition-colors"
        onClick={() => navigate("/")}
      >
        <HomeIcon />
        <span className="sr-only">Home</span>
      </Button>
    </header>
  );
}
