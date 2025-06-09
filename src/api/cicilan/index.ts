import type { ApiResponse } from "../../../config/axios";
import apiRequest from "../../../config/axios";

export const createCicilan = async (data: object) => {
  console.log("data:", data);
  const response: ApiResponse<object> = await apiRequest({
    method: "POST",
    url: "/cicilan",
    data,
  });

  return response.data.data;
};
