import { Separator } from "@radix-ui/react-separator";
import { SidebarTrigger } from "../ui/sidebar";

export function AppHeader(): JSX.Element {
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background-primary px-4">
      <SidebarTrigger className="-ml-1" data-testid="toggle-sidebar-trigger" />
      <Separator orientation="vertical" className="mr-2 h-4" />
    </header>
  );
}
