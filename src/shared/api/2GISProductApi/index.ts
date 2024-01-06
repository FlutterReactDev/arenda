import { createApi } from "@reduxjs/toolkit/query/react";
import { product2GISBaseQuery } from "./baseFn";

export const base2GISProductApi = createApi({
  baseQuery: product2GISBaseQuery,
  reducerPath: "base2GISProductApi",
  endpoints: () => ({}),
});
