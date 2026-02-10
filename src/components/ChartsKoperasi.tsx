"use client";

import { useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetSimpananChart } from "@/networks/simpanan";
import { formatCurrency } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const BULAN_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const chartConfig = {
  total: {
    label: "Simpanan",
    color: "#145a3f",
  },
} satisfies ChartConfig;

const currentYear = new Date().getFullYear();
const yearOptions = Array.from({ length: 5 }, (_, i) => currentYear - i);

const ChartKoperasi = () => {
  const [tahun, setTahun] = useState(currentYear);
  const { data: rawData = [], isLoading } = useGetSimpananChart(tahun);

  const chartData = useMemo(
    () =>
      rawData.map((item) => ({
        bulan: BULAN_LABELS[item.bulan - 1],
        total: item.total,
      })),
    [rawData],
  );

  return (
    <div className="w-full p-5 bg-white shadow-sm rounded-2xl h-full border border-[#e7e5e0]">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[#1c1917]">
            Simpanan per Bulan
          </h3>
          <p className="text-xs text-[#a8a29e]">
            Total simpanan wajib bulanan
          </p>
        </div>
        <Select
          value={String(tahun)}
          onValueChange={(val) => setTahun(Number(val))}
        >
          <SelectTrigger size="sm" className="w-[80px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {yearOptions.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-[280px]">
          <Loader2 className="w-6 h-6 animate-spin text-[#a8a29e]" />
        </div>
      ) : (
        <ChartContainer config={chartConfig} className="w-full h-[280px]">
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{ top: 10, right: 0, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
              stroke="#e7e5e0"
            />
            <XAxis
              dataKey="bulan"
              tickLine={false}
              tickMargin={12}
              axisLine={false}
              stroke="#a8a29e"
              fontSize={12}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(20, 90, 63, 0.05)" }}
              content={
                <ChartTooltipContent
                  formatter={(value, name, item, index) => (
                    <>
                      <div
                        className="h-2.5 w-2.5 shrink-0 rounded-[2px]"
                        style={{ backgroundColor: "var(--color-total)" }}
                      />
                      <span className="text-muted-foreground">Simpanan</span>
                      <span className="ml-auto font-mono font-medium tabular-nums text-foreground">
                        {formatCurrency(Number(value))}
                      </span>
                    </>
                  )}
                />
              }
            />
            <Bar
              dataKey="total"
              fill="var(--color-total)"
              radius={[6, 6, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ChartContainer>
      )}
    </div>
  );
};

export default ChartKoperasi;
