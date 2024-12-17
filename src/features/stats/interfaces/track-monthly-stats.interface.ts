import { Mood } from "@/features/track/enum";

export interface ITrackMonthlyStats {
  month: number;
  year: number;
  mood: Mood;
  totalTracks: number;
}

