import { baseApiWithReAuth } from "@shared/api/rtk";
import { City, Country, Region } from "./types";

const locationApi = baseApiWithReAuth.injectEndpoints({
  endpoints: (build) => ({
    getCountry: build.query<Country[], null>({
      query: () => ({
        url: "/Countires",
      }),
    }),
    getRegion: build.query<Region[], number>({
      query: (id) => ({
        url: `/Regions/${id}`,
      }),
    }),

    getCity: build.query<City[], number>({
      query: (id) => ({
        url: `/Cities/${id}`,
      }),
    }),
  }),
});

export const { useGetCountryQuery, useGetCityQuery, useGetRegionQuery } =
  locationApi;
