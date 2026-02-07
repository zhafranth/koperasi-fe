import type { ApiResponse } from "../../../config/axios";
import apiRequest from "../../../config/axios";
import type {
  AnggotaDetailProps,
  AnggotaProps,
  UpdateAnggotaPayload,
} from "./anggota.interface";

export const getListAnggota = async (params?: object) => {
  const response: ApiResponse<AnggotaProps[]> = await apiRequest({
    method: "GET",
    url: "/anggota",
    params,
  });

  return response.data.data;
};

export const getDetailAnggota = async (id: number) => {
  const response: ApiResponse<AnggotaDetailProps> = await apiRequest({
    method: "GET",
    url: `/anggota/${id}`,
  });

  return response.data.data;
};

export const putUpdateAnggota = async (
  id: number,
  data: UpdateAnggotaPayload
) => {
  const response: ApiResponse<undefined> = await apiRequest({
    method: "PUT",
    url: `/anggota/${id}`,
    data,
  });

  return response.data;
};
