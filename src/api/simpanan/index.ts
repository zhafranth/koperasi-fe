import type { ApiResponse } from "../../../config/axios";
import apiRequest from "../../../config/axios";
import type { SimpananPayload } from "./simpanan.interface";

export const postCreateSimpanan = async (data: SimpananPayload) => {
  const response: ApiResponse<undefined> = await apiRequest({
    method: "POST",
    url: "/simpanan",
    data,
  });

  return response.data;
};
