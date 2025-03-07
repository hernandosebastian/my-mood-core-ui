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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ViewBox } from "recharts/types/util/types";
import { IMappedMoodTracking } from "../interfaces";
import { chartConfiguration, getTotalDaysTrackedInData } from "../utils";

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
        className="fill-text-secondary"
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

export function TotalMoodTrackingDonut({
  moodTrackingData,
}: Readonly<{
  moodTrackingData: IMappedMoodTracking[];
}>): JSX.Element {
  const totalDaysTracked = getTotalDaysTrackedInData(moodTrackingData);

  return (
    <Card className="flex flex-col w-full max-w-80 bg-background-secondary border-border-primary">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-text-primary">
          Historial de seguimiento del estado de ánimo
        </CardTitle>
        <CardDescription className="text-text-secondary">
          Todos los estados de ánimo rastreados a lo largo del historial de tu
          cuenta
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfiguration}
          className="mx-auto aspect-square max-h-[250px] "
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  hideLabel
                  className="bg-background-primary border-border-primary text-text-primary"
                />
              }
            />
            <Pie
              data={moodTrackingData}
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
        <div className="leading-none text-text-secondary">
          Total de días rastreados en todos los estados de ánimo en el historial
          de tu cuenta
        </div>
      </CardFooter>
    </Card>
  );
}
