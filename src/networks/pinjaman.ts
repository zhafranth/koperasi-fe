import { getListPinjaman, getDetailPinjaman, postCreatePinjaman } from "@/api/pinjaman";
import type { CreatePinjamanPayload } from "@/api/pinjaman/pinjaman.interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetPinjaman = (params?: object) => {
  return useQuery({
    queryKey: ["pinjaman", "list", params],
    queryFn: () => getListPinjaman(params),
    enabled: !!params,
  });
};

export const useGetPinjamanDetail = (id: number) => {
  return useQuery({
    queryKey: ["pinjaman", "detail", id],
    queryFn: () => getDetailPinjaman(id),
    enabled: !!id,
  });
};

export const useCreatePinjaman = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePinjamanPayload) => postCreatePinjaman(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaksi"] });
      queryClient.invalidateQueries({ queryKey: ["pinjaman"] });
      toast.success("Pinjaman berhasil diajukan");
    },
  });
};
