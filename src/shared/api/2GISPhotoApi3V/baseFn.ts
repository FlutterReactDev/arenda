import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/dist/query";

const baseQuery = fetchBaseQuery({
  baseUrl: _2GIS_PHOTO_3V_API_,
});

export const photo2GIS3VBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const fetchArgs = args as FetchArgs;
  const result = await baseQuery(
    {
      ...fetchArgs,
      params: {
        key: _2GIS_PHOTO_KEY_,
        locale: "ru_KG",
        ...fetchArgs.params,
      },
    },
    api,
    extraOptions
  );

  return result;
};
