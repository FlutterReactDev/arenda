import { baseApiWithReAuth } from "@shared/api/rtk";
import { CreateRoomType } from "../types/createRoomTypes";
import { ObjectResponse } from "../types/object";

const objectApi = baseApiWithReAuth.injectEndpoints({
  endpoints: (build) => ({
    createObject: build.mutation<unknown, unknown>({
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
} = objectApi;
