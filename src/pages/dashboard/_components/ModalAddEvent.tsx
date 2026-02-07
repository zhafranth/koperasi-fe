import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { useEffect } from "react";
import { useCreateEvent } from "@/networks/event";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays } from "lucide-react";
import { format, parse } from "date-fns";
import { id } from "date-fns/locale";
import { cn } from "@/lib/utils";

const KATEGORI_OPTIONS = [
  { value: "rapat", label: "Rapat" },
  { value: "pelatihan", label: "Pelatihan" },
  { value: "sosial", label: "Sosial" },
  { value: "silaturahmi", label: "Silaturahmi" },
  { value: "olahraga", label: "Olahraga" },
  { value: "pendidikan", label: "Pendidikan" },
  { value: "kesehatan", label: "Kesehatan" },
  { value: "keagamaan", label: "Keagamaan" },
  { value: "musyawarah", label: "Musyawarah" },
  { value: "penggalangan_dana", label: "Penggalangan Dana" },
];

const formSchema = z.object({
  title: z.string().min(1, "Judul event wajib diisi"),
  description: z.string().optional(),
  tanggal: z.string().min(1, "Tanggal wajib diisi"),
  waktu: z.string().optional(),
  location: z.string().optional(),
  kategori: z.string().min(1, "Kategori wajib dipilih"),
});

interface ModalAddEventProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAddEvent = ({ isOpen, onClose }: ModalAddEventProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      tanggal: "",
      waktu: "",
      location: "",
      kategori: "",
    },
  });

  const { mutate: createEvent, isPending } = useCreateEvent();

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createEvent(values, {
      onSuccess: () => {
        form.reset();
        onClose();
      },
    });
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const isValid =
    form.watch("title")?.length > 0 &&
    form.watch("tanggal")?.length > 0 &&
    form.watch("kategori")?.length > 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl border-[#e7e5e0]">
        <DialogHeader>
          <DialogTitle className="text-lg text-[#1c1917]">
            Tambah Event Baru
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    Judul Event
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan judul event"
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
              name="kategori"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    Kategori
                  </FormLabel>
                  <Select
                    value={field.value || undefined}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full rounded-xl border-[#e7e5e0] bg-[#f7f5f0] focus:bg-white focus:border-[#145a3f]">
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {KATEGORI_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    Deskripsi (Opsional)
                  </FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Masukkan deskripsi event"
                      rows={3}
                      className="flex w-full rounded-xl border border-[#e7e5e0] bg-[#f7f5f0] px-3 py-2 text-sm focus:bg-white focus:border-[#145a3f] focus:outline-none focus:ring-1 focus:ring-[#145a3f] transition-colors resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="tanggal"
                render={({ field }) => {
                  const dateValue = field.value
                    ? parse(field.value, "yyyy-MM-dd", new Date())
                    : undefined;
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                        Tanggal
                      </FormLabel>
                      <Popover modal>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <button
                              type="button"
                              className={cn(
                                "flex h-9 w-full items-center gap-2 rounded-xl border border-[#e7e5e0] bg-[#f7f5f0] px-3 text-sm transition-colors hover:bg-white focus:bg-white focus:border-[#145a3f] focus:outline-none focus:ring-1 focus:ring-[#145a3f]/20",
                                !field.value && "text-[#a8a29e]",
                              )}
                            >
                              <CalendarDays className="h-4 w-4 text-[#a8a29e] shrink-0" />
                              {field.value
                                ? format(dateValue!, "d MMM yyyy", {
                                    locale: id,
                                  })
                                : "Pilih tanggal"}
                            </button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={dateValue}
                            onSelect={(date) => {
                              field.onChange(
                                date ? format(date, "yyyy-MM-dd") : "",
                              );
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="waktu"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                      Waktu (Opsional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="09:00 - 12:00 WIB"
                        className="rounded-xl border-[#e7e5e0] bg-[#f7f5f0] focus:bg-white focus:border-[#145a3f]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    Lokasi (Opsional)
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan lokasi event"
                      className="rounded-xl border-[#e7e5e0] bg-[#f7f5f0] focus:bg-white focus:border-[#145a3f]"
                      {...field}
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

export default ModalAddEvent;
