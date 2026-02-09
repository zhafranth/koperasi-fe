import type { ApiResponse } from "../../../config/axios";
import apiRequest from "../../../config/axios";
import type { PinjamanProps, PinjamanDetailProps, CreatePinjamanPayload, LimitPinjamanProps } from "./pinjaman.interface";

export const getListPinjaman = async (params?: object) => {
  const response: ApiResponse<PinjamanProps[]> = await apiRequest({
    method: "GET",
    url: "/pinjaman",
    params,
  });

  return response.data.data;
};

export const getDetailPinjaman = async (id: number) => {
  const response: ApiResponse<PinjamanDetailProps> = await apiRequest({
    method: "GET",
    url: `/pinjaman/${id}`,
  });

  return response.data.data;
};

export const getLimitPinjaman = async (idAnggota: number) => {
  const response: ApiResponse<LimitPinjamanProps> = await apiRequest({
    method: "GET",
    url: "/pinjaman/limit",
    params: { id_anggota: idAnggota },
  });

  return response.data.data;
};

export const postCreatePinjaman = async (data: CreatePinjamanPayload) => {
  const response: ApiResponse<undefined> = await apiRequest({
    method: "POST",
    url: "/pinjaman",
    data,
  });

  return response.data;
};
