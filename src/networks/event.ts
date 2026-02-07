import { getListEvents, postCreateEvent } from "@/api/event";
import type { CreateEventPayload } from "@/api/event/event.interface";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useGetEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: () => getListEvents(),
  });
};

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateEventPayload) => postCreateEvent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event berhasil ditambahkan");
    },
  });
};
