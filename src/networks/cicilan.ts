import { createCicilan } from "@/api/cicilan";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCicilan = (id?: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: object) => createCicilan(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pinjaman", "detail", id] });
    },
  });
};
