import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const base2GISApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: _2GIS_API_URL_,
  }),
  reducerPath: "base2GISApi",
  endpoints: () => ({}),
});
