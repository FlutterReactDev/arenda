import { baseApiWithReAuth } from "@shared/api/rtk";
import { CreateRoomType } from "../types/createRoomTypes";

const objectApi = baseApiWithReAuth.injectEndpoints({
  endpoints: (build) => ({
    createObject: build.mutation<unknown, unknown>({
      query: (data) => ({
        url: "/Create",
        body: data,
        method: "POST",
      }),
    }),

    createRoom: build.mutation<unknown, CreateRoomType>({
      query: (data) => ({
        url: "/CreateRoom",
        body: data,
        method: "POST",
      }),
    }),

    createRooms: build.mutation<unknown, CreateRoomType[]>({
      query: (data) => ({
        url: "/CreateRooms",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useCreateObjectMutation,
  useCreateRoomMutation,
  useCreateRoomsMutation,
} = objectApi;
