import {
  TotalMoodTrackingDonut,
  LastThreeMonthsMoodTrackingBar,
  CurrentMonthMoodTrackingDonut,
} from "@/features/stats/components";
import { trackStatsSeoConfig } from "@/seo/config";
import { useSEO } from "@/seo/hooks";
import { useGetTrackStats } from "../hooks";
import { Loading } from "@/components/common/Loading";
import { useToast } from "@/hooks";
import { useNavigate } from "react-router-dom";
import { trackStatsToastMessages } from "../messages";
import { Button } from "@/components/ui/button";

export const StatsPage = (): JSX.Element => {
  useSEO({
    title: trackStatsSeoConfig.title,
    description: trackStatsSeoConfig.description,
  });

  const navigate = useNavigate();
  const { showErrorToast } = useToast();

  const { data: trackStats, isLoading, error } = useGetTrackStats();

  if (error) {
    const errorMessage =
      error.message || trackStatsToastMessages.error.description;

    showErrorToast(trackStatsToastMessages.error.title, errorMessage);

    navigate("/");
  }

  if (isLoading) return <Loading />;

  const hasCurrentMonthData = !!trackStats?.currentMonth?.length;

  return trackStats ? (
    <div
      className="min-h-screen flex flex-col lg-p8"
      data-testid="stats-section"
    >
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-4 bg-gradient-to-b from-background to-secondary/20 gap-12">
        <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-text-primary text-center">
          Distribución mensual del estado de ánimo
        </h1>
        <LastThreeMonthsMoodTrackingBar
          lastThreeMonthsData={trackStats.lastThreeMonths}
        />
        <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-text-primary text-center">
          Resumen del seguimiento del estado de ánimo
        </h1>
        <div className="flex flex-col sm:flex-row w-full max-w-[1000px] gap-12 justify-center items-center">
          <TotalMoodTrackingDonut
            moodTrackingData={trackStats.historyTrackMap}
          />
          {hasCurrentMonthData && (
            <CurrentMonthMoodTrackingDonut
              currentMonthData={trackStats.currentMonth}
            />
          )}
        </div>
      </main>
    </div>
  ) : (
    <div
      className="min-h-screen flex flex-col"
      data-testid="stats-section-without-data"
    >
      <main className="flex-grow flex flex-col items-center justify-center px-4 py-4 bg-gradient-to-b from-background to-secondary/20 gap-12">
        <h1 className="text-5xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-text-primary text-center">
          Actualmente no hay datos
        </h1>
        <Button onClick={() => navigate("/registro")}>
          Registrar estado de ánimo
        </Button>
      </main>
    </div>
  );
};
