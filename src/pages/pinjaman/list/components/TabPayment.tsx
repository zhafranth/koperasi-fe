import type { PinjamanAggregatedDetail } from "@/api/pinjaman/pinjaman.interface";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import InputNumber from "@/components/InputNumber";
import { useDistributedCicilan } from "@/networks/cicilan";
import { formatCurrency } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  data?: PinjamanAggregatedDetail;
  changeContent: (content: "detail" | "payment") => void;
}

const TabPayment: React.FC<Props> = ({ changeContent, data }) => {
  const { id_anggota, total_sisa = 0 } = data ?? {};
  const { mutate, isPending } = useDistributedCicilan(id_anggota);

  const formSchema = z.object({
    jumlah: z
      .number({ message: "Jumlah is required" })
      .min(1, "Jumlah is required")
      .max(total_sisa, `Maksimal ${formatCurrency(total_sisa)}`),
    keterangan: z.string().min(1, "Keterangan is required"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!id_anggota) return;
    mutate(
      {
        id_anggota,
        jumlah: values.jumlah,
        keterangan: values.keterangan,
      },
      {
        onSuccess: () => {
          form.reset();
          changeContent("detail");
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="rounded-md border bg-amber-50 p-3 text-sm">
          <p className="text-amber-900">
            Total sisa pinjaman:{" "}
            <span className="font-semibold">{formatCurrency(total_sisa)}</span>
          </p>
          <p className="mt-1 text-xs text-amber-700">
            Pembayaran akan otomatis dialokasikan ke pinjaman terlama (FIFO).
          </p>
        </div>

        <FormField
          control={form.control}
          name="jumlah"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah</FormLabel>
              <FormControl>
                <InputNumber
                  thousandSeparator
                  placeholder="Masukkan jumlah"
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
              <FormLabel>Keterangan</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan Keterangan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => changeContent("detail")}
            className="hover:bg-gray-100 transition-colors duration-200"
          >
            Batal
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-gradient-to-r bg-blue-600 hover:bg-blue-500 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            Simpan
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TabPayment;
