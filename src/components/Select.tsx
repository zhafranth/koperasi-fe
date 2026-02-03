import {
  Select as SelectUI,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface Props {
  options: {
    value: string | number;
    label: string;
  }[];
  onChange: (value: string) => void;
  value: string | number;
  placeholder?: string;
}

const Select: React.FC<Props> = ({
  options = [],
  onChange,
  value,
  placeholder,
}) => {
  return (
    <SelectUI onValueChange={onChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={placeholder || "Select"} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectUI>
  );
};

export default Select;
