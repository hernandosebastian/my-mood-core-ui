import { env } from "@/config/env";
import { GithubSVG } from "./github-svg";

export function Footer(): JSX.Element {
  return (
    <footer className="py-6 px-4 bg-background-primary border-t border-border-primary">
      <div className="max-w-6xl mx-auto text-center text-sm text-text-primary">
        <p>© {new Date().getFullYear()} My Mood. All rights reserved.</p>
        <div className="mt-2 flex items-center justify-center">
          <a
            href={env.githubProfiles.ownerGithubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-text-secondary hover:text-accent-primary fill-text-secondary hover:fill-accent-primary transition-colors gap-1"
          >
            <GithubSVG />
            <span>Created by {env.githubProfiles.ownerGithubName}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
