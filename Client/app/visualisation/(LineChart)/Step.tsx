"use client"

import { TrendingUp } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

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
import { any } from "zod"




const chartConfig = {
  desktop: {
    label:"ssfsf",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

export function Step({Data}:{Data:Record<string, string>}) {

  const data = Array.isArray(Data) ? Data : [];
console.log("DataStep", data);

  if (data.length > 0) {
    const keys = Object.keys(data[0]);
    if (keys.length > 1) {
      chartConfig.desktop.label = keys[1]; 
    }
  }
  
  const mappedData = data.map((item: Record<string, string>) => {
    const keys = Object.keys(item);
    return {
      [keys[0]]: item[keys[0]], 
      desktop: item[keys[1]]
    };
  });



  return (
    <Card className="bg-gray-900 text-white">
      <CardHeader>
        <CardTitle>Line Chart - Step</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={mappedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.toString().slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="desktop"
              type="step"
              stroke="#7987A1"
              strokeWidth={4}
              dot={true}
            />
          </LineChart>
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
  )
}
