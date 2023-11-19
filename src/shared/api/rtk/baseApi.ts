import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { baseQuery } from "./baseQuery";

export const baseApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: _BASE_API_URL_,
  }),
  reducerPath: "baseApi",

  endpoints: () => ({}),
});
