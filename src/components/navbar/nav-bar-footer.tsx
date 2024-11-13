import { env } from "@/config/env";
import { SidebarFooter, SidebarRail } from "../ui/sidebar";

export function NavBarFooter(): JSX.Element {
  return (
    <>
      <SidebarFooter className="text-center">
        <small>
          Made with{" "}
          <a
            href={env.githubProfiles.shadcnGithubProfile}
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

