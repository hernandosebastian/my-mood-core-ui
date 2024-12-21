import { IMappedMoodTracking } from "../interfaces";

export const getTotalDaysTrackedInData = (
  moodTrackingData: IMappedMoodTracking[]
): number => {
  return moodTrackingData.reduce((acc, curr) => acc + curr.totalDaysTracked, 0);
};

