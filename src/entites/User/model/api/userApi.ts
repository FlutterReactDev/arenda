import { baseApi } from "@shared/api/rtk";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: () => ({
        url: "/Login",
        body: {},
      }),
    }),

    register: build.mutation({
      query: () => ({
        url: "/Register",
        body: {},
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = userApi;
