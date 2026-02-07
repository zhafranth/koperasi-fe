import type { ApiResponse } from "../../../config/axios";
import apiRequest from "../../../config/axios";
import type { CreateInfaqPayload, InfaqProps } from "./infaq.interface";

export const getListInfaq = async () => {
  const response: ApiResponse<InfaqProps[]> = await apiRequest({
    method: "GET",
    url: "/infaq",
  });

  return response.data.data;
};

export const postCreateInfaq = async (data: CreateInfaqPayload) => {
  const response: ApiResponse<undefined> = await apiRequest({
    method: "POST",
    url: "/infaq",
    data,
  });

  return response.data;
};
