import { getListAnggota, getDetailAnggota } from "@/api/anggota";
import { useQuery } from "@tanstack/react-query";

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
  });
};
