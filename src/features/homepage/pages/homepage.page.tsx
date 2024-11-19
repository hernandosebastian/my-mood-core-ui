import { Separator } from "@/components/ui/separator";
import {
  HomepageHero,
  HomepageImage,
  HomepageWhyTrackYourMood,
} from "../components";
export function Homepage(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col" data-testid="homepage-section">
      <main className="flex-grow flex flex-col items-center justify-center space-y-12 px-4 py-16 bg-gradient-to-b from-background to-secondary/20">
        <HomepageHero />
        <HomepageImage />
      </main>

      <Separator className="bg-gray-200" />

      <HomepageWhyTrackYourMood />
    </div>
  );
}
