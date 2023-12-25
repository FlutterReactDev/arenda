import { baseApiWithReAuth } from "@shared/api/rtk";
import { CreateRoomType } from "../types/createRoomTypes";
import { ObjectResponse } from "../types/object";
import { CreateObjectType } from "../types/createObjectTypes";
import { RoomResponse } from "../types/room";

const objectApi = baseApiWithReAuth.injectEndpoints({
  endpoints: (build) => ({
    createObject: build.mutation<ObjectResponse, CreateObjectType>({
      query: (data) => ({
        url: "/Create",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["object"],
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

    deleteObject: build.mutation<void, number>({
      query: (anObjectId) => ({
        url: "/Delete",
        method: "DELETE",
        params: {
          anObjectId,
        },
      }),

      invalidatesTags: ["object"],
    }),

    getAllObjects: build.query<ObjectResponse[], void>({
      query: () => ({
        url: "/GetAll",
      }),
      providesTags: ["object"],
    }),

    getObjectById: build.query<ObjectResponse, string>({
      query: (id) => ({
        url: "/Get/" + id,
      }),
      providesTags: ["object"],
    }),

    editObject: build.mutation<
      void,
      {
        anObjectId: number;
        data: ObjectResponse;
      }
    >({
      query: ({ anObjectId, data }) => ({
        url: "/Edit",
        body: data,
        params: {
          anObjectId,
        },
        method: "PUT",
      }),
      invalidatesTags: ["object"],
    }),

    editRoom: build.mutation<
      void,
      {
        roomId: string;
        data: RoomResponse;
      }
    >({
      query: ({ data, roomId }) => ({
        url: "/UpdateRoom/" + roomId,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["room"],
    }),

    getRoomById: build.query<RoomResponse, string>({
      query: (roomId) => ({
        url: "/GetRoomById/" + roomId,
      }),
      providesTags: ["room"],
    }),
  }),
});

export const {
  useCreateObjectMutation,
  useCreateRoomMutation,
  useCreateRoomsMutation,
  useGetAllObjectsQuery,
  useGetObjectByIdQuery,
  useEditObjectMutation,
  useDeleteObjectMutation,
  useGetRoomByIdQuery,
  useEditRoomMutation,
} = objectApi;
