import { SidebarFooter, SidebarRail } from "../ui/sidebar";

export function NavBarFooter(): JSX.Element {
  return (
    <>
      <SidebarFooter className="text-center">
        <small>
          Made with{" "}
          <a
            href="https://github.com/shadcn-ui/ui"
            target="_blank"
            rel="noopener noreferrer"
          >
            shadcn-ui
          </a>
        </small>
      </SidebarFooter>
      <SidebarRail />
    </>
  );
}

