import { createApi } from "@reduxjs/toolkit/query/react";
import { photo2GIS2VBaseQuery } from "./baseFn";

export const base2GISPhotoApi2V = createApi({
  baseQuery: photo2GIS2VBaseQuery,
  reducerPath: "base2GISPhotoApi2V",
  endpoints: () => ({}),
});
