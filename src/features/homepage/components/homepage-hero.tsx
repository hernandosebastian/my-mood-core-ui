import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useGetMe } from "@/features/authentication/hooks";

export function HomepageHero(): JSX.Element {
  const getMeQuery = useGetMe();
  const isLoggedIn = getMeQuery.data?.user !== undefined;

  return (
    <div className="space-y-6 text-center">
      <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-text-primary color-highlight-selection">
        My Mood
      </h1>
      <p className="text-2xl text-text-secondary max-w-[600px] mx-auto color-highlight-selection">
        A simple tool to track your emotions and discover your mood patterns
        over time.
      </p>
      <div className="flex gap-4 justify-center mt-2">
        {!isLoggedIn && (
          <Button asChild size="lg" className="w-32">
            <Link
              to="/log-in"
              data-testid="homepage-get-started-button"
              draggable={false}
            >
              Get Started
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
