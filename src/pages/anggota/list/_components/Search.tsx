import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);

    // Debounce the search params update
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
        className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl border-2 border-gray-200
                focus:border-blue-500 focus-visible:none focus:ring-2 focus:ring-blue-200 focus:outline-none
                transition-all duration-300 ease-in-out
                hover:border-blue-400 hover:shadow-md
                text-gray-700 text-lg placeholder:text-gray-400"
        onChange={handleChange}
      />
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <SearchIcon className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors duration-300 animate-pulse" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-100/20 via-purple-100/20 to-pink-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="absolute inset-0 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl" />
    </div>
  );
};

export default Search;
