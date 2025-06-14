import { getListTransaksi, getTotalTransaksi } from "@/api/transaksi";
import { useQuery } from "@tanstack/react-query";

export const useGetTransaksi = (params?: object) => {
  return useQuery({
    queryKey: ["transaksi", "list", params],
    queryFn: () => getListTransaksi(params),
  });
};

export const useGetTransaksiTotal = () => {
  return useQuery({
    queryKey: ["transaksi", "total"],
    queryFn: () => getTotalTransaksi(),
  });
};
