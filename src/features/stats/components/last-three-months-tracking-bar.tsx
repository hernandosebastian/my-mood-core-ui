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
  const moodsToDisplay = getMoodsInData(lastThreeMonthsData);
  const dateRange = getFormattedDateRange(lastThreeMonthsData);

  return (
    <Card className="w-full max-w-[1000px]">
      <CardHeader>
        <CardTitle>Mood Tracking - Last 3 Months</CardTitle>
        <CardDescription data-testid="last-three-months-date-range">
          {dateRange}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfiguration}>
          <BarChart accessibilityLayer data={lastThreeMonthsData}>
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Mood distribution over the last 3 months
        </div>
      </CardFooter>
    </Card>
  );
}
