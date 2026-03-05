import type { ApiResponse } from "../../../config/axios";
import apiRequest from "../../../config/axios";
import type { PemasukanProps, PengeluaranProps } from "./dana-koperasi.interface";

export const getListPemasukan = async (sumber?: string) => {
  const response: ApiResponse<PemasukanProps[]> = await apiRequest({
    method: "GET",
    url: "/dana-koperasi/pemasukan",
    params: sumber ? { sumber } : undefined,
  });

  return response.data.data;
};

export const getListPengeluaran = async (sumber?: string) => {
  const response: ApiResponse<PengeluaranProps[]> = await apiRequest({
    method: "GET",
    url: "/dana-koperasi/pengeluaran",
    params: sumber ? { sumber } : undefined,
  });

  return response.data.data;
};
