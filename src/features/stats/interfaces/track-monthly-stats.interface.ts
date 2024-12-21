import { ITrackStats } from "./track-stats.interface";

export interface ITrackMonthlyStats {
  month: number;
  year: number;
  moods: ITrackStats[];
}

