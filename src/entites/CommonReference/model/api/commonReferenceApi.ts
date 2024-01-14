import { baseApi, baseApiWithReAuth } from "@shared/api/rtk";
import {
  AdditionalService,
  BedType,
  CleaningFeeTypes,
  Currency,
  FloorType,
  FoodType,
  FromBookingToCheckIn,
  InstantBookingValid,
  InternetAccess,
  KitchenTypes,
  MealServiceTypes,
  NumberOfIsolatedBedroomType,
  ObjectStarRating,
  Parking,
  PaymentType,
  RepairType,
  ReportingDocumentType,
  RoomCategories,
  RoomNameTypes,
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
    getRoomCategories: build.query<RoomCategories[], void>({
      query: () => ({
        url: "/RoomCategories",
      }),
    }),
    getReportingDocumentType: build.query<ReportingDocumentType[], unknown>({
      query: () => ({
        url: "/ReportingDocumentType",
      }),
    }),
    getObjectStarRating: build.query<ObjectStarRating[], unknown>({
      query: () => ({
        url: "/ObjectStarRating",
      }),
    }),
    getCurrencies: build.query<Currency[], void>({
      query: () => ({
        url: "/Currencies",
      }),
    }),
    getBedTypes: build.query<BedType[], unknown>({
      query: () => ({
        url: "/BedTypes",
      }),
    }),
    getCleaningFeeTypes: build.query<CleaningFeeTypes[], unknown>({
      query: () => ({
        url: "/CleaningFeeTypes",
      }),
    }),

    getMealServiceTypes: build.query<MealServiceTypes[], unknown>({
      query: () => ({
        url: "/MealServiceTypes",
      }),
    }),
    getFromBookingToCheckIn: build.query<FromBookingToCheckIn[], unknown>({
      query: () => ({
        url: "/FromBookingToCheckIn",
      }),
    }),
    getInstantBookingValid: build.query<InstantBookingValid[], unknown>({
      query: () => ({
        url: "/InstantBookingValid",
      }),
    }),

    getRoomTypeNames: build.query<RoomNameTypes[], number>({
      query: (anObjectPropertyTypeId) => ({
        url: "/RoomTypeNames",
        params: {
          anObjectPropertyTypeId,
        },
      }),
    }),

    getKitchenType: build.query<KitchenTypes[], void>({
      query: () => ({
        url: "/KitchenType",
      }),
    }),

    getRepairType: build.query<RepairType[], void>({
      query: () => ({
        url: "/RepairType",
      }),
    }),
    getNumberOfIsolatedBedroom: build.query<
      NumberOfIsolatedBedroomType[],
      void
    >({
      query: () => ({
        url: "/NumberOfIsolatedBedroom",
      }),
    }),
    getFloorType: build.query<FloorType[], void>({
      query: () => ({
        url: "/FloorType",
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
  useGetReportingDocumentTypeQuery,
  useGetObjectStarRatingQuery,
  useGetCurrenciesQuery,
  useGetBedTypesQuery,
  useGetCleaningFeeTypesQuery,
  useGetMealServiceTypesQuery,
  useGetFromBookingToCheckInQuery,
  useGetInstantBookingValidQuery,
  useGetRoomTypeNamesQuery,
  useGetKitchenTypeQuery,
  useGetRepairTypeQuery,
  useGetNumberOfIsolatedBedroomQuery,
  useGetFloorTypeQuery,
} = commonReferencePrivateApi;
