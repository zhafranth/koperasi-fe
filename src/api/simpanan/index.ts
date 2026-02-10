import type { ApiResponse } from "../../../config/axios";
import apiRequest from "../../../config/axios";
import type {
  SimpananChartItem,
  SimpananPayload,
} from "./simpanan.interface";

export const postCreateSimpanan = async (data: SimpananPayload) => {
  const response: ApiResponse<undefined> = await apiRequest({
    method: "POST",
    url: "/simpanan",
    data,
  });

  return response.data;
};

export const getSimpananChart = async (tahun: number) => {
  const response: ApiResponse<SimpananChartItem[]> = await apiRequest({
    method: "GET",
    url: "/simpanan/chart",
    params: { tahun },
  });

  return response.data.data;
};
