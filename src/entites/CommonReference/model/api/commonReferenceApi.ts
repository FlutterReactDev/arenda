import { baseApi, baseApiWithReAuth } from "@shared/api/rtk";

const commonReferencePublicApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLanguages: build.query({
      query: () => ({
        url: "/Languages",
      }),
    }),
  }),
});

const commonReferencePrivateApi = baseApiWithReAuth.injectEndpoints({
  endpoints: (build) => ({
    getGender: build.query({
      query: () => ({
        url: "/Gender",
      }),
    }),
    getInternetAccess: build.query({
      query: () => ({
        url: "/InternetAccess",
      }),
    }),
    getParking: build.query({
      query: () => ({
        url: "/Parking",
      }),
    }),
    getPaymentType: build.query({
      query: () => ({
        url: "/PaymentType",
      }),
    }),
    getSmokingOnSite: build.query({
      query: () => ({
        url: "/SmokingOnSite",
      }),
    }),
  }),
});

export const { useGetLanguagesQuery } = commonReferencePublicApi;
export const {
  useGetGenderQuery,
  useGetInternetAccessQuery,
  useGetParkingQuery,
  useGetPaymentTypeQuery,
  useGetSmokingOnSiteQuery,
} = commonReferencePrivateApi;
