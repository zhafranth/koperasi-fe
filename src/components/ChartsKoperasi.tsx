"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
} satisfies ChartConfig;

const ChartKoperasi = () => {
  return (
    <div className="w-4/6 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg rounded-xl h-full border border-blue-100">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#e5e7eb"
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={12}
            axisLine={false}
            stroke="#6b7280"
          />
          <ChartTooltip
            cursor={{ fill: "rgba(147, 197, 253, 0.1)" }}
            content={<ChartTooltipContent />}
          />
          <ChartLegend
            content={<ChartLegendContent />}
            verticalAlign="top"
            align="right"
          />
          <Bar
            dataKey="desktop"
            fill="var(--color-desktop)"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
          <Bar
            dataKey="mobile"
            fill="var(--color-mobile)"
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ChartKoperasi;
