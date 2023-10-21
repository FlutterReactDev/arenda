import { baseApiWithReAuth } from "@shared/api/rtk";
import { ObjectType } from "../types";

const objectTypeApi = baseApiWithReAuth.injectEndpoints({
  endpoints: (build) => ({
    getAllObjectTypes: build.query<ObjectType[], unknown>({
      query: () => ({
        url: "/AllObjectTypes",
      }),
    }),
    createObjectTypes: build.mutation({
      query: () => ({
        url: "/CreateObjectTypes",
      }),
    }),
    updateObjectTypes: build.mutation({
      query: () => ({
        url: "/UpdateObjectTypes",
      }),
    }),
    deleteObjectTypes: build.mutation({
      query: (objectTypeId) => ({
        url: `/DeleteObjectType${objectTypeId}`,
      }),
    }),
  }),
});

export const {
  useCreateObjectTypesMutation,
  useDeleteObjectTypesMutation,
  useGetAllObjectTypesQuery,
  useUpdateObjectTypesMutation,
} = objectTypeApi;
