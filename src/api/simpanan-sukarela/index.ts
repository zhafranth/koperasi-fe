import apiRequest, { type ApiResponse } from "../../../config/axios";
import type {
  SimpananSukarelaProps,
  CreateSimpananSukarelaPayload,
} from "./simpanan-sukarela.interface";

export const getListSimpananSukarela = async () => {
  const response: ApiResponse<SimpananSukarelaProps[]> = await apiRequest({
    method: "GET",
    url: "/simpanan-sukarela",
  });

  return response.data.data;
};

export const postCreateSimpananSukarela = async (
  data: CreateSimpananSukarelaPayload
) => {
  const response: ApiResponse<undefined> = await apiRequest({
    method: "POST",
    url: "/simpanan-sukarela",
    data,
  });

  return response.data;
};
