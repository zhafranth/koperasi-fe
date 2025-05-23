import apiRequest, { type ApiResponse } from "../../../config/axios";

export const loginAccount = async (data: object) => {
  const response: ApiResponse<{ token: string }> = await apiRequest({
    method: "POST",
    url: "/auth/login",
    data,
  });

  return response.data;
};

export const register = async (data: object) => {
  const response: ApiResponse<object> = await apiRequest({
    method: "POST",
    url: "/auth/register",
    data,
  });

  return response.data.data;
};
