"use client";
import { Pie, PieChart } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { convertToDataArray, getRGB } from "@/lib/utils";

const chartConfig = {} satisfies ChartConfig;

export function Donut({ data }: { data: Array<Record<string, any>> }) {
  if (!data) {
    return <div>No data available</div>;
  }
  const dataArray = convertToDataArray(data);
  const keys = Object.keys(dataArray[0]);
  const fc = keys[0];
  const sc = keys[1];
  data.forEach((item: any) => {
    item.fill = getRGB();
  });

  return (
    <Card className="flex flex-col bg-gray-900 text-white">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut</CardTitle>
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
            <Pie data={data} dataKey={fc} nameKey={sc} innerRadius={60} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
