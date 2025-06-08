import { Badge } from "./ui/badge";

interface ChipProps {
  value: string;
  options: {
    key: string;
    label: string;
  }[];
}

const Chips: React.FC<ChipProps> = ({ options, value }) => {
  const { label } = options?.find((option) => option.key === value) || {};
  return (
    <Badge className="bg-blue-100 text-blue-500 rounded-full">{label}</Badge>
  );
};

export default Chips;
