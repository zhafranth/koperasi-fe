import type { ApiResponse } from "../../../config/axios";
import apiRequest from "../../../config/axios";
import type { CreateDistributedCicilanPayload } from "@/api/pinjaman/pinjaman.interface";

export const createCicilan = async (data: object) => {
  const response: ApiResponse<object> = await apiRequest({
    method: "POST",
    url: "/cicilan",
    data,
  });

  return response.data.data;
};

export const createDistributedCicilan = async (
  data: CreateDistributedCicilanPayload,
) => {
  const response: ApiResponse<undefined> = await apiRequest({
    method: "POST",
    url: "/cicilan/distributed",
    data,
  });
  return response.data;
};
