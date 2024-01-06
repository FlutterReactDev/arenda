import { ObjectType } from "@entites/ObjectType/model/types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { QueryReturnValue } from "@reduxjs/toolkit/dist/query/baseQueryTypes";
import { base2GISPhotoApi2V } from "@shared/api/2GISPhotoApi2V";
import { base2GISPhotoApi3V } from "@shared/api/2GISPhotoApi3V";
import { base2GISProductApi } from "@shared/api/2GISProductApi";
import { base2GISApi } from "@shared/api/2GiSApi";
import { baseApiWithReAuth } from "@shared/api/rtk";
import { OBJECT_TYPE } from "@shared/constants/objectType";
import { CreateObjectType } from "../types/createObjectTypes";
import { CreateRoomType } from "../types/createRoomTypes";
import { ObjectResponse } from "../types/object";
import { ObjectDetail } from "../types/objectDetail";
import { ObjectProduct } from "../types/objectProduct";
import { ObjectWithRooms } from "../types/objectWithRooms";
import { ObjectPhoto } from "../types/photo";
import { ObjectPhotosResponse } from "../types/photos";
import { RoomResponse } from "../types/room";
import { ObjectPropertyType } from "@entites/ObjectTypeProperty/model/types";

const objectApi = baseApiWithReAuth.injectEndpoints({
  endpoints: (build) => ({
    createObject: build.mutation<ObjectResponse, CreateObjectType>({
      query: (data) => ({
        url: "/Create",
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["object"],
    }),

    createRoom: build.mutation<unknown, CreateRoomType>({
      query: (data) => ({
        url: "/CreateRoom",
        body: data,
        method: "POST",
      }),
    }),

    createRooms: build.mutation<unknown, CreateRoomType[]>({
      query: (data) => ({
        url: "/CreateRooms",
        body: data,
        method: "POST",
      }),
    }),

    deleteObject: build.mutation<void, number>({
      query: (anObjectId) => ({
        url: "/Delete",
        method: "DELETE",
        params: {
          anObjectId,
        },
      }),

      invalidatesTags: ["object"],
    }),

    getAllObjects: build.query<ObjectResponse[], void>({
      query: () => ({
        url: "/GetAll",
      }),
      providesTags: ["object"],
    }),

    getObjectById: build.query<ObjectResponse, string>({
      query: (id) => ({
        url: "/Get/" + id,
      }),
      providesTags: ["object"],
    }),

    editObject: build.mutation<
      void,
      {
        anObjectId: number;
        data: ObjectResponse;
      }
    >({
      query: ({ anObjectId, data }) => ({
        url: "/Edit",
        body: data,
        params: {
          anObjectId,
        },
        method: "PUT",
      }),
      invalidatesTags: ["object"],
    }),

    editRoom: build.mutation<
      void,
      {
        roomId: string;
        data: RoomResponse;
      }
    >({
      query: ({ data, roomId }) => ({
        url: "/UpdateRoom/" + roomId,
        body: data,
        method: "POST",
      }),
      invalidatesTags: ["room"],
    }),

    getRoomById: build.query<RoomResponse, string>({
      query: (roomId) => ({
        url: "/GetRoomById/" + roomId,
      }),
      providesTags: ["room"],
    }),
    getObjectRooms: build.query<RoomResponse[], number>({
      query: (objectId) => ({
        url: "/GetRoomsByAnObjectId/" + objectId,
      }),
      providesTags: ["room"],
    }),

    getObjectsWithRooms: build.query<ObjectWithRooms[], void>({
      async queryFn(arg, api, extraOptions, baseQuery) {
        try {
          const result: ObjectWithRooms[] = [];
          const objectTypes = (await baseQuery(
            "/AllObjectTypes"
          )) as QueryReturnValue<ObjectType[], FetchBaseQueryError, void>;

          const myObjects = (await baseQuery("/GetAll")) as QueryReturnValue<
            ObjectResponse[],
            FetchBaseQueryError,
            void
          >;

          const promises = myObjects.data?.map(
            async ({
              id: myObjectsId,
              anObjectTypeId,
              anObjectPropertyTypeId,
            }) => {
              const objectType = objectTypes.data?.filter(({ id }) => {
                return id == anObjectTypeId;
              })[0].objectType;
              const objectPropertyType = (await baseQuery(
                `/GetById/${anObjectTypeId}`
              )) as QueryReturnValue<
                ObjectPropertyType[],
                FetchBaseQueryError,
                void
              >;
              const rooms = (await baseQuery(
                `/GetRoomsByAnObjectId/${myObjectsId}`
              )) as QueryReturnValue<RoomResponse[], FetchBaseQueryError, void>;

              result.push({
                ...myObjects.data.filter(({ id }) => {
                  return id == myObjectsId;
                })[0],
                rooms: rooms.data || [],
                isHotel: objectType == OBJECT_TYPE.HOTEL ? true : false,
                objectPropertyName:
                  objectPropertyType.data?.filter(
                    ({ id }) => id == anObjectPropertyTypeId
                  )[0].name || "",
              });
            }
          );
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          await Promise.all(promises);

          return {
            data: result,
          };
        } catch (error) {
          return { error: { error: `UNKNOWN_ERROR`, status: `CUSTOM_ERROR` } };
        }
      },
      providesTags: ["object", "room"],
    }),
  }),
});
const objectDetailApi = base2GISApi.injectEndpoints({
  endpoints: (build) => ({
    get2GISObjectInfo: build.query<ObjectDetail, string | string[]>({
      query: (objectId) => ({
        url: "/items/byid",
        params: {
          id: Array.isArray(objectId) ? objectId.join(",") : objectId,
          fields:
            "items.locale,items.flags,search_attributes,items.adm_div,items.city_alias,items.region_id,items.segment_id,items.reviews,items.point,request_type,context_rubrics,query_context,items.links,items.name_ex,items.name_back,items.org,items.group,items.dates,items.external_content,items.contact_groups,items.comment,items.ads.options,items.email_for_sending.allowed,items.stat,items.stop_factors,items.description,items.geometry.centroid,items.geometry.selection,items.geometry.style,items.timezone_offset,items.context,items.level_count,items.address,items.is_paid,items.access,items.access_comment,items.for_trucks,items.is_incentive,items.paving_type,items.capacity,items.schedule,items.floors,ad,items.rubrics,items.routes,items.platforms,items.directions,items.barrier,items.reply_rate,items.purpose,items.purpose_code,items.attribute_groups,items.route_logo,items.has_goods,items.has_stories,items.has_apartments_info,items.has_pinned_goods,items.has_realty,items.has_exchange,items.has_payments,items.has_dynamic_congestion,items.is_promoted,items.congestion,items.delivery,items.order_with_cart,search_type,items.has_discount,items.metarubrics,items.detailed_subtype,items.temporary_unavailable_atm_services,items.poi_category,items.structure_info.material,items.structure_info.floor_type,items.structure_info.gas_type,items.structure_info.year_of_construction,items.structure_info.elevators_count,items.structure_info.is_in_emergency_state,items.structure_info.project_type",
        },
      }),
    }),

    get2GISObjectsInfo: build.query<
      ObjectDetail,
      {
        viewpoint1?: string;
        viewpoint2?: string;
        map_width?: number;
        map_height?: number;
        pageSize: number;
        page: number;
      }
    >({
      query: ({ viewpoint1, viewpoint2, page, pageSize }) => {
        return {
          url: "/items",
          params: {
            fields:
              "items.locale,items.flags,search_attributes,items.adm_div,items.city_alias,items.region_id,items.segment_id,items.reviews,items.point,request_type,context_rubrics,query_context,items.links,items.name_ex,items.name_back,items.org,items.group,items.dates,items.external_content,items.contact_groups,items.comment,items.ads.options,items.email_for_sending.allowed,items.stat,items.stop_factors,items.description,items.geometry.centroid,items.geometry.selection,items.geometry.style,items.timezone_offset,items.context,items.level_count,items.address,items.is_paid,items.access,items.access_comment,items.for_trucks,items.is_incentive,items.paving_type,items.capacity,items.schedule,items.floors,ad,items.rubrics,items.routes,items.platforms,items.directions,items.barrier,items.reply_rate,items.purpose,items.purpose_code,items.attribute_groups,items.route_logo,items.has_goods,items.has_stories,items.has_apartments_info,items.has_pinned_goods,items.has_realty,items.has_exchange,items.has_payments,items.has_dynamic_congestion,items.is_promoted,items.congestion,items.delivery,items.order_with_cart,search_type,items.has_discount,items.metarubrics,items.detailed_subtype,items.temporary_unavailable_atm_services,items.poi_category,items.structure_info.material,items.structure_info.floor_type,items.structure_info.gas_type,items.structure_info.year_of_construction,items.structure_info.elevators_count,items.structure_info.is_in_emergency_state,items.structure_info.project_type",
            type: "adm_div.city,adm_div.district,adm_div.district_area,adm_div.division,adm_div.living_area,adm_div.place,adm_div.region,adm_div.settlement,attraction,branch,building,crossroad,foreign_city,gate,parking,road,route,station,street,coordinates,kilometer_road_sign",
            page_size: pageSize,
            page,

            is_viewport_change: true,
            ...(viewpoint1 && {
              point1: viewpoint1,
            }),
            ...(viewpoint2 && {
              point2: viewpoint2,
            }),
            q: "Пожить",
          },
        };
      },
    }),
  }),
});
const objectPhotoApi3V = base2GISPhotoApi3V.injectEndpoints({
  endpoints: (build) => ({
    getObjectImage: build.query<ObjectPhoto, string>({
      query: (objectId) => ({
        url: `/objects/${objectId}/albums/owner/photos`,
      }),
    }),
  }),
});
const objectPhotoApi2V = base2GISPhotoApi2V.injectEndpoints({
  endpoints: (build) => ({
    getObjectsImages: build.query<ObjectPhotosResponse, string[]>({
      query: (objectIds) => ({
        url: `/photo/get/light`,
        params: {
          preview_size: "656x340,328x170,232x232,176x176,116x116,88x88",
          size: 10,
          object_ids: objectIds.join(","),
        },
      }),
    }),
  }),
});
const objectProductApi = base2GISProductApi.injectEndpoints({
  endpoints: (build) => ({
    getObjectProduct: build.query<ObjectProduct, string>({
      query: (objectId) => {
        return {
          url: `/items_by_branch?q=&locale=ru_KG&feature_config=categories_without_fake_first_level,range_price_type_supported,from_price_type_supported`,
          params: {
            branch_id: objectId,
          },
        };
      },
    }),
  }),
});

export const {
  useCreateObjectMutation,
  useCreateRoomMutation,
  useCreateRoomsMutation,
  useGetAllObjectsQuery,
  useGetObjectByIdQuery,
  useEditObjectMutation,
  useDeleteObjectMutation,
  useGetRoomByIdQuery,
  useEditRoomMutation,
  useGetObjectRoomsQuery,
  useGetObjectsWithRoomsQuery,
} = objectApi;
export const { useGetObjectImageQuery } = objectPhotoApi3V;
export const { useGetObjectProductQuery } = objectProductApi;
export const { useGet2GISObjectInfoQuery, useGet2GISObjectsInfoQuery } =
  objectDetailApi;
export const { useGetObjectsImagesQuery } = objectPhotoApi2V;
