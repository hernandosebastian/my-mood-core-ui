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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IMappedMoodTracking } from "../interfaces";
import { chartConfiguration } from "../utils";

export function CurrentMonthMoodTrackingDonut({
  currentMonthData,
}: Readonly<{
  currentMonthData: IMappedMoodTracking[];
}>): JSX.Element {
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
              data={currentMonthData}
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
