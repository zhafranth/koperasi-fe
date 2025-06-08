import { getListPinjaman, getDetailPinjaman } from "@/api/pinjaman";
import { useQuery } from "@tanstack/react-query";

export const useGetPinjaman = (params?: object) => {
  return useQuery({
    queryKey: ["pinjaman", "list", params],
    queryFn: () => getListPinjaman(params),
  });
};

export const useGetPinjamanDetail = (id: number) => {
  return useQuery({
    queryKey: ["pinjaman", "detail", id],
    queryFn: () => getDetailPinjaman(id),
    enabled: !!id,
  });
};
