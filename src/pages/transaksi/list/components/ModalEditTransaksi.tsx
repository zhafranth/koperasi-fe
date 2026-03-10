import Modal from "@/components/Modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputNumber from "@/components/InputNumber";
import { Input } from "@/components/ui/input";
import { useUpdateTransaksi } from "@/networks/transaksi";
import type { TransaksiProps } from "@/api/transaksi/transaksi.interface";
import { useEffect } from "react";

const formSchema = z.object({
  jumlah: z.number().min(1, "Jumlah harus lebih dari 0"),
  keterangan: z.string().optional(),
});

const ModalEditTransaksi = ({
  data,
  onClose,
}: {
  data: TransaksiProps;
  onClose: () => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jumlah: Math.abs(data.jumlah),
      keterangan: data.keterangan || "",
    },
  });

  const { mutate: updateTransaksi, isPending } = useUpdateTransaksi();

  useEffect(() => {
    form.reset({
      jumlah: Math.abs(data.jumlah),
      keterangan: data.keterangan || "",
    });
  }, [data, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateTransaksi(
      {
        id: data.id,
        data: {
          jumlah: values.jumlah,
          keterangan: values.keterangan || undefined,
        },
      },
      {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      },
    );
  };

  return (
    <Modal
      isOpen
      loading={isPending}
      onClose={() => {
        form.reset();
        onClose();
      }}
      title="Edit Transaksi"
      onSubmit={() => form.handleSubmit(onSubmit)()}
      submitText="Update"
    >
      <Form {...form}>
        <div className="space-y-4">
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
                <FormLabel>Keterangan</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan keterangan"
                    value={field.value || ""}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </Modal>
  );
};

export default ModalEditTransaksi;
