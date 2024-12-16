import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
import { getMoodColor } from "@/features/track/utils";
import { Mood } from "@/features/track/enum";

const chartData = [
  {
    month: "January",
    Happy: 6,
    Sad: 3,
    Angry: 4,
    Bored: 3,
    Excited: 5,
    Anxious: 4,
    Calm: 4,
    Confused: 2,
  },
  {
    month: "February",
    Happy: 7,
    Sad: 4,
    Angry: 5,
    Bored: 4,
    Excited: 5,
    Anxious: 5,
    Calm: 5,
    Confused: 3,
  },
  {
    month: "March",
    Happy: 6,
    Sad: 4,
    Angry: 6,
    Bored: 5,
    Excited: 6,
    Anxious: 5,
    Calm: 5,
    Confused: 3,
  },
];

const chartConfig = {
  Happy: {
    label: "Happy",
    color: getMoodColor(Mood.HAPPY),
  },
  Sad: {
    label: "Sad",
    color: getMoodColor(Mood.SAD),
  },
  Angry: {
    label: "Angry",
    color: getMoodColor(Mood.ANGRY),
  },
  Bored: {
    label: "Bored",
    color: getMoodColor(Mood.BORED),
  },
  Excited: {
    label: "Excited",
    color: getMoodColor(Mood.EXCITED),
  },
  Anxious: {
    label: "Anxious",
    color: getMoodColor(Mood.ANXIOUS),
  },
  Calm: {
    label: "Calm",
    color: getMoodColor(Mood.CALM),
  },
  Confused: {
    label: "Confused",
    color: getMoodColor(Mood.CONFUSED),
  },
} satisfies ChartConfig;

export function LastThreeMonthsMoodTrackingBar(): JSX.Element {
  return (
    <Card className="w-full max-w-[1000px]">
      <CardHeader>
        <CardTitle>Mood Tracking - Last 3 Months</CardTitle>
        <CardDescription>January - March 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="Happy" fill={getMoodColor(Mood.HAPPY)} radius={5} />
            <Bar dataKey="Sad" fill={getMoodColor(Mood.SAD)} radius={5} />
            <Bar dataKey="Angry" fill={getMoodColor(Mood.ANGRY)} radius={5} />
            <Bar dataKey="Bored" fill={getMoodColor(Mood.BORED)} radius={5} />
            <Bar
              dataKey="Excited"
              fill={getMoodColor(Mood.EXCITED)}
              radius={5}
            />
            <Bar
              dataKey="Anxious"
              fill={getMoodColor(Mood.ANXIOUS)}
              radius={5}
            />
            <Bar dataKey="Calm" fill={getMoodColor(Mood.CALM)} radius={5} />
            <Bar
              dataKey="Confused"
              fill={getMoodColor(Mood.CONFUSED)}
              radius={5}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mood distribution over the last 3 months
        </div>
      </CardFooter>
    </Card>
  );
}

