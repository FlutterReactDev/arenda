import {
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: _2GIS_API_URL_,
});

export const base2GISApi = createApi({
  baseQuery: async (args, api, extraOptions) => {
    const fetchArgs = args as FetchArgs;
    const result = await baseQuery(
      {
        ...fetchArgs,
        params: {
          key: "demo",
          locale: "ru_KG",
          ...fetchArgs.params,
        },
      },
      api,
      extraOptions
    );

    return result;
  },
  reducerPath: "base2GISApi",
  endpoints: () => ({}),
});
