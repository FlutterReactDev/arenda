import { createApi } from "@reduxjs/toolkit/query/react";
import { review2GISBaseQuery } from "./baseFn";

export const base2GISReviewApi = createApi({
  baseQuery: review2GISBaseQuery,
  reducerPath: "base2GISReviewApi",
  endpoints: () => ({}),
});
