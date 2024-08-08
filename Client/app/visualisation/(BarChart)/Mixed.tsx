"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


function getDistinctGrayShades(count: number): string[] {
  const step = Math.floor(254 / count); 
  const shades = [];
  for (let i = 0; i < count; i++) {
    const grayValue = Math.min(254, step * i); 
    shades.push(`rgb(${grayValue}, ${grayValue}, ${grayValue})`);
  }
  return shades;
}


function convertToDataArray(input: Array<Record<string, any>>): Array<Record<string, any>> {
  return input.map(item => {
    const keys = Object.keys(item);
    const formattedItem: Record<string, any> = {};
    formattedItem[keys[0]] = item[keys[0]];
    formattedItem[keys[1]] = String(item[keys[1]]);
    return formattedItem;
  });
}

function generateChartConfig(data: Array<Record<string, string>>): ChartConfig {
  if (data.length === 0) return {};

  const keys = Object.keys(data[0]);
  const chartConfig: ChartConfig = {};

  keys.forEach(key => {
    chartConfig[key] = { label: key.charAt(0).toUpperCase() + key.slice(1) };
  });

  return chartConfig;
}

export function Mixed({ Data }: { Data:  Array<Record<string, any>> }) {
  if (Data === undefined) {
    return <div>No data available</div>;
  }
  const data = convertToDataArray(Data);
  const chartConfig = generateChartConfig(data);
 
  const keys = Object.keys(data[0]);
  const fc = keys[0];
  const sc = keys[1];

  const shades = getDistinctGrayShades(data.length);

  data.forEach((item: any, index: number) => {
    item.fill = shades[index % shades.length];
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Mixed</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey={sc}
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label || value
              }
            />
            <XAxis dataKey={sc} type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey={fc} radius={5} fill={({ payload }) => payload.fill} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
