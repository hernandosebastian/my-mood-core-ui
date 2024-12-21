import { ITrackMonthlyStats } from "./track-monthly-stats.interface";
import { ITrackStats } from "./track-stats.interface";

export interface IGetTrackStatsResponse {
  totalTrackStats: ITrackStats[];
  tracksLast3MonthsStats: ITrackMonthlyStats[];
}

