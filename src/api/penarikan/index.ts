import apiRequest, { type ApiResponse } from "../../../config/axios";
import type {
  PenarikanProps,
  CreatePenarikanPayload,
  SaldoPenarikanProps,
} from "./penarikan.interface";

export const getListPenarikan = async (params?: object) => {
  const response: ApiResponse<PenarikanProps[]> = await apiRequest({
    method: "GET",
    url: "/penarikan",
    params,
  });

  return response.data.data;
};

export const getSaldoPenarikan = async (
  id_anggota: number,
  sumber: string
) => {
  const response: ApiResponse<SaldoPenarikanProps> = await apiRequest({
    method: "GET",
    url: "/penarikan/saldo",
    params: { id_anggota, sumber },
  });

  return response.data.data;
};

export const postCreatePenarikan = async (data: CreatePenarikanPayload) => {
  const response: ApiResponse<undefined> = await apiRequest({
    method: "POST",
    url: "/penarikan",
    data,
  });

  return response.data;
};

export const deletePenarikanApi = async (id: number) => {
  const response: ApiResponse<undefined> = await apiRequest({
    method: "DELETE",
    url: `/penarikan/${id}`,
  });

  return response.data;
};
