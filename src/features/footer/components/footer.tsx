import { env } from "@/config/env";
import { GithubSVG } from "./github-svg";

export function Footer(): JSX.Element {
  return (
    <footer className="py-6 px-4 bg-sidebar border-t">
      <div className="max-w-6xl mx-auto text-center text-sm text-gray-600">
        <p>© {new Date().getFullYear()} My Mood. All rights reserved.</p>
        <div className="mt-2 flex items-center justify-center">
          <a
            href={env.githubProfiles.ownerGithubProfile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-gray-600 hover:text-gray-800 fill-gray-600 hover:fill-gray-800 transition-colors"
          >
            <GithubSVG />
            <span>Created by {env.githubProfiles.ownerGithubName}</span>
          </a>
        </div>
      </div>
    </footer>
  );
}

