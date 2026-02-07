import type { ApiResponse } from "../../../config/axios";
import apiRequest from "../../../config/axios";
import type {
  KeluargaProps,
  CreateKeluargaPayload,
  UpdateKeluargaPayload,
} from "./keluarga.interface";

export const getListKeluarga = async () => {
  const response: ApiResponse<KeluargaProps[]> = await apiRequest({
    method: "GET",
    url: "/keluarga",
  });

  return response.data.data;
};

export const postCreateKeluarga = async (data: CreateKeluargaPayload) => {
  const response: ApiResponse<undefined> = await apiRequest({
    method: "POST",
    url: "/keluarga",
    data,
  });

  return response.data;
};

export const putUpdateKeluarga = async (
  id: number,
  data: UpdateKeluargaPayload
) => {
  const response: ApiResponse<undefined> = await apiRequest({
    method: "PUT",
    url: `/keluarga/${id}`,
    data,
  });

  return response.data;
};

export const deleteKeluargaApi = async (id: number) => {
  const response: ApiResponse<undefined> = await apiRequest({
    method: "DELETE",
    url: `/keluarga/${id}`,
  });

  return response.data;
};
