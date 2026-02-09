import apiRequest, { type ApiResponse } from "../../../config/axios";
import type {
  TabunganLiburanProps,
  CreateTabunganLiburanPayload,
} from "./tabungan-liburan.interface";

export const getListTabunganLiburan = async () => {
  const response: ApiResponse<TabunganLiburanProps[]> = await apiRequest({
    method: "GET",
    url: "/tabungan-liburan",
  });

  return response.data.data;
};

export const postCreateTabunganLiburan = async (
  data: CreateTabunganLiburanPayload
) => {
  const response: ApiResponse<undefined> = await apiRequest({
    method: "POST",
    url: "/tabungan-liburan",
    data,
  });

  return response.data;
};
