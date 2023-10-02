import { base2GISApi } from "@shared/api/2GiSApi";

const geocodeApi = base2GISApi.injectEndpoints({
  endpoints(build) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getCoordinateByAddress: build.query<any, string>({
        query: (address) => ({
          url: `/suggests?q=${address}&fields=items.point,items.address&type=building,adm_div.city&viewpoint1=77.17534951496107,42.64697794798821&viewpoint2=77.17686189669992,42.64364062175027&key=demo`,
        }),
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getObjectByCoordinates: build.query<any, number[]>({
        query: (coordinates) => ({
          url: `/items/geocode?lon=${coordinates[0]}&lat=${coordinates[1]}&fields=items.point,items.address&key=demo`,
        }),
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getRegionByAddress: build.query<any, string>({
        query: (address) => ({
          url: `/suggests?q=${address}&fields=items.point,items.address&viewpoint1=77.17534951496107,42.64697794798821&viewpoint2=77.17686189669992,42.64364062175027&key=demo`,
        }),
      }),
    };
  },
});

export const {
  useGetCoordinateByAddressQuery,
  useGetObjectByCoordinatesQuery,
  useGetRegionByAddressQuery,
} = geocodeApi;
