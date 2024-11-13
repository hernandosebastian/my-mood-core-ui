import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HomepageHero(): JSX.Element {
  return (
    <div className="space-y-6 text-center">
      <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900">
        My Mood
      </h1>
      <p className="text-xl text-gray-600 max-w-[600px] mx-auto">
        Track your daily emotions, monitor patterns over time, and gain insights
        into your mood journey.
      </p>
      <Button asChild size="lg" className="mt-4">
        <Link to="/log-in" id="homepage-get-started-button">
          Get Started
        </Link>
      </Button>
    </div>
  );
}

