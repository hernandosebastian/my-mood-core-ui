import { getMoodColor } from "@/features/track/utils";
import { IMappedMoodTracking, ITrackMonthlyStats } from "../interfaces";

export const mapCurrentMonthMoodTrackingData = (
  tracksLast3MonthsStats: ITrackMonthlyStats[]
): IMappedMoodTracking[] => {
  const currentMonth = new Date().getMonth() + 1;

  const currentMonthStats = tracksLast3MonthsStats.find(
    (monthStats) => monthStats.month === currentMonth
  );

  return currentMonthStats
    ? currentMonthStats.moods.map((stat) => ({
        mood: stat.mood,
        totalDaysTracked: stat.totalTracks,
        fill: getMoodColor(stat.mood),
      }))
    : [];
};
