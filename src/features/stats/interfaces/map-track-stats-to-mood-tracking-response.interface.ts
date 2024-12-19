import { IMappedMoodTracking } from "./mapped-mood-tracking.interface";
import { IMonthData } from "./month-data.interface";

export interface IMapTrackStatsToMoodTrackingResponse {
  lastThreeMonths: IMonthData[];
  historyTrackMap: IMappedMoodTracking[];
  currentMonth: IMappedMoodTracking[];
}

