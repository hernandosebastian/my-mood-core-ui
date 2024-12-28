import { SidebarTrigger } from "../ui/sidebar";

export function AppHeader(): JSX.Element {
  return (
    <header className="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background-primary px-4 border-border-primary">
      <SidebarTrigger
        className="-ml-1 text-text-secondary hover:text-text-primary bg-inherit hover:bg-inherit"
        data-testid="toggle-sidebar-trigger"
      />
    </header>
  );
}
