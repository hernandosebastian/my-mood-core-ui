import { ChartConfig } from "@/components/ui/chart";
import { Mood } from "@/features/track/enum";
import { getMoodColor } from "@/features/track/utils";

export const chartConfiguration = {
  [Mood.HAPPY]: {
    label: "Happy",
    color: getMoodColor(Mood.HAPPY),
  },
  [Mood.SAD]: {
    label: "Sad",
    color: getMoodColor(Mood.SAD),
  },
  [Mood.ANGRY]: {
    label: "Angry",
    color: getMoodColor(Mood.ANGRY),
  },
  [Mood.BORED]: {
    label: "Bored",
    color: getMoodColor(Mood.BORED),
  },
  [Mood.EXCITED]: {
    label: "Excited",
    color: getMoodColor(Mood.EXCITED),
  },
  [Mood.ANXIOUS]: {
    label: "Anxious",
    color: getMoodColor(Mood.ANXIOUS),
  },
  [Mood.CALM]: {
    label: "Calm",
    color: getMoodColor(Mood.CALM),
  },
  [Mood.CONFUSED]: {
    label: "Confused",
    color: getMoodColor(Mood.CONFUSED),
  },
} satisfies ChartConfig;

