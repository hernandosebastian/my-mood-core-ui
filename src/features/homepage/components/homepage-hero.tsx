import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HomepageOpenSourceButton } from "./homepage-open-source-button";
import { buttonVariants } from "@/components/ui/buttonVariants";
import { env } from "@/config/env";

export function HomepageHero(): JSX.Element {
  return (
    <div className="space-y-6 text-center">
      <HomepageOpenSourceButton />

      <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-text-primary color-highlight-selection">
        My Mood
      </h1>
      <p className="text-2xl text-text-secondary max-w-[600px] mx-auto color-highlight-selection">
        Track your daily emotions, monitor patterns over time, and gain insights
        into your mood journey.
      </p>
      <div className="flex gap-4 justify-center mt-2">
        <Button asChild size="lg" className="w-32">
          <Link
            to="/log-in"
            data-testid="homepage-get-started-button"
            draggable={false}
          >
            Get Started
          </Link>
        </Button>
        <a
          data-testid="homepage-github-button"
          className={`w-32 ${buttonVariants({
            variant: "secondary",
            size: "lg",
          })}`}
          href={env.githubProfiles.projectRepositoryGithub}
          target="_blank"
          rel="noreferrer"
          draggable={false}
        >
          Github
        </a>
      </div>
    </div>
  );
}
