import { Mood } from "../enum";

const moodTranslations = {
  Happy: "Feliz",
  Sad: "Triste",
  Angry: "Enojado",
  Excited: "Emocionado",
  Anxious: "Ansioso",
  Calm: "Calmado",
  Confused: "Confundido",
  Bored: "Aburrido",
} as const;

export function translateMood(englishMood: Mood): string {
  return moodTranslations[englishMood] || englishMood;
}
