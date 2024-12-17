import { MonthlyMoodTracking, MoodTracking } from "../entity";

export interface IMapTrackStatsToMoodTrackingResponse {
  currentMonth: MoodTracking[];
  lastThreeMonths: MonthlyMoodTracking[];
  historyTrackMap: Map<string, MonthlyMoodTracking>;
}

