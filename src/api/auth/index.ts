import apiRequest, { type ApiResponse } from "../../../config/axios";

export interface UserProfile {
  id: number;
  nama: string;
  username: string;
  role: "pengurus" | "anggota";
  email: string | null;
  no_telepon: string | null;
}

export const loginAccount = async (data: object) => {
  const response: { data: { token: string } } = await apiRequest({
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

export const getMe = async (): Promise<UserProfile> => {
  const response: { data: { data: UserProfile } } = await apiRequest({
    method: "GET",
    url: "/auth/me",
  });

  return response.data.data;
};
