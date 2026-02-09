import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/api/auth";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: !!localStorage.getItem("token"),
  });
};

export const useIsPengurus = () => {
  const { data } = useAuth();
  return data?.role === "pengurus";
};
