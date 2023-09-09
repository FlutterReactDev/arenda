import { baseApiWithReAuth } from "@shared/api/rtk";

const objectTypeApi = baseApiWithReAuth.injectEndpoints({
  endpoints: (build) => ({
    getAllObjectTypes: build.query({
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
