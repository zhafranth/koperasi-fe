import { Badge } from "./ui/badge";

interface ChipOption {
  key: string;
  label: string;
  color?: string;
}

interface ChipProps {
  value: string;
  options: ChipOption[];
}

const COLOR_MAP: Record<string, string> = {
  green: "bg-emerald-100 text-emerald-700",
  orange: "bg-amber-100 text-amber-700",
  violet: "bg-violet-100 text-violet-700",
  cyan: "bg-cyan-100 text-cyan-700",
  teal: "bg-teal-100 text-teal-700",
  red: "bg-red-100 text-red-700",
  gray: "bg-gray-100 text-gray-700",
};

const Chips: React.FC<ChipProps> = ({ options, value }) => {
  const option = options?.find((o) => o.key === value);
  const colorClass = COLOR_MAP[option?.color || ""] || "bg-blue-100 text-blue-500";

  return (
    <Badge className={`${colorClass} rounded-full`}>
      {option?.label || value}
    </Badge>
  );
};

export default Chips;
