import React from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { cn } from "@/lib/utils";
import { parse, parseISO, isValid, format } from "date-fns";
import { id as localeID } from "date-fns/locale";
import { ChevronLeft, ChevronRight, MoveRight } from "lucide-react";

type MonthYear = { month: number; year: number };

type RangeValue = {
  start?: Date | string | MonthYear | null;
  end?: Date | string | MonthYear | null;
};

type Props = {
  value?: RangeValue;
  onChange?: (value: {
    start: MonthYear | null;
    end: MonthYear | null;
  }) => void;
  minYear?: number;
  maxYear?: number;
  className?: string;
  disabled?: boolean;
};

function toMonthYear(input: unknown): MonthYear | null {
  if (!input) return null;
  if (typeof input === "object" && input !== null) {
    const obj = input as Partial<MonthYear>;
    if (
      typeof obj.month === "number" &&
      typeof obj.year === "number" &&
      obj.month >= 1 &&
      obj.month <= 12
    ) {
      return { month: obj.month, year: obj.year };
    }
  }
  if (input instanceof Date) {
    return { month: input.getMonth() + 1, year: input.getFullYear() };
  }
  if (typeof input === "string") {
    const s = input.trim();
    let d: Date | null = null;
    const candidates = [
      () => parseISO(s),
      () => parse(s, "yyyy-MM-dd", new Date()),
      () => parse(s, "dd/MM/yyyy", new Date()),
      () => parse(s, "MM/dd/yyyy", new Date()),
      () => parse(s, "dd-MM-yyyy", new Date()),
      () => parse(s, "MM-yyyy", new Date()),
      () => parse(s, "MM/yyyy", new Date()),
      () => parse(s, "LLL yyyy", new Date(), { locale: localeID }),
      () => parse(s, "LLLL yyyy", new Date(), { locale: localeID }),
      () => new Date(s),
    ];
    for (const get of candidates) {
      try {
        const parsed = get();
        if (parsed && isValid(parsed)) {
          d = parsed;
          break;
        }
      } catch {
        void 0;
      }
    }
    if (d && isValid(d)) {
      return { month: d.getMonth() + 1, year: d.getFullYear() };
    }
    const yearMatch = s.match(/(?:^|[^0-9])(\d{4})(?:[^0-9]|$)/);
    const monthMatch = s.match(/(?:^|[^0-9])(\d{1,2})(?:[^0-9]|$)/);
    const year = yearMatch ? Number(yearMatch[1]) : NaN;
    const month = monthMatch ? Number(monthMatch[1]) : NaN;
    if (year && month && month >= 1 && month <= 12) {
      return { month, year };
    }
  }
  return null;
}

function compareMY(a: MonthYear, b: MonthYear) {
  if (a.year !== b.year) return a.year - b.year;
  return a.month - b.month;
}

const MonthYearRange: React.FC<Props> = ({
  value,
  onChange,
  minYear,
  maxYear,
  className,
  disabled,
}) => {
  const currentYear = new Date().getFullYear();
  const years = React.useMemo(() => {
    const min = Math.max(1900, minYear ?? currentYear - 50);
    const max = Math.min(3000, maxYear ?? currentYear + 20);
    const arr: number[] = [];
    for (let y = min; y <= max; y++) arr.push(y);
    return arr;
  }, [minYear, maxYear, currentYear]);

  const months = React.useMemo(
    () =>
      Array.from({ length: 12 }, (_, i) => ({
        value: i + 1,
        label: format(new Date(2000, i, 1), "LLL"),
      })),
    [],
  );

  const [start, setStart] = React.useState<MonthYear | null>(
    toMonthYear(value?.start ?? null),
  );
  const [end, setEnd] = React.useState<MonthYear | null>(
    toMonthYear(value?.end ?? null),
  );
  const [error, setError] = React.useState<string | null>(null);
  const [open, setOpen] = React.useState(false);
  const [startYearView, setStartYearView] = React.useState<number>(
    start?.year ?? currentYear,
  );
  const [endYearView, setEndYearView] = React.useState<number>(
    end?.year ?? currentYear,
  );

  React.useEffect(() => {
    const nextStart = toMonthYear(value?.start ?? null);
    const nextEnd = toMonthYear(value?.end ?? null);
    setStart(nextStart);
    setEnd(nextEnd);
  }, [value?.start, value?.end]);

  const emit = React.useCallback(
    (s: MonthYear | null, e: MonthYear | null) => {
      onChange?.({ start: s, end: e });
    },
    [onChange],
  );

  const updateStart = (next: MonthYear) => {
    if (end && compareMY(next, end) > 0) {
      setError("Start tidak boleh lebih besar dari End");
      return;
    }
    setError(null);
    setStart(next);
    emit(next, end);
  };
  const updateEnd = (next: MonthYear) => {
    if (start && compareMY(next, start) < 0) {
      setError("End tidak boleh lebih kecil dari Start");
      return;
    }
    setError(null);
    setEnd(next);
    emit(start, next);
  };

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Popover
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
        }}
        modal
      >
        <PopoverTrigger asChild>
          <div
            role="button"
            aria-label="month-year-range"
            tabIndex={0}
            className={cn(
              "w-full h-10 px-3 flex gap-x-4 items-center justify-between rounded-md border bg-background text-sm cursor-pointer",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <span className="flex-1">
              {start
                ? `${format(new Date(start.year, start.month - 1, 1), "LLL")} ${start.year}`
                : "Start"}
            </span>
            <MoveRight size={16} />
            <span className="flex-1">
              {end
                ? `${format(new Date(end.year, end.month - 1, 1), "LLL")} ${end.year}`
                : "End"}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[680px]">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase">
                  Start Date
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="p-1 rounded border"
                    onClick={() =>
                      setStartYearView((y) => Math.max(years[0], y - 1))
                    }
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <div className="text-sm font-medium w-16 text-center">
                    {startYearView}
                  </div>
                  <button
                    className="p-1 rounded border"
                    onClick={() =>
                      setStartYearView((y) =>
                        Math.min(years[years.length - 1], y + 1),
                      )
                    }
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {months.map((m) => {
                  const active =
                    start?.month === m.value && start?.year === startYearView;
                  return (
                    <Button
                      key={`start-${m.value}`}
                      variant={active ? "default" : "outline"}
                      className={cn("w-full")}
                      onClick={() =>
                        updateStart({ month: m.value, year: startYearView })
                      }
                    >
                      {m.label}
                    </Button>
                  );
                })}
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold uppercase">End Date</div>
                <div className="flex items-center gap-2">
                  <button
                    className="p-1 rounded border"
                    disabled={!start}
                    onClick={() =>
                      setEndYearView((y) => Math.max(years[0], y - 1))
                    }
                  >
                    <ChevronLeft className="size-4" />
                  </button>
                  <div className="text-sm font-medium w-16 text-center">
                    {endYearView}
                  </div>
                  <button
                    className="p-1 rounded border"
                    disabled={!start}
                    onClick={() =>
                      setEndYearView((y) =>
                        Math.min(years[years.length - 1], y + 1),
                      )
                    }
                  >
                    <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {months.map((m) => {
                  const active =
                    end?.month === m.value && end?.year === endYearView;
                  return (
                    <Button
                      key={`end-${m.value}`}
                      variant={active ? "default" : "outline"}
                      className={cn("w-full")}
                      disabled={!start}
                      onClick={() =>
                        updateEnd({ month: m.value, year: endYearView })
                      }
                    >
                      {m.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs">
            {start && end ? (
              <span className="inline-flex items-center gap-1">
                Selected:{" "}
                {format(
                  new Date(start.year, (start.month ?? 1) - 1, 1),
                  "LLLL yyyy",
                )}{" "}
                -{" "}
                {format(
                  new Date(end.year, (end.month ?? 1) - 1, 1),
                  "LLLL yyyy",
                )}
              </span>
            ) : (
              <span>
                Selected: -
                {!start
                  ? " (pilih Start terlebih dahulu untuk memilih End)"
                  : ""}
              </span>
            )}
          </div>
          {error && (
            <div className="mt-2 text-sm text-destructive">{error}</div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default MonthYearRange;
