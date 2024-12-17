import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  ResponsiveContainer,
} from "recharts";
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
import { Mood } from "@/features/track/enum";
import { MonthlyMoodTracking } from "../entity";
import { chartConfiguration } from "../utils";

interface ILastThreeMonthsMoodTrackingBarProps {
  lastThreeMonths: MonthlyMoodTracking[];
}

export function LastThreeMonthsMoodTrackingBar({
  lastThreeMonths,
}: Readonly<ILastThreeMonthsMoodTrackingBarProps>): JSX.Element {
  const chartData = lastThreeMonths.map((monthlyTracking) => {
    const monthLabel = monthlyTracking.month;
    const moodData: Record<Mood, number> = {} as Record<Mood, number>;

    monthlyTracking.moodTrackings.forEach((tracking) => {
      moodData[tracking.mood] = tracking.totalDaysTracked;
    });

    return {
      month: monthLabel,
      ...moodData,
    };
  });

  return (
    <Card className="w-full max-w-[1000px]">
      <CardHeader>
        <CardTitle>Mood Tracking - Last 3 Months</CardTitle>
        <CardDescription>January - March 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfiguration}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
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
              {Object.keys(chartConfiguration).map((moodKey) => {
                const mood = moodKey as keyof typeof chartConfiguration;
                return (
                  <Bar
                    key={mood}
                    dataKey={mood}
                    fill={chartConfiguration[mood].color}
                    radius={5}
                  />
                );
              })}
            </BarChart>
          </ResponsiveContainer>
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

