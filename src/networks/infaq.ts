import { getListInfaq, postCreateInfaq } from "@/api/infaq";
import type { CreateInfaqPayload } from "@/api/infaq/infaq.interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetInfaq = () => {
  return useQuery({
    queryKey: ["infaq"],
    queryFn: () => getListInfaq(),
  });
};

export const useCreateInfaq = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateInfaqPayload) => postCreateInfaq(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transaksi"] });
      queryClient.invalidateQueries({ queryKey: ["infaq"] });
      toast.success("Infaq berhasil ditambahkan");
    },
  });
};
