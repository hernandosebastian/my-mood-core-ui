import { Mood } from "@/features/track/enum";

export interface ITrackStats {
  mood: Mood;
  totalTracks: number;
  daysTracked: number;
}

