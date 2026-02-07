import {
  getListKeluarga,
  postCreateKeluarga,
  putUpdateKeluarga,
  deleteKeluargaApi,
} from "@/api/keluarga";
import type {
  CreateKeluargaPayload,
  UpdateKeluargaPayload,
} from "@/api/keluarga/keluarga.interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetKeluarga = () => {
  return useQuery({
    queryKey: ["keluarga"],
    queryFn: () => getListKeluarga(),
  });
};

export const useCreateKeluarga = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateKeluargaPayload) => postCreateKeluarga(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keluarga"] });
      toast.success("Keluarga berhasil ditambahkan");
    },
  });
};

export const useUpdateKeluarga = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateKeluargaPayload }) =>
      putUpdateKeluarga(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keluarga"] });
      toast.success("Keluarga berhasil diperbarui");
    },
  });
};

export const useDeleteKeluarga = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteKeluargaApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["keluarga"] });
      toast.success("Keluarga berhasil dihapus");
    },
  });
};
