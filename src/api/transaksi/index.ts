import type { ApiResponse } from "../../../config/axios";
import apiRequest from "../../../config/axios";
import type {
  TransaksiProps,
  TransaksiTotalProps,
} from "./transaksi.interface";

export const getListTransaksi = async (params?: object) => {
  const response: ApiResponse<TransaksiProps[]> = await apiRequest({
    method: "GET",
    url: "/transaksi",
    params,
  });

  return response.data;
};

export const getTotalTransaksi = async () => {
  const response: ApiResponse<TransaksiTotalProps> = await apiRequest({
    method: "GET",
    url: "/transaksi/total",
  });

  return response.data.data;
};
