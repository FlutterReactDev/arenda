import { baseApi } from "@shared/api/rtk";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: "/Login",
        body: data,
        method: "POST",
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
