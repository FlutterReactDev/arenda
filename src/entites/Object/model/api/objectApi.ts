import { baseApiWithReAuth } from "@shared/api/rtk";
import { ObjectType } from "../types";

const objectApi = baseApiWithReAuth.injectEndpoints({
  endpoints: (build) => ({
    createObject: build.mutation<ObjectType, ObjectType>({
      query: (data) => ({
        url: "/Create",
        body: data,
        method: "POST",
      }),
    }),
  }),
});

export const { useCreateObjectMutation } = objectApi;
