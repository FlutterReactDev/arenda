import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query";

const baseQuery = fetchBaseQuery({
  baseUrl: _2GIS_PRODUCT_API_,
});

export const product2GISBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const fetchArgs = args as FetchArgs;
  const result = await baseQuery(
    {
      ...fetchArgs,
      params: {
        locale: "ru_KG",
        ...fetchArgs.params,
      },
    },
    api,
    extraOptions
  );

  return result;
};
