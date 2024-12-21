import { IMappedMoodTracking } from "./mapped-mood-tracking.interface";

export interface IMappedMonthlyMoodTracking {
  month: string;
  year: number;
  moods: IMappedMoodTracking[];
}

