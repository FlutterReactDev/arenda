import { baseApi, baseApiWithReAuth } from "@shared/api/rtk";
import {
  AdditionalService,
  FoodType,
  InternetAccess,
  Parking,
  PaymentType,
  SmokingOnSite,
} from "../types";

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
    getInternetAccess: build.query<InternetAccess[], unknown>({
      query: () => ({
        url: "/InternetAccess",
      }),
    }),
    getParking: build.query<Parking[], unknown>({
      query: () => ({
        url: "/Parking",
      }),
    }),
    getPaymentType: build.query<PaymentType[], unknown>({
      query: () => ({
        url: "/PaymentType",
      }),
    }),
    getSmokingOnSite: build.query<SmokingOnSite[], unknown>({
      query: () => ({
        url: "/SmokingOnSite",
      }),
    }),
    getFoodType: build.query<FoodType[], unknown>({
      query: () => ({
        url: "/FoodType",
      }),
    }),
    getAdditionalService: build.query<AdditionalService[], unknown>({
      query: () => ({
        url: "/AdditionalService",
      }),
    }),
    getRoomCategories: build.query({
      query: () => ({
        url: "/RoomCategories",
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
  useGetAdditionalServiceQuery,
  useGetFoodTypeQuery,
  useGetRoomCategoriesQuery,
} = commonReferencePrivateApi;
