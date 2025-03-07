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
    <Card
      className="flex flex-col w-full max-w-80 bg-background-secondary border-border-primary"
      data-testid="current-month-mood-tracking-donut"
    >
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-text-primary">
          Seguimiento del estado de ánimo - Este mes
        </CardTitle>
        <CardDescription className="text-text-secondary">
          Estados de ánimo rastreados durante el mes actual
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfiguration}
          className="mx-auto aspect-square max-h-[250px] pb-0 [&_.recharts-pie-label-text]:fill-foreground"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  hideLabel
                  className="bg-background-primary border-border-primary text-text-primary"
                />
              }
            />
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
        <div className="leading-none text-text-secondary">
          Total de estados de ánimo rastreados durante el mes actual
        </div>
      </CardFooter>
    </Card>
  );
}
