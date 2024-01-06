import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReAuth";

export const baseApiWithReAuth = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "baseApiWithReAuth",
  endpoints: () => ({}),
  tagTypes: ["object", "room", "availibility", "user"],
});
