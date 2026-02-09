import {
  getListTabunganLiburan,
  postCreateTabunganLiburan,
} from "@/api/tabungan-liburan";
import type { CreateTabunganLiburanPayload } from "@/api/tabungan-liburan/tabungan-liburan.interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetTabunganLiburan = () => {
  return useQuery({
    queryKey: ["tabungan-liburan"],
    queryFn: () => getListTabunganLiburan(),
  });
};

export const useCreateTabunganLiburan = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTabunganLiburanPayload) =>
      postCreateTabunganLiburan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaksi"] });
      queryClient.invalidateQueries({ queryKey: ["tabungan-liburan"] });
      toast.success("Tabungan liburan berhasil ditambahkan");
    },
  });
};
