import { getMoodColor } from "@/features/track/utils";
import { IMappedMoodTracking, ITrackStats } from "../interfaces";

export const mapTotalMoodTrackingData = (
  totalTrackStats: ITrackStats[]
): IMappedMoodTracking[] => {
  return totalTrackStats.map((stat) => ({
    mood: stat.mood,
    totalDaysTracked: Number(stat.totalTracks),
    fill: getMoodColor(stat.mood),
  }));
};
