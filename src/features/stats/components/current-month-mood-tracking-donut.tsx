import { Pie, PieChart, Label } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { MoodTracking } from "../entity";
import { ViewBox } from "recharts/types/util/types";
import { chartConfiguration } from "../utils";

function renderLabelContent({
  viewBox,
  chartData,
}: {
  viewBox: ViewBox | undefined;
  chartData: { totalDaysTracked: number }[];
}): JSX.Element | null {
  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
    const totalDaysTracked = chartData.reduce(
      (acc, curr) => acc + curr.totalDaysTracked,
      0
    );

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
}

interface ICurrentMonthMoodTrackingDonutProps {
  currentMonth: MoodTracking[];
}

export function CurrentMonthMoodTrackingDonut({
  currentMonth,
}: Readonly<ICurrentMonthMoodTrackingDonutProps>): JSX.Element {
  const chartData = currentMonth.map((tracking) => ({
    mood: tracking.mood,
    totalDaysTracked: tracking.totalDaysTracked,
    fill: tracking.fill,
  }));

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
          config={chartConfiguration}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="totalDaysTracked"
              nameKey="mood"
              label
            >
              <Label
                content={({ viewBox }) =>
                  renderLabelContent({
                    viewBox,
                    chartData,
                  })
                }
              />
            </Pie>
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

