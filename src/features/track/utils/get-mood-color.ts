import { Mood } from "../enum";
import { IMoodColor } from "../interfaces";

const moodColors: IMoodColor[] = [
  { mood: Mood.HAPPY, color: "#ffd663" },
  { mood: Mood.SAD, color: "#d0e7f8" },
  { mood: Mood.ANGRY, color: "#ff804b" },
  { mood: Mood.EXCITED, color: "#ff5340" },
  { mood: Mood.ANXIOUS, color: "#848ab7" },
  { mood: Mood.CALM, color: "#ff79a7" },
  { mood: Mood.CONFUSED, color: "#8dafd7" },
  { mood: Mood.BORED, color: "#0688de" },
];

export const getMoodColor = (mood: Mood): string => {
  const moodColor = moodColors.find((item) => item.mood === mood);
  return moodColor ? moodColor.color : "#ffffff";
};

