import { Link } from "react-router-dom";
import { env } from "@/config/env";

export function AttributionLink(): JSX.Element {
  return (
    <p className="text-sm text-center text-gray-500">
      Avatars provided by{" "}
      <Link
        to={env.githubProfiles.multiavatarGithubProfile}
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-700 hover:underline"
      >
        Multiavatar
      </Link>
    </p>
  );
}

