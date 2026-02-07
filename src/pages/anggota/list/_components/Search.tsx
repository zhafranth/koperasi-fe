import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    const debouncedValue = setTimeout(() => {
      const value = e.target.value;
      const newParams = new URLSearchParams(searchParams);
      if (value === "") {
        newParams.delete("nama");
        setSearchParams(newParams);
        return;
      } else {
        newParams.set("nama", value);
      }
      setSearchParams(newParams);
    }, 1500);

    return () => clearTimeout(debouncedValue);
  };

  const nama = searchParams.get("nama");

  useEffect(() => {
    if (nama) {
      setValue(nama);
    }
  }, [nama]);
  return (
    <div className="relative group">
      <Input
        value={value}
        type="text"
        placeholder="Cari anggota berdasarkan nama..."
        className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-[#e7e5e0]
                focus:border-[#145a3f] focus-visible:ring-0 focus:ring-0 focus:outline-none
                transition-all duration-300 ease-in-out
                hover:border-[#145a3f]/50 hover:shadow-md
                text-[#1c1917] text-sm placeholder:text-[#a8a29e]
                shadow-sm"
        onChange={handleChange}
      />
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <SearchIcon className="h-4 w-4 text-[#a8a29e] group-hover:text-[#145a3f] transition-colors duration-300" />
      </div>
    </div>
  );
};

export default Search;
