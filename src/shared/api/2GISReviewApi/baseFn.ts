import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query";

const baseQuery = fetchBaseQuery({
  baseUrl: _2GIS_REVIEW_API_URL_,
});

export const review2GISBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const fetchArgs = args as FetchArgs;
  const result = await baseQuery(
    {
      ...fetchArgs,
      params: {
        key: _2GIS_REVIEW_KEY_,
        locale: "ru_KG",
        ...fetchArgs.params,
      },
    },
    api,
    extraOptions
  );

  return result;
};
