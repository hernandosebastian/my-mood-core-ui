import {
  HomepageHero,
  HomepageVideo,
  HomepageWhyTrackYourMood,
} from "../components";

export function Homepage(): JSX.Element {
  return (
    <div className="min-h-screen flex flex-col" data-testid="homepage-section">
      <main className="flex-grow flex flex-col items-center justify-center space-y-16 px-4 py-16 bg-gradient-to-b from-background to-secondary/20">
        <HomepageHero />
        <HomepageVideo />
      </main>
      <HomepageWhyTrackYourMood />
    </div>
  );
}
