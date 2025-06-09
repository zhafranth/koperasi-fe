import { useSearchParams } from "react-router-dom";
import Select from "./Select";

interface Props {
  queryKey: string;
  label: string;
  options: { value: string; label: string }[];
  className?: string;
}

const Filter: React.FC<Props> = ({ queryKey, options, label, className }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = searchParams.get(queryKey) || "";

  const handleChange = (e: string) => {
    const newParams = new URLSearchParams(searchParams);

    newParams.set(queryKey, e);
    setSearchParams(newParams);
  };

  return (
    <div className={className}>
      <p className="text-sm font-semibold mb-1">{label}</p>
      <Select onChange={handleChange} options={options} value={value} />
    </div>
  );
};

export default Filter;
