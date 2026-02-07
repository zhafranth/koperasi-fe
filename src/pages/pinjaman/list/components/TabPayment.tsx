import type { PinjamanDetailProps } from "@/api/pinjaman/pinjaman.interface";
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
import { useCicilan } from "@/networks/cicilan";
import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  data?: PinjamanDetailProps;
  changeContent: (content: "detail" | "payment") => void;
}

const formSchema = z.object({
  jumlah: z.number().min(1, "Jumlah is required"),
  keterangan: z.string().min(1, "Keterangan is required"),
});

const TabPayment: React.FC<Props> = ({ changeContent, data }) => {
  const { id_pinjaman: id } = data ?? {};
  const { mutate } = useCicilan(id);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      mutate(
        {
          id_pinjaman: id,
          jumlah: values.jumlah,
          keterangan: values.keterangan,
          tanggal: new Date().toLocaleString("sv-SE").replace("T", " "),
        },
        {
          onSuccess: () => {
            form.reset();
            changeContent("detail");
          },
        },
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            // disabled={!isValid}
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
