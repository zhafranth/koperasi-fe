import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface Option {
  value: string | number | null | undefined;
  label: string;
}

interface Props {
  options: Option[];
  onChange: (value: string | number | null | undefined) => void;
  value: string | number | null | undefined;
  placeholder?: string;
  inputPlaceholder?: string;
  className?: string;
}

const InputSelect: React.FC<Props> = ({
  options = [],
  onChange,
  value,
  inputPlaceholder = "Cari...",
  className,
}) => {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filteredOptions = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [options, query]);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={cn("relative ", className)}>
      <Input
        ref={inputRef}
        value={query}
        placeholder={inputPlaceholder}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
      />
      {open && (
        <div
          role="listbox"
          className={cn(
            "bg-popover text-popover-foreground data-[state=open]:animate-in absolute left-0 top-full z-50 mt-2 w-full max-h-56 min-w-[8rem] overflow-x-hidden overflow-y-auto rounded-md border shadow-md",
          )}
        >
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => {
              const selected = option.value === value;
              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={selected}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onChange(option.value);
                    setOpen(false);
                    setQuery(option.label);
                  }}
                  className={cn(
                    "focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm",
                    selected ? "bg-accent text-accent-foreground" : "",
                  )}
                >
                  <span className="absolute right-2 flex size-3.5 items-center justify-center">
                    {selected ? <CheckIcon className="size-4" /> : null}
                  </span>
                  <span>{option.label}</span>
                </div>
              );
            })
          ) : (
            <div className="px-3 py-2 text-sm text-muted-foreground">
              Tidak ada pilihan
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InputSelect;
