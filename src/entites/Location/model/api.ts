import { baseApi } from "@shared/api/rtk";
import { City, Country, Region } from "./types";

const locationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCountry: build.query<Country[], null>({
      query: () => ({
        url: "/country",
      }),
    }),
    getRegion: build.query<Region[], number>({
      query: (id) => ({
        url: `/country/${id}/regions`,
      }),
    }),

    getCity: build.query<City[], number>({
      query: (id) => ({
        url: `/regions/${id}/city`,
      }),
    }),
  }),
});

export const { useGetCountryQuery, useGetCityQuery, useGetRegionQuery } =
  locationApi;
