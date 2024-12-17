import { MoodTracking } from "./mood-tracking.entity";

export class MonthlyMoodTracking {
  month: string;
  year: number;
  moodTrackings: MoodTracking[];

  constructor(month: string, year: number, moodTrackings: MoodTracking[]) {
    this.month = month;
    this.year = year;
    this.moodTrackings = moodTrackings;
  }
}
