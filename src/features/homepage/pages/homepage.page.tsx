import { Separator } from "@/components/ui/separator";
import {
  HomepageHero,
  HomepageVideo,
  HomepageWhyTrackYourMood,
} from "../components";

export function Homepage(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col" data-testid="homepage-section">
      <main className="flex-grow flex flex-col items-center justify-center space-y-16 px-4 py-16">
        <HomepageHero />
        <HomepageVideo />
      </main>
      <Separator
        orientation="vertical"
        className="w-full h-[1px] bg-border-primary my-8"
      />
      <HomepageWhyTrackYourMood />
    </div>
  );
}
