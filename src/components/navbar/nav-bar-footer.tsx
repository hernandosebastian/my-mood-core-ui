import { env } from "@/config/env";
import { SidebarFooter } from "../ui/sidebar";
import { ShadcnUiSVG } from "./shadcn-ui-svg";

export function NavBarFooter(): JSX.Element {
  return (
    <SidebarFooter className="text-center border-t border-border-primary">
      <a
        href={env.githubProfiles.shadcnGithubProfile}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-text-secondary hover:text-text-primary inline-flex items-center space-x-1 fill-text-secondary hover:fill-accent-primary transition-colors justify-center"
      >
        <ShadcnUiSVG className="w-4 h-4 mr-2" />
        Creado con <span>shadcn/ui</span>
      </a>
    </SidebarFooter>
  );
}
