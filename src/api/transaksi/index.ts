import type { ApiResponse } from "../../../config/axios";
import apiRequest from "../../../config/axios";
import type { TransaksiProps } from "./transaksi.interface";

export const getListTransaksi = async (params?: object) => {
  const response: ApiResponse<TransaksiProps[]> = await apiRequest({
    method: "GET",
    url: "/transaksi",
    params,
  });

  return response.data.data;
};
