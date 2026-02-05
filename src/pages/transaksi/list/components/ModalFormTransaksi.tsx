import Modal from "@/components/Modal";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MonthYearRange from "@/components/MonthYearRange";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import InputSelect from "@/components/InputSelect";
import { useGetAnggota } from "@/networks/anggota";
import InputNumber from "@/components/InputNumber";
import InputRadioGroup from "@/components/InputRadioGroup";
import { useCreateSimpanan } from "@/networks/simpanan";
import { useCreatePinjaman } from "@/networks/pinjaman";
import { Input } from "@/components/ui/input";

const formSchema = z
  .object({
    id_anggota: z.number({
      required_error: "Anggota wajib dipilih",
    }),
    jumlah: z.number().min(1, "Jumlah harus lebih dari 0"),
    type: z.union([z.literal(1), z.literal(2), z.literal(3)], {
      invalid_type_error: "Type tidak valid",
      required_error: "Type wajib dipilih",
    }),
    tanggal: z
      .object({
        start: z
          .object({
            month: z.number(),
            year: z.number(),
          })
          .nullable()
          .optional(),
        end: z
          .object({
            month: z.number(),
            year: z.number(),
          })
          .nullable()
          .optional(),
      })
      .optional(),
    keterangan: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (val.type === 1) {
      const start = val.tanggal?.start ?? null;
      const end = val.tanggal?.end ?? null;
      if (!start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["tanggal", "start"],
          message: "Tanggal mulai wajib dipilih",
        });
      }
      if (!end) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["tanggal", "end"],
          message: "Tanggal akhir wajib dipilih",
        });
      }
    }
  });

const ModalFormTransaksi = ({ onClose }: { onClose: () => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { mutate: createSimpanan, isPending: isPendingSimpanan } = useCreateSimpanan();
  const { mutate: createPinjaman, isPending: isPendingPinjaman } = useCreatePinjaman();

  const isPending = isPendingSimpanan || isPendingPinjaman;
  const typeValue = form.watch("type");

  const { data: anggotaList = [] } = useGetAnggota();

  const anggotaOptions = anggotaList.map((anggota) => ({
    value: anggota.id,
    label: anggota.nama,
  }));

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const { tanggal, type, id_anggota, jumlah, keterangan } = values;

    const onSuccessCallback = {
      onSuccess: () => {
        form.reset();
        onClose();
      },
    };

    if (type === 1) {
      const { start: startDate, end: endDate } = tanggal ?? {};
      const payload = {
        start: startDate
          ? new Date(startDate.year, startDate.month - 1, 1).toISOString()
          : null,
        end: endDate
          ? new Date(endDate.year, endDate.month - 1, 1).toISOString()
          : null,
        id_anggota,
        jumlah,
      };
      createSimpanan(payload, onSuccessCallback);
    } else if (type === 3) {
      const payload = {
        id_anggota,
        jumlah,
        keterangan,
      };
      createPinjaman(payload, onSuccessCallback);
    }
  };

  return (
    <Modal
      isOpen
      loading={isPending}
      onClose={() => {
        form.reset();
        onClose();
      }}
      title="Tambah Transaksi Simpan"
      onSubmit={() => form.handleSubmit(onSubmit)()}
    >
      <Form {...form}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="id_anggota"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Anggota</FormLabel>
                <FormControl>
                  <InputSelect
                    options={anggotaOptions || []}
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
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Type</FormLabel>
                <FormControl>
                  <InputRadioGroup
                    direction="horizontal"
                    value={field.value}
                    onChange={(v) => field.onChange(v as number)}
                    options={[
                      { value: 1, label: "Simpanan" },
                      { value: 2, label: "Cicilan" },
                      { value: 3, label: "Pinjaman" },
                    ]}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {typeValue === 1 && (
            <FormField
              control={form.control}
              name="tanggal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tanggal</FormLabel>
                  <FormControl>
                    <MonthYearRange
                      value={field.value}
                      onChange={(v) => field.onChange(v)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {typeValue === 3 && (
            <FormField
              control={form.control}
              name="keterangan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keterangan (Opsional)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan keterangan pinjaman"
                      value={field.value || ""}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </Form>
    </Modal>
  );
};

export default ModalFormTransaksi;
