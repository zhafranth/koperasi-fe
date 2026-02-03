import { postCreateSimpanan } from "@/api/simpanan";
import type { SimpananPayload } from "@/api/simpanan/simpanan.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCreateSimpanan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SimpananPayload) => postCreateSimpanan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaksi"] });
      toast.success("Simpanan berhasil ditambahkan");
    },
  });
};
