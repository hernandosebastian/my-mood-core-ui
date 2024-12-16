import { Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Mood } from "@/features/track/enum";
import { getMoodColor } from "@/features/track/utils";

const chartData = [
  { mood: Mood.HAPPY, totalDaysTracked: 6, fill: getMoodColor(Mood.HAPPY) },
  { mood: Mood.SAD, totalDaysTracked: 4, fill: getMoodColor(Mood.SAD) },
  { mood: Mood.ANGRY, totalDaysTracked: 3, fill: getMoodColor(Mood.ANGRY) },
  { mood: Mood.BORED, totalDaysTracked: 2, fill: getMoodColor(Mood.BORED) },
  { mood: Mood.EXCITED, totalDaysTracked: 5, fill: getMoodColor(Mood.EXCITED) },
  { mood: Mood.ANXIOUS, totalDaysTracked: 3, fill: getMoodColor(Mood.ANXIOUS) },
  { mood: Mood.CALM, totalDaysTracked: 4, fill: getMoodColor(Mood.CALM) },
  {
    mood: Mood.CONFUSED,
    totalDaysTracked: 3,
    fill: getMoodColor(Mood.CONFUSED),
  },
];

const chartConfig = {
  [Mood.HAPPY]: {
    label: "Happy",
    color: "black",
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

export function CurrentMonthMoodTrackingDonut(): JSX.Element {
  return (
    <Card className="flex flex-col w-full max-w-80">
      <CardHeader className="items-center pb-0">
        <CardTitle>Mood Tracking - This Month</CardTitle>
        <CardDescription>
          Moods tracked throughout the current month
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="totalDaysTracked"
              nameKey="mood"
              label
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Total moods tracked during the current month
        </div>
      </CardFooter>
    </Card>
  );
}

