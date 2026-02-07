import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const Search = ({ value, onChange }: Props) => {
  return (
    <div className="relative group">
      <Input
        value={value}
        type="text"
        placeholder="Cari keluarga berdasarkan nama..."
        className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-[#e7e5e0]
                focus:border-[#145a3f] focus-visible:ring-0 focus:ring-0 focus:outline-none
                transition-all duration-300 ease-in-out
                hover:border-[#145a3f]/50 hover:shadow-md
                text-[#1c1917] text-sm placeholder:text-[#a8a29e]
                shadow-sm"
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <SearchIcon className="h-4 w-4 text-[#a8a29e] group-hover:text-[#145a3f] transition-colors duration-300" />
      </div>
    </div>
  );
};

export default Search;
