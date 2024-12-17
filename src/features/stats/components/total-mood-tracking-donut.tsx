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
import { getMoodColor } from "@/features/track/utils";
import { ViewBox } from "recharts/types/util/types";
import { MonthlyMoodTracking } from "../entity";

const renderLabelContent = ({
  viewBox,
  totalDaysTracked,
}: {
  viewBox: ViewBox | undefined;
  totalDaysTracked: number;
}): JSX.Element | null => {
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

interface TotalMoodTrackingDonutProps {
  historyTrackMap: Map<string, MonthlyMoodTracking>;
}

export function TotalMoodTrackingDonut({
  historyTrackMap,
}: Readonly<TotalMoodTrackingDonutProps>): JSX.Element {
  const chartData = Array.from(historyTrackMap.values()).flatMap(
    (monthlyMoodTracking) =>
      monthlyMoodTracking.moodTrackings.map((moodTracking) => ({
        mood: moodTracking.mood,
        totalDaysTracked: moodTracking.totalDaysTracked,
        fill: moodTracking.fill,
      }))
  );

  const chartConfig: ChartConfig = {};
  chartData.forEach((data) => {
    if (!chartConfig[data.mood]) {
      chartConfig[data.mood] = {
        label: data.mood,
        color: getMoodColor(data.mood),
      };
    }
  });

  const totalDaysTracked = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.totalDaysTracked, 0);
  }, [chartData]);

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

