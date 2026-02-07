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
    label: "Simpanan",
    color: "#145a3f",
  },
  mobile: {
    label: "Pinjaman",
    color: "#c9a84c",
  },
} satisfies ChartConfig;

const ChartKoperasi = () => {
  return (
    <div className="w-full p-5 bg-white shadow-sm rounded-2xl h-full border border-[#e7e5e0]">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid
            vertical={false}
            strokeDasharray="3 3"
            stroke="#e7e5e0"
          />

          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={12}
            axisLine={false}
            stroke="#a8a29e"
          />
          <ChartTooltip
            cursor={{ fill: "rgba(20, 90, 63, 0.05)" }}
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
            radius={[6, 6, 0, 0]}
            animationDuration={1500}
          />
          <Bar
            dataKey="mobile"
            fill="var(--color-mobile)"
            radius={[6, 6, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default ChartKoperasi;
