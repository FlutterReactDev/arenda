import { baseApiWithReAuth } from "@shared/api/rtk";

const objectTypePropertyApi = baseApiWithReAuth.injectEndpoints({
  endpoints: (build) => ({
    getAllObjectPropertyTypes: build.query({
      query: () => ({
        url: "/AllObjectPropertyTypes",
      }),
    }),
    getById: build.query({
      query: (objectTypeId) => ({
        url: `/GetById${objectTypeId}`,
      }),
    }),
    createObjectPropertyTypes: build.mutation({
      query: () => ({
        url: "/CreateObjectPropertyTypes",
      }),
    }),
    updateObjectPropertyTypes: build.mutation({
      query: () => ({
        url: "/UpdateObjectPropertyTypes",
      }),
    }),
    deleteObjectPropertyTypes: build.mutation({
      query: (objectPropertyTypeId) => ({
        url: `/DeleteObjectPropertyType/${objectPropertyTypeId}`,
      }),
    }),
  }),
});

export const {
  useCreateObjectPropertyTypesMutation,
  useDeleteObjectPropertyTypesMutation,
  useGetAllObjectPropertyTypesQuery,
  useGetByIdQuery,
  useUpdateObjectPropertyTypesMutation,
} = objectTypePropertyApi;
