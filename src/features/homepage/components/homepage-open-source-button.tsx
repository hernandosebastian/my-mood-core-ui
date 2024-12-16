import { buttonVariants } from "@/components/ui/buttonVariants";
import { env } from "@/config/env";

export const HomepageOpenSourceButton = (): JSX.Element => {
  return (
    <a
      className={`rounded-3xl ${buttonVariants({ variant: "secondary" })}`}
      href={env.githubProfiles.projectRepositoryGithub}
      target="_blank"
      rel="noreferrer"
    >
      Free and Open Source
    </a>
  );
};

