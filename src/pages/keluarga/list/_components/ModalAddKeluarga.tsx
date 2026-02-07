import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useEffect, useState, useRef, useMemo } from "react";
import { cn } from "@/lib/utils";
import { X, Search, CheckIcon } from "lucide-react";
import { useGetAnggota } from "@/networks/anggota";
import { useCreateKeluarga } from "@/networks/keluarga";

const formSchema = z.object({
  nama: z.string().min(1, "Nama keluarga harus diisi"),
  anggota_ids: z.array(z.number()).min(1, "Pilih minimal 1 anggota"),
});

interface ModalAddKeluargaProps {
  isOpen: boolean;
  onClose: () => void;
}

const MultiSelect = ({
  options,
  value,
  onChange,
}: {
  options: { value: number; label: string }[];
  value: number[];
  onChange: (value: number[]) => void;
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter((opt) => opt.label.toLowerCase().includes(q));
  }, [options, query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggle = (id: number) => {
    if (value.includes(id)) {
      onChange(value.filter((v) => v !== id));
    } else {
      onChange([...value, id]);
    }
  };

  const remove = (id: number) => {
    onChange(value.filter((v) => v !== id));
  };

  const selectedLabels = options.filter((o) => value.includes(o.value));

  return (
    <div ref={containerRef} className="relative">
      {/* Selected pills */}
      {selectedLabels.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {selectedLabels.map((item) => (
            <span
              key={item.value}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#145a3f]/10 text-[#145a3f] text-xs font-medium"
            >
              {item.label}
              <button
                type="button"
                onClick={() => remove(item.value)}
                className="hover:bg-[#145a3f]/10 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Search input */}
      <div className="relative">
        <Input
          value={query}
          placeholder="Cari anggota..."
          className="rounded-xl border-[#e7e5e0] bg-[#f7f5f0] focus:bg-white focus:border-[#145a3f] pl-9"
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#a8a29e]" />
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full max-h-48 overflow-y-auto rounded-xl border border-[#e7e5e0] bg-white shadow-lg">
          {filtered.length > 0 ? (
            filtered.map((option) => {
              const selected = value.includes(option.value);
              return (
                <div
                  key={option.value}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    toggle(option.value);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2.5 cursor-pointer text-sm transition-colors",
                    selected
                      ? "bg-[#145a3f]/5 text-[#145a3f]"
                      : "hover:bg-[#f7f5f0] text-[#1c1917]"
                  )}
                >
                  <div
                    className={cn(
                      "w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors",
                      selected
                        ? "bg-[#145a3f] border-[#145a3f]"
                        : "border-[#e7e5e0]"
                    )}
                  >
                    {selected && <CheckIcon className="w-3 h-3 text-white" />}
                  </div>
                  <span className="font-medium">{option.label}</span>
                </div>
              );
            })
          ) : (
            <div className="px-3 py-3 text-sm text-[#a8a29e] text-center">
              Tidak ada pilihan
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const ModalAddKeluarga = ({ isOpen, onClose }: ModalAddKeluargaProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      anggota_ids: [],
    },
  });

  const { data: anggotaList = [] } = useGetAnggota();
  const { mutate: createKeluarga, isPending } = useCreateKeluarga();

  const anggotaOptions = anggotaList
    .filter((a) => !a.id_keluarga)
    .map((a) => ({
      value: a.id,
      label: a.nama,
    }));

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createKeluarga(
      {
        nama_kepala_keluarga: values.nama,
        list_id_anggota: values.anggota_ids,
      },
      {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      }
    );
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isValid =
    form.watch("nama")?.length > 0 &&
    form.watch("anggota_ids")?.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl border-[#e7e5e0]">
        <DialogHeader>
          <DialogTitle className="text-lg text-[#1c1917]">
            Tambah Keluarga Baru
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    Nama Keluarga
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan nama keluarga"
                      className="rounded-xl border-[#e7e5e0] bg-[#f7f5f0] focus:bg-white focus:border-[#145a3f]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="anggota_ids"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    Anggota Keluarga
                  </FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={anggotaOptions}
                      value={field.value}
                      onChange={(v) => field.onChange(v)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="rounded-xl border-[#e7e5e0] text-[#78716c] hover:bg-[#f5f0e8] hover:text-[#1c1917]"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={!isValid || isPending}
                className="bg-gradient-to-r from-[#0d3b2c] to-[#145a3f] hover:from-[#145a3f] hover:to-[#1a6b50] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                {isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddKeluarga;
