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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { getMoodColor } from "@/features/track/utils";
import { Mood } from "@/features/track/enum";
import {
  chartConfiguration,
  getFormattedDateRange,
  getMoodsInData,
} from "../utils";
import { IMonthData } from "../interfaces";

export function LastThreeMonthsMoodTrackingBar({
  lastThreeMonthsData,
}: Readonly<{
  lastThreeMonthsData: IMonthData[];
}>): JSX.Element {
  const hasActivity = lastThreeMonthsData.some((month) =>
    Object.values(month).some((value) => typeof value === "number" && value > 0)
  );

  const moodsToDisplay = getMoodsInData(lastThreeMonthsData);
  const dateRange = getFormattedDateRange(lastThreeMonthsData);

  return (
    <Card className="w-full max-w-[1000px] bg-background-secondary border-border-primary">
      <CardHeader>
        <CardTitle className="text-text-primary">
          Mood Tracking - Last 3 Months
        </CardTitle>
        {hasActivity && (
          <CardDescription
            data-testid="last-three-months-date-range"
            className="text-text-secondary"
          >
            {dateRange}
          </CardDescription>
        )}
      </CardHeader>
      {hasActivity && (
        <CardContent data-testid="last-three-months-mood-tracking-bar">
          <ChartContainer config={chartConfiguration}>
            <BarChart accessibilityLayer data={lastThreeMonthsData}>
              <CartesianGrid
                vertical={false}
                className="stroke-text-secondary"
              />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="dashed"
                    className="bg-background-secondary border-border-primary text-text-primary"
                  />
                }
              />
              {moodsToDisplay.map((mood) => (
                <Bar
                  key={mood}
                  dataKey={mood}
                  fill={getMoodColor(mood as Mood)}
                  radius={5}
                />
              ))}
            </BarChart>
          </ChartContainer>
        </CardContent>
      )}
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {hasActivity ? (
          <div
            className="leading-none text-muted-foreground"
            data-testid="last-three-months-mood-distribution"
          >
            <p className="text-text-secondary">
              Mood distribution over the last 3 months
            </p>
          </div>
        ) : (
          <div
            className="leading-none text-muted-foreground"
            data-testid="last-three-months-mood-no-activity"
          >
            <p className="text-text-secondary">
              No activity over the last 3 months
            </p>
            <p className="text-text-secondary">Start tracking your moods</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
