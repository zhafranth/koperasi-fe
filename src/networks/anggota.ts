import { getListAnggota, getDetailAnggota, putUpdateAnggota } from "@/api/anggota";
import type { UpdateAnggotaPayload } from "@/api/anggota/anggota.interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetAnggota = (params?: object) => {
  return useQuery({
    queryKey: ["anggota", "list", params],
    queryFn: () => getListAnggota(params),
  });
};

export const useGetAnggotaDetail = (id: number) => {
  return useQuery({
    queryKey: ["anggota", "detail", id],
    queryFn: () => getDetailAnggota(id),
    enabled: !!id,
  });
};

export const useUpdateAnggota = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdateAnggotaPayload) => putUpdateAnggota(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anggota", "list"] });
      queryClient.invalidateQueries({ queryKey: ["anggota", "detail", id] });
      toast.success("Anggota berhasil diperbarui");
    },
  });
};
