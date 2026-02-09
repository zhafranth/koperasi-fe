import {
  getListSimpananSukarela,
  postCreateSimpananSukarela,
} from "@/api/simpanan-sukarela";
import type { CreateSimpananSukarelaPayload } from "@/api/simpanan-sukarela/simpanan-sukarela.interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetSimpananSukarela = () => {
  return useQuery({
    queryKey: ["simpanan-sukarela"],
    queryFn: () => getListSimpananSukarela(),
  });
};

export const useCreateSimpananSukarela = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateSimpananSukarelaPayload) =>
      postCreateSimpananSukarela(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaksi"] });
      queryClient.invalidateQueries({ queryKey: ["simpanan-sukarela"] });
      toast.success("Simpanan sukarela berhasil ditambahkan");
    },
  });
};
