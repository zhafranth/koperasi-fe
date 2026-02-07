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
import { useEffect } from "react";
import { useGetAnggotaDetail, useUpdateAnggota } from "@/networks/anggota";
import { useGetKeluarga } from "@/networks/keluarga";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  nama: z.string().min(1, "Nama harus diisi"),
  nik: z.string().optional(),
  no_telepon: z.string().optional(),
  email: z.string().email("Email tidak valid").optional().or(z.literal("")),
  alamat: z.string().optional(),
  id_keluarga: z.number().nullable().optional(),
});

interface ModalEditAnggotaProps {
  isOpen: boolean;
  onClose: () => void;
  anggotaId: number;
}

const ModalEditAnggota = ({
  isOpen,
  onClose,
  anggotaId,
}: ModalEditAnggotaProps) => {
  const { data } = useGetAnggotaDetail(anggotaId);
  const { mutate: updateAnggota, isPending } = useUpdateAnggota(anggotaId);
  const { data: keluargaList = [] } = useGetKeluarga();

  const keluargaOptions = keluargaList.map((k) => ({
    value: k.id_keluarga,
    label: k.nama_kepala_keluarga,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      nik: "",
      no_telepon: "",
      email: "",
      alamat: "",
      id_keluarga: null,
    },
  });

  useEffect(() => {
    if (data && isOpen) {
      form.reset({
        nama: data.nama || "",
        nik: data.nik || "",
        no_telepon: data.no_telepon || "",
        email: data.email || "",
        alamat: data.alamat || "",
        id_keluarga: (data as any).id_keluarga || null,
      });
    }
  }, [data, isOpen, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    updateAnggota(values, {
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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl border-[#e7e5e0]">
        <DialogHeader>
          <DialogTitle className="text-lg text-[#1c1917]">
            Edit Anggota
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    Nama
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan nama"
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
              name="nik"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    NIK
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan NIK"
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
              name="no_telepon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    No. Telepon
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan no telepon"
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Masukkan email"
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
              name="alamat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    Alamat
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Masukkan alamat"
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
              name="id_keluarga"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold uppercase tracking-wider text-[#78716c]">
                    Keluarga (Opsional)
                  </FormLabel>
                  <Select
                    value={field.value ? String(field.value) : undefined}
                    onValueChange={(v) =>
                      field.onChange(v === "__none__" ? null : Number(v))
                    }
                  >
                    <FormControl>
                      <SelectTrigger className="w-full rounded-xl border-[#e7e5e0] bg-[#f7f5f0] focus:bg-white focus:border-[#145a3f]">
                        <SelectValue placeholder="Pilih keluarga" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="__none__">Tidak ada</SelectItem>
                      {keluargaOptions.map((opt) => (
                        <SelectItem key={opt.value} value={String(opt.value)}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                disabled={isPending}
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

export default ModalEditAnggota;
