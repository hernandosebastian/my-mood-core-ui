import { Mood } from "@/features/track/enum";
import { getMoodColor } from "@/features/track/utils";
export class MoodTracking {
  mood: Mood;
  totalDaysTracked: number;
  totalTracks: number;
  fill: string;

  constructor(mood: Mood, totalDaysTracked: number, totalTracks: number) {
    this.mood = mood;
    this.totalDaysTracked = totalDaysTracked;
    this.totalTracks = totalTracks;
    this.fill = getMoodColor(mood);
  }
}
