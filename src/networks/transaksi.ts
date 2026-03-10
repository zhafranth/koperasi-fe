import {
  getListTransaksi,
  getTotalTransaksi,
  deleteTransaksiApi,
  updateTransaksiApi,
} from "@/api/transaksi";
import type { UpdateTransaksiPayload } from "@/api/transaksi/transaksi.interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

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

export const useDeleteTransaksi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTransaksiApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaksi"] });
      queryClient.invalidateQueries({ queryKey: ["simpanan"] });
      queryClient.invalidateQueries({ queryKey: ["pinjaman"] });
      queryClient.invalidateQueries({ queryKey: ["cicilan"] });
      queryClient.invalidateQueries({ queryKey: ["infaq"] });
      queryClient.invalidateQueries({ queryKey: ["penarikan"] });
      queryClient.invalidateQueries({ queryKey: ["simpanan-sukarela"] });
      queryClient.invalidateQueries({ queryKey: ["tabungan-liburan"] });
      queryClient.invalidateQueries({ queryKey: ["anggota"] });
      toast.success("Transaksi berhasil dihapus");
    },
  });
};

export const useUpdateTransaksi = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: UpdateTransaksiPayload }) =>
      updateTransaksiApi(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaksi"] });
      queryClient.invalidateQueries({ queryKey: ["simpanan"] });
      queryClient.invalidateQueries({ queryKey: ["pinjaman"] });
      queryClient.invalidateQueries({ queryKey: ["cicilan"] });
      queryClient.invalidateQueries({ queryKey: ["infaq"] });
      queryClient.invalidateQueries({ queryKey: ["penarikan"] });
      queryClient.invalidateQueries({ queryKey: ["simpanan-sukarela"] });
      queryClient.invalidateQueries({ queryKey: ["tabungan-liburan"] });
      queryClient.invalidateQueries({ queryKey: ["anggota"] });
      toast.success("Transaksi berhasil diupdate");
    },
  });
};
