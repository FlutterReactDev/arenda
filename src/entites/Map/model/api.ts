import { base2GISApi } from "@shared/api/2GiSApi";
import {
  GISResponse,
  LatLong,
  MarkerArg,
  MarkerResponse,
  SearchObjectData,
} from "./types";

const geocodeApi = base2GISApi.injectEndpoints({
  endpoints(build) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getCoordinateByAddress: build.query<GISResponse, SearchObjectData>({
        query: ({ address, viewpoint1, viewpoint2 }) => {
          return {
            url: `/items?q=${address}&fields=items.point,items.address&type=building&viewpoint1=${viewpoint1.longitude},${viewpoint1.latitude}&viewpoint2=${viewpoint2.longitude},${viewpoint2.latitude}`,
          };
        },
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getObjectByCoordinates: build.query<any, LatLong>({
        query: ({ latitude, longitude }) => ({
          url: `/items/geocode?lon=${longitude}&lat=${latitude}&fields=items.point,items.address&key=demo`,
        }),
      }),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getRegionByAddress: build.query<any, SearchObjectData>({
        query: ({ address, viewpoint1, viewpoint2 }) => ({
          url: `/items?q=${address}&fields=items.point,items.address&viewpoint1=${viewpoint1.longitude},${viewpoint1.latitude}&viewpoint2=${viewpoint2.longitude},${viewpoint2.latitude}`,
        }),
      }),

      getMarkers: build.query<MarkerResponse, MarkerArg>({
        query: ({ map_height, map_width, viewpoint1, viewpoint2 }) => ({
          url: `/markers/clustered`,
          params: {
            map_width,
            map_height,
            point1: viewpoint1,
            point2: viewpoint2,

            locale: "ru_KG",
            type: "adm_div.city,adm_div.district,adm_div.district_area,adm_div.division,adm_div.living_area,adm_div.place,adm_div.region,adm_div.settlement,attraction,branch,building,crossroad,foreign_city,gate,parking,road,route,station,street,coordinates,kilometer_road_sign",

            fields:
              "items.ads,items.name,items.stop_factors,items.reviews,items.schedule,items.context,items.name_ex,items.timezone_offset,items.flags,items.has_exchange,items.temporary_unavailable_atm_services,search_attributes",
            q: "Пожить",
          },
        }),
      }),
    };
  },
});

export const {
  useGetCoordinateByAddressQuery,
  useGetObjectByCoordinatesQuery,
  useGetRegionByAddressQuery,
  useGetMarkersQuery,
} = geocodeApi;
