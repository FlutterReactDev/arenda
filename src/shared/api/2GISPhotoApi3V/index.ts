import { createApi } from "@reduxjs/toolkit/query/react";
import { photo2GIS3VBaseQuery } from "./baseFn";

export const base2GISPhotoApi3V = createApi({
  baseQuery: photo2GIS3VBaseQuery,
  reducerPath: "photo2GIS3VBaseQuery",
  endpoints: () => ({}),
});
