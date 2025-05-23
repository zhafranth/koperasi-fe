import { register } from "@/api/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateAnggota = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: object) => register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anggota", "list"] });
    },
  });
};
