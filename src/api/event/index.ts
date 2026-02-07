import type { ApiResponse } from "../../../config/axios";
import apiRequest from "../../../config/axios";
import type { EventProps, CreateEventPayload } from "./event.interface";

export const getListEvents = async () => {
  const response: ApiResponse<EventProps[]> = await apiRequest({
    method: "GET",
    url: "/event",
  });

  return response.data.data;
};

export const postCreateEvent = async (data: CreateEventPayload) => {
  const response: ApiResponse<undefined> = await apiRequest({
    method: "POST",
    url: "/event",
    data,
  });

  return response.data;
};
