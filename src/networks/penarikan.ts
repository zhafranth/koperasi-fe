import {
  getListPenarikan,
  getSaldoPenarikan,
  postCreatePenarikan,
  deletePenarikanApi,
} from "@/api/penarikan";
import type { CreatePenarikanPayload } from "@/api/penarikan/penarikan.interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetPenarikan = (params?: object) => {
  return useQuery({
    queryKey: ["penarikan", "list", params],
    queryFn: () => getListPenarikan(params),
  });
};

export const useGetSaldoPenarikan = (
  id_anggota: number,
  sumber: string,
  options?: { enabled?: boolean }
) => {
  return useQuery({
    queryKey: ["penarikan", "saldo", id_anggota, sumber],
    queryFn: () => getSaldoPenarikan(id_anggota, sumber),
    enabled: options?.enabled ?? true,
  });
};

export const useCreatePenarikan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePenarikanPayload) => postCreatePenarikan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["penarikan"] });
      queryClient.invalidateQueries({ queryKey: ["transaksi"] });
      toast.success("Penarikan berhasil diproses");
    },
  });
};

export const useDeletePenarikan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePenarikanApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["penarikan"] });
      queryClient.invalidateQueries({ queryKey: ["transaksi"] });
      toast.success("Penarikan berhasil dihapus");
    },
  });
};
