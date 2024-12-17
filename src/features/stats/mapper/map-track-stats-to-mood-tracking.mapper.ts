import { MonthlyMoodTracking, MoodTracking } from "../entity";
import {
  IGetTrackStatsResponse,
  IMapTrackStatsToMoodTrackingResponse,
} from "../interfaces";

export const mapTrackStatsToMoodTracking = (
  data: IGetTrackStatsResponse
): IMapTrackStatsToMoodTrackingResponse => {
  const historyTrackMap = new Map<string, MonthlyMoodTracking>();

  const lastThreeMonthsMoodTracking = data.tracksLast3MonthsStats.map(
    (monthlyStat) => {
      const monthYearKey = `${monthlyStat.year}-${monthlyStat.month}`;
      const moodTracking = new MoodTracking(
        monthlyStat.mood,
        monthlyStat.totalTracks,
        monthlyStat.totalTracks
      );

      if (historyTrackMap.has(monthYearKey)) {
        const existingMonthlyTracking = historyTrackMap.get(monthYearKey);
        existingMonthlyTracking?.moodTrackings.push(moodTracking);
      } else {
        historyTrackMap.set(
          monthYearKey,
          new MonthlyMoodTracking(
            new Date(monthlyStat.year, monthlyStat.month - 1).toLocaleString(
              "default",
              { month: "long" }
            ),
            monthlyStat.year,
            [moodTracking]
          )
        );
      }

      return new MonthlyMoodTracking(
        new Date(monthlyStat.year, monthlyStat.month - 1).toLocaleString(
          "default",
          { month: "long" }
        ),
        monthlyStat.year,
        [moodTracking]
      );
    }
  );

  const currentMonthStats = data.totalTrackStats.map((trackStat) => {
    return new MoodTracking(
      trackStat.mood,
      trackStat.daysTracked,
      trackStat.totalTracks
    );
  });

  return {
    currentMonth: currentMonthStats,
    lastThreeMonths: lastThreeMonthsMoodTracking,
    historyTrackMap,
  };
};

