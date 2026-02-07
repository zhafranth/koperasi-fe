import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import InputNumber from "@/components/InputNumber";
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
import { useCreatePinjaman } from "@/networks/pinjaman";
import { useGetAnggota } from "@/networks/anggota";

const formSchema = z.object({
  id_anggota: z.number({ required_error: "Anggota wajib dipilih" }),
  jumlah: z.number({ required_error: "Jumlah wajib diisi" }).min(1, "Jumlah harus lebih dari 0"),
  keterangan: z.string().optional(),
});

interface ModalAddPinjamanProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAddPinjaman = ({ isOpen, onClose }: ModalAddPinjamanProps) => {
  const { mutate: createPinjaman, isPending } = useCreatePinjaman();
  const { data: anggotaList = [] } = useGetAnggota();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id_anggota: undefined,
      jumlah: undefined,
      keterangan: "",
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createPinjaman(values, {
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
    form.watch("id_anggota") !== undefined &&
    form.watch("jumlah") !== undefined &&
    form.watch("jumlah") > 0;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] rounded-2xl border-[#e7e5e0]">
        <DialogHeader>
          <DialogTitle className="text-lg text-[#1c1917]">
            Tambah Pinjaman Baru
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="id_anggota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    Anggota
                  </FormLabel>
                  <Select
                    value={field.value ? String(field.value) : undefined}
                    onValueChange={(v) => field.onChange(Number(v))}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full rounded-xl border-[#e7e5e0] bg-[#f7f5f0] focus:bg-white focus:border-[#145a3f]">
                        <SelectValue placeholder="Pilih anggota" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {anggotaList.map((anggota) => (
                        <SelectItem
                          key={anggota.id}
                          value={String(anggota.id)}
                        >
                          {anggota.nama}
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
              name="jumlah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    Jumlah Pinjaman
                  </FormLabel>
                  <FormControl>
                    <InputNumber
                      thousandSeparator
                      placeholder="Masukkan jumlah pinjaman"
                      className="rounded-xl border-[#e7e5e0] bg-[#f7f5f0] focus:bg-white focus:border-[#145a3f]"
                      value={field.value ?? ""}
                      onChange={(v) => field.onChange(v as number)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keterangan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    Keterangan (Opsional)
                  </FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Masukkan keterangan pinjaman"
                      rows={3}
                      className="flex w-full rounded-xl border border-[#e7e5e0] bg-[#f7f5f0] px-3 py-2 text-sm focus:bg-white focus:border-[#145a3f] focus:outline-none focus:ring-1 focus:ring-[#145a3f] transition-colors resize-none"
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

export default ModalAddPinjaman;
