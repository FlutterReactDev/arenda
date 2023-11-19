import { base2GISApi } from "@shared/api/2GiSApi";
import { SearchObjectData } from "./types";

const geocodeApi = base2GISApi.injectEndpoints({
  endpoints(build) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getCoordinateByAddress: build.query<any, SearchObjectData>({
        query: ({ address, viewpoint1, viewpoint2 }) => {
          console.log(address, viewpoint1, viewpoint2);

          return {
            url: `/items?q=${address}&fields=items.point,items.address&type=building&viewpoint1=${viewpoint1.longitude},${viewpoint1.latitude}&viewpoint2=${viewpoint2.longitude},${viewpoint2.latitude}&key=demo`,
          };
        },
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getObjectByCoordinates: build.query<any, number[]>({
        query: (coordinates) => ({
          url: `/items/geocode?lon=${coordinates[0]}&lat=${coordinates[1]}&fields=items.point,items.address&key=demo`,
        }),
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getRegionByAddress: build.query<any, SearchObjectData>({
        query: ({ address, viewpoint1, viewpoint2 }) => ({
          url: `/items?q=${address}&fields=items.point,items.address&viewpoint1=${viewpoint1.longitude},${viewpoint1.latitude}&viewpoint2=${viewpoint2.longitude},${viewpoint2.latitude}&key=demo`,
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
