import {
  AnObjectDetailResponse,
  AnObjectAdditionalComfortResponse,
  AnObjectMealResponse,
  AnObjectFeeAdditionalServiceResponse,
} from "@entites/Object";

export interface EditHotelInfo {
  name: string;
  internetAccess: number;
  internetAccessSumm: number;
  parking: number;
  parkingSumm: number;
  rating: number;
  anObjectDetail: AnObjectDetailResponse;
  anObjectAdditionalComfort: AnObjectAdditionalComfortResponse;
  anObjectMeal: AnObjectMealResponse;
  anObjectFeeAdditionalService: AnObjectFeeAdditionalServiceResponse;
}

export interface EditPositionData {
  fullAddress: string;
  latitude: number;
  longitude: number;
}
