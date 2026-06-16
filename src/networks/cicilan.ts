import { createCicilan, createDistributedCicilan } from "@/api/cicilan";
import type { CreateDistributedCicilanPayload } from "@/api/pinjaman/pinjaman.interface";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useCicilan = (id?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: object) => createCicilan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pinjaman", "detail", id] });
    },
  });
};

export const useDistributedCicilan = (idAnggota?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateDistributedCicilanPayload) =>
      createDistributedCicilan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pinjaman"] });
      queryClient.invalidateQueries({ queryKey: ["transaksi"] });
      if (idAnggota) {
        queryClient.invalidateQueries({
          queryKey: ["anggota", "detail", idAnggota],
        });
      }
      toast.success("Cicilan berhasil dibayar");
    },
  });
};
