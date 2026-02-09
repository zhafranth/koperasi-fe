import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import InputSelect from "@/components/InputSelect";
import InputNumber from "@/components/InputNumber";
import { useGetAnggota } from "@/networks/anggota";
import { useCreatePenarikan, useGetSaldoPenarikan } from "@/networks/penarikan";
import { formatCurrency } from "@/lib/utils";

const formSchema = z.object({
  id_anggota: z.number({ required_error: "Anggota wajib dipilih" }),
  jumlah: z.number().min(1, "Jumlah harus lebih dari 0"),
  sumber: z.enum(["simpanan", "sukarela", "infaq", "liburan"], {
    required_error: "Sumber wajib dipilih",
  }),
  keterangan: z.string().optional(),
});

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const SUMBER_OPTIONS = [
  { value: "simpanan", label: "Simpanan" },
  { value: "sukarela", label: "Simpanan Sukarela" },
  { value: "infaq", label: "Infaq" },
  { value: "liburan", label: "Tabungan Liburan" },
];

const ModalAddPenarikan: React.FC<Props> = ({ isOpen, onClose }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { data: anggotaList = [] } = useGetAnggota();
  const { mutate: createPenarikan, isPending } = useCreatePenarikan();

  const idAnggota = form.watch("id_anggota");
  const sumber = form.watch("sumber");

  const { data: saldoData } = useGetSaldoPenarikan(
    idAnggota,
    sumber,
    { enabled: !!idAnggota && !!sumber }
  );

  const anggotaOptions = anggotaList.map((a) => ({
    value: a.id,
    label: a.nama,
  }));

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    createPenarikan(values, {
      onSuccess: () => {
        form.reset();
        onClose();
      },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl border-[#e7e5e0]">
        <DialogHeader>
          <DialogTitle className="text-lg text-[#1c1917]">
            Tambah Penarikan
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="sumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sumber Dana</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-xl border-[#e7e5e0]">
                        <SelectValue placeholder="Pilih sumber" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {SUMBER_OPTIONS.map((opt) => (
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
              name="id_anggota"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Anggota</FormLabel>
                  <FormControl>
                    <InputSelect
                      options={anggotaOptions}
                      value={field.value}
                      onChange={(v) => field.onChange(v as number)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {saldoData && (
              <div className="rounded-xl bg-[#f7f5f0] border border-[#e7e5e0] px-4 py-3">
                <p className="text-xs text-[#78716c]">Saldo tersedia</p>
                <p className="text-sm font-bold text-[#1c1917]">
                  {formatCurrency(saldoData.saldo)}
                </p>
              </div>
            )}

            <FormField
              control={form.control}
              name="jumlah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah</FormLabel>
                  <FormControl>
                    <InputNumber
                      thousandSeparator
                      value={field.value}
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
                  <FormLabel>Keterangan (Opsional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan keterangan"
                      value={field.value || ""}
                      onChange={field.onChange}
                      className="rounded-xl border-[#e7e5e0]"
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
                onClick={onClose}
                className="rounded-xl border-[#e7e5e0] text-[#78716c] hover:bg-[#f5f0e8] hover:text-[#1c1917]"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isPending}
                className="bg-gradient-to-r from-[#0d3b2c] to-[#145a3f] hover:from-[#145a3f] hover:to-[#1a6b50] text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                {isPending ? "Memproses..." : "Tarik"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddPenarikan;
