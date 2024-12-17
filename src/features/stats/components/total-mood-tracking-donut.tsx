import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

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
import { ViewBox } from "recharts/types/util/types";

const chartData = [
  { mood: Mood.HAPPY, totalDaysTracked: 31, fill: getMoodColor(Mood.HAPPY) },
  { mood: Mood.SAD, totalDaysTracked: 24, fill: getMoodColor(Mood.SAD) },
  { mood: Mood.ANGRY, totalDaysTracked: 18, fill: getMoodColor(Mood.ANGRY) },
  { mood: Mood.BORED, totalDaysTracked: 15, fill: getMoodColor(Mood.BORED) },
  {
    mood: Mood.EXCITED,
    totalDaysTracked: 30,
    fill: getMoodColor(Mood.EXCITED),
  },
  {
    mood: Mood.ANXIOUS,
    totalDaysTracked: 22,
    fill: getMoodColor(Mood.ANXIOUS),
  },
  { mood: Mood.CALM, totalDaysTracked: 26, fill: getMoodColor(Mood.CALM) },
  {
    mood: Mood.CONFUSED,
    totalDaysTracked: 13,
    fill: getMoodColor(Mood.CONFUSED),
  },
];

const chartConfig = {
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

interface IRenderLabelContentProps {
  viewBox: ViewBox | undefined;
  totalDaysTracked: number;
}

const renderLabelContent = ({
  viewBox,
  totalDaysTracked,
}: IRenderLabelContentProps): JSX.Element | null => {
  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
    return (
      <text
        x={viewBox.cx}
        y={viewBox.cy}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        <tspan
          x={viewBox.cx}
          y={viewBox.cy}
          className="fill-foreground text-3xl font-bold"
        >
          {totalDaysTracked.toLocaleString()}
        </tspan>
      </text>
    );
  }
  return null;
};

export function TotalMoodTrackingDonut(): JSX.Element {
  const totalDaysTracked = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.totalDaysTracked, 0);
  }, []);

  return (
    <Card className="flex flex-col w-full max-w-80">
      <CardHeader className="items-center pb-0">
        <CardTitle>Mood Tracking History</CardTitle>
        <CardDescription>
          All moods tracked across your account&apos;s history
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="totalDaysTracked"
              nameKey="mood"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) =>
                  renderLabelContent({ viewBox, totalDaysTracked })
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Total days tracked across all moods in your account&apos;s history
        </div>
      </CardFooter>
    </Card>
  );
}

