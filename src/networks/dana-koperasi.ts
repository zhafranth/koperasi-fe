import { getListPemasukan, getListPengeluaran } from "@/api/dana-koperasi";
import { useQuery } from "@tanstack/react-query";

export const useGetPemasukan = () => {
  return useQuery({
    queryKey: ["dana-koperasi", "pemasukan"],
    queryFn: () => getListPemasukan(),
  });
};

export const useGetPengeluaran = () => {
  return useQuery({
    queryKey: ["dana-koperasi", "pengeluaran"],
    queryFn: () => getListPengeluaran(),
  });
};
