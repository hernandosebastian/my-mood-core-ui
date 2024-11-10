import { SidebarFooter, SidebarRail } from "../ui/sidebar";

export function NavBarFooter(): JSX.Element {
  return (
    <>
      <SidebarFooter className="text-center">
        <small>
          Made with <a href="https://github.com/shadcn-ui/ui">shadcn-ui</a>
        </small>
      </SidebarFooter>
      <SidebarRail />
    </>
  );
}

