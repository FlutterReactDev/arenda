import { baseApiWithReAuth } from "@shared/api/rtk";
import * as Yup from "yup";
import { LoginSchema } from "../schemas/LoginSchema";
import { UserLoginData } from "../types/UserType";
import { RegisterSchema } from "../schemas/RegisterSchema";
const userApi = baseApiWithReAuth.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<UserLoginData, Yup.InferType<typeof LoginSchema>>({
      query: (data) => ({
        url: "/Login",
        body: data,
        method: "POST",
      }),
    }),

    register: build.mutation<unknown, Yup.InferType<typeof RegisterSchema>>({
      query: (data) => ({
        url: "/Register",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = userApi;
