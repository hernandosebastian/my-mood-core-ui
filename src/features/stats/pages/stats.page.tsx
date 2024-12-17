import {
  TotalMoodTrackingDonut,
  LastThreeMonthsMoodTrackingBar,
  CurrentMonthMoodTrackingDonut,
} from "@/features/stats/components";
import { trackStatsSeoConfig } from "@/seo/config/track-stats-config";
import { useSEO } from "@/seo/hooks";

export const StatsPage = (): JSX.Element => {
  useSEO({
    title: trackStatsSeoConfig.title,
    description: trackStatsSeoConfig.description,
  });

  return (
    <div className="min-h-screen flex flex-col" data-testid="homepage-section">
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-4 bg-gradient-to-b from-background to-secondary/20 gap-12">
        <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 text-center">
          Monthly Mood Distribution
        </h1>
        <LastThreeMonthsMoodTrackingBar />
        <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 text-center">
          Mood Tracking Overview
        </h1>
        <div className="flex flex-col sm:flex-row w-full max-w-[1000px] gap-12 justify-center items-center">
          <TotalMoodTrackingDonut />
          <CurrentMonthMoodTrackingDonut />
        </div>
      </main>
    </div>
  );
};

