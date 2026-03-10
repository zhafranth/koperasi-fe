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
import { useCreateSimpanan } from "@/networks/simpanan";
import { useCreateInfaq } from "@/networks/infaq";
import { useCreateSimpananSukarela } from "@/networks/simpanan-sukarela";
import { useCreateTabunganLiburan } from "@/networks/tabungan-liburan";
import { Input } from "@/components/ui/input";

const TYPE_OPTIONS = [
  {
    value: 1 as const,
    label: "Simpanan",
    sub: "Wajib",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
        <path
          fillRule="evenodd"
          d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
          clipRule="evenodd"
        />
      </svg>
    ),
    idle: "border-emerald-200 bg-emerald-50/60 text-emerald-700 hover:border-emerald-400 hover:bg-emerald-100",
    active: "border-emerald-600 bg-emerald-600 text-white shadow-emerald-200 shadow-md",
    ring: "ring-emerald-500",
    dot: "bg-emerald-500",
  },
  {
    value: 4 as const,
    label: "Infaq",
    sub: "Amal",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path
          fillRule="evenodd"
          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
          clipRule="evenodd"
        />
      </svg>
    ),
    idle: "border-teal-200 bg-teal-50/60 text-teal-700 hover:border-teal-400 hover:bg-teal-100",
    active: "border-teal-600 bg-teal-600 text-white shadow-teal-200 shadow-md",
    ring: "ring-teal-500",
    dot: "bg-teal-500",
  },
  {
    value: 5 as const,
    label: "Sukarela",
    sub: "Opsional",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ),
    idle: "border-violet-200 bg-violet-50/60 text-violet-700 hover:border-violet-400 hover:bg-violet-100",
    active: "border-violet-600 bg-violet-600 text-white shadow-violet-200 shadow-md",
    ring: "ring-violet-500",
    dot: "bg-violet-500",
  },
  {
    value: 6 as const,
    label: "Liburan",
    sub: "Tabungan",
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path
          fillRule="evenodd"
          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
          clipRule="evenodd"
        />
      </svg>
    ),
    idle: "border-cyan-200 bg-cyan-50/60 text-cyan-700 hover:border-cyan-400 hover:bg-cyan-100",
    active: "border-cyan-600 bg-cyan-600 text-white shadow-cyan-200 shadow-md",
    ring: "ring-cyan-500",
    dot: "bg-cyan-500",
  },
];

const formSchema = z
  .object({
    type: z.union(
      [z.literal(1), z.literal(4), z.literal(5), z.literal(6)],
      {
        invalid_type_error: "Type tidak valid",
        required_error: "Type wajib dipilih",
      }
    ),
    jumlah: z.number().min(1, "Jumlah harus lebih dari 0"),
    id_anggota: z.number().optional(),
    tanggal: z
      .object({
        start: z
          .object({ month: z.number(), year: z.number() })
          .nullable()
          .optional(),
        end: z
          .object({ month: z.number(), year: z.number() })
          .nullable()
          .optional(),
      })
      .optional(),
    keterangan: z.string().optional(),
  })
  .superRefine((val, ctx) => {
    if (!val.id_anggota) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["id_anggota"],
        message: "Anggota wajib dipilih",
      });
    }
    if (val.type === 1) {
      if (!val.tanggal?.start) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["tanggal", "start"],
          message: "Tanggal mulai wajib dipilih",
        });
      }
      if (!val.tanggal?.end) {
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

  const { mutate: createSimpanan, isPending: isPendingSimpanan } =
    useCreateSimpanan();
  const { mutate: createInfaq, isPending: isPendingInfaq } = useCreateInfaq();
  const { mutate: createSukarela, isPending: isPendingSukarela } =
    useCreateSimpananSukarela();
  const { mutate: createLiburan, isPending: isPendingLiburan } =
    useCreateTabunganLiburan();

  const isPending =
    isPendingSimpanan || isPendingInfaq || isPendingSukarela || isPendingLiburan;

  const typeValue = form.watch("type");
  const { data: anggotaResult } = useGetAnggota({ limit: 9999 });
  const anggotaList = anggotaResult?.data ?? [];

  const anggotaOptions = anggotaList.map((anggota) => ({
    value: anggota.id,
    label: anggota.nama,
  }));

  const needsKeterangan = [4, 5, 6].includes(typeValue);

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
      createSimpanan(
        {
          start: startDate
            ? new Date(startDate.year, startDate.month - 1, 1).toISOString()
            : null,
          end: endDate
            ? new Date(endDate.year, endDate.month - 1, 1).toISOString()
            : null,
          id_anggota: id_anggota!,
          jumlah,
        },
        onSuccessCallback
      );
    } else if (type === 4) {
      createInfaq(
        { id_anggota: id_anggota!, jumlah, jenis: "masuk", keterangan },
        onSuccessCallback
      );
    } else if (type === 5) {
      createSukarela(
        { id_anggota: id_anggota!, jumlah, keterangan },
        onSuccessCallback
      );
    } else if (type === 6) {
      createLiburan(
        { id_anggota: id_anggota!, jumlah, keterangan },
        onSuccessCallback
      );
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
      title="Tambah Transaksi"
      onSubmit={() => form.handleSubmit(onSubmit)()}
    >
      <Form {...form}>
        <div className="space-y-4">
          {/* Type Chips */}
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs font-semibold uppercase tracking-widest text-stone-500">
                  Jenis Transaksi
                </FormLabel>
                <FormControl>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {TYPE_OPTIONS.map((opt) => {
                      const isActive = field.value === opt.value;
                      return (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => field.onChange(opt.value)}
                          className={[
                            "relative flex items-center gap-3 rounded-xl border-2 px-3 py-2.5 text-left transition-all duration-200 cursor-pointer",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1",
                            isActive ? opt.active : opt.idle,
                            `focus-visible:${opt.ring}`,
                          ].join(" ")}
                        >
                          <span
                            className={[
                              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors duration-200",
                              isActive
                                ? "bg-white/20"
                                : "bg-white/80",
                            ].join(" ")}
                          >
                            {opt.icon}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-semibold leading-tight">
                              {opt.label}
                            </span>
                            <span
                              className={[
                                "block text-xs leading-tight",
                                isActive ? "text-white/75" : "opacity-60",
                              ].join(" ")}
                            >
                              {opt.sub}
                            </span>
                          </span>
                          {isActive && (
                            <span className="absolute right-2.5 top-2.5 flex h-2 w-2 rounded-full bg-white/80" />
                          )}
                        </button>
                      );
                    })}
                  </div>
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

          {needsKeterangan && (
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
