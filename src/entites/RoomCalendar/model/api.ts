import { baseApiWithReAuth } from "@shared/api/rtk";
import { AvailabilityRequestData, AvailibilityData } from "./types";

const roomCalendarApi = baseApiWithReAuth.injectEndpoints({
  endpoints(build) {
    return {
      createAvailability: build.mutation<
        AvailibilityData,
        AvailabilityRequestData
      >({
        query: ({ availability, roomId }) => {
          return {
            url: `/CreateAvailability/${roomId}`,
            body: availability,
            method: "POST",
          };
        },
        invalidatesTags: ["availibility"],
      }),
      deleteAvailability: build.mutation<
        AvailibilityData,
        AvailabilityRequestData
      >({
        query: ({ availability, roomId }) => {
          return {
            url: `/DeleteAvailability${roomId}`,
            body: availability,
            method: "POST",
          };
        },
        invalidatesTags: ["availibility"],
      }),

      editAvailability: build.mutation<
        AvailibilityData,
        AvailabilityRequestData
      >({
        query: ({ availability, roomId }) => {
          return {
            url: `/UpdateAvailability${roomId}`,
            body: availability,
            method: "POST",
          };
        },
        invalidatesTags: ["availibility"],
      }),


    };
  },
});

export const {
  useCreateAvailabilityMutation,
  useDeleteAvailabilityMutation,
  useEditAvailabilityMutation,
} = roomCalendarApi;
