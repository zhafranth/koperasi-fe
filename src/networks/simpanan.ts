import { getSimpananChart, postCreateSimpanan } from "@/api/simpanan";
import type { SimpananPayload } from "@/api/simpanan/simpanan.interface";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetSimpananChart = (tahun: number) => {
  return useQuery({
    queryKey: ["simpanan", "chart", tahun],
    queryFn: () => getSimpananChart(tahun),
  });
};

export const useCreateSimpanan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SimpananPayload) => postCreateSimpanan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaksi"] });
      queryClient.invalidateQueries({ queryKey: ["simpanan"] });
      toast.success("Simpanan berhasil ditambahkan");
    },
  });
};
