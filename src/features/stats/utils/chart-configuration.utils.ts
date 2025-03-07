import { ChartConfig } from "@/components/ui/chart";
import { Mood } from "@/features/track/enum";
import { getMoodColor } from "@/features/track/utils";

export const chartConfiguration = {
  [Mood.HAPPY]: {
    label: "Feliz",
    color: getMoodColor(Mood.HAPPY),
  },
  [Mood.SAD]: {
    label: "Triste",
    color: getMoodColor(Mood.SAD),
  },
  [Mood.ANGRY]: {
    label: "Enojado",
    color: getMoodColor(Mood.ANGRY),
  },
  [Mood.BORED]: {
    label: "Aburrido",
    color: getMoodColor(Mood.BORED),
  },
  [Mood.EXCITED]: {
    label: "Emocionado",
    color: getMoodColor(Mood.EXCITED),
  },
  [Mood.ANXIOUS]: {
    label: "Ansioso",
    color: getMoodColor(Mood.ANXIOUS),
  },
  [Mood.CALM]: {
    label: "Tranquilo",
    color: getMoodColor(Mood.CALM),
  },
  [Mood.CONFUSED]: {
    label: "Confundido",
    color: getMoodColor(Mood.CONFUSED),
  },
} satisfies ChartConfig;
