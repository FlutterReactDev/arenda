import { baseApiWithReAuth } from "@shared/api/rtk";
import * as Yup from "yup";
import { EditProfileType } from "../schemas/EditProfileSchema";
import { LoginSchema } from "../schemas/LoginSchema";
import { RegisterType } from "../schemas/RegisterSchema";
import { ResetPasswordType } from "../schemas/ResetPasswordSchema";
import { userAction } from "../slice/userSlice";
import {
  AboutMeResponse,
  UserData,
  UserLoginData,
  VerifyEmail,
} from "../types/UserType";
import { BaseResponse } from "@shared/type";
import { calendarActions } from "@features/Calendar";

const userApi = baseApiWithReAuth?.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation<UserLoginData, Yup.InferType<typeof LoginSchema>>({
      query: (data) => ({
        url: "/Login",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["object"],
    }),

    register: build.mutation<
      UserData,
      RegisterType & {
        emaiIsVerified: boolean;
      }
    >({
      query: (data) => ({
        url: "/Register",
        body: data,
        method: "POST",
      }),
    }),

    logout: build.mutation<void, void>({
      query: () => ({
        url: "/Logout",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
          dispatch(calendarActions.setCurrentObject(null));
          dispatch(calendarActions.setObjects([]));
        } catch (e) {
          console.log(e);
        }
      },
    }),

    getResetPassword: build.mutation<BaseResponse<string>, string>({
      query: (emailAddress) => ({
        url: "/ResetPassword",
        params: {
          emailAddress,
        },
        method: "GET",
      }),
    }),

    resetPassword: build.mutation<
      BaseResponse<string>,
      ResetPasswordType & { token: string }
    >({
      query: ({ confirmNewPassword, newPassword, token }) => ({
        url: "/ResetPassword",
        method: "POST",
        body: { confirmNewPassword, newPassword },
        params: {
          token,
        },
      }),
    }),

    getVerifyEmail: build.query<VerifyEmail, void>({
      query: () => ({
        url: "/VerifyEmail",
      }),
    }),

    verifyEmail: build.mutation<VerifyEmail, string>({
      query: (token) => ({
        url: "/VerifyEmail",
        method: "POST",
        params: {
          token,
        },
      }),
    }),

    aboutMe: build.query<AboutMeResponse, void>({
      query: () => ({
        url: "/AboutMe",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(userAction.setUserData(data.result));
        } catch (e) {
          dispatch(userAction.setUserData(undefined));
        }
      },
      providesTags: ["user"],
    }),

    update: build.mutation<
      void,
      EditProfileType & { emaiIsVerified: boolean; id: number }
    >({
      query: (data) => ({
        url: "/Update",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useAboutMeQuery,
  useGetResetPasswordMutation,
  useGetVerifyEmailQuery,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useUpdateMutation,
} = userApi;
