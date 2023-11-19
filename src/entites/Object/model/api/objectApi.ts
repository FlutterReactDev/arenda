import { baseApiWithReAuth } from "@shared/api/rtk";

const objectApi = baseApiWithReAuth.injectEndpoints({
  endpoints: (build) => ({
    createObject: build.mutation<unknown, unknown>({
      query: (data) => ({
        url: "/Create",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateObjectMutation } = objectApi;
