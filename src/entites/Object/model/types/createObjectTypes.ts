export enum AdditionalServices {
  PAID = 1,
  FREE = 2,
  NOT = 3,
  INCLUDED = 4,
}
export enum InternetAccess {
  PAID = 1,
  FREE = 2,
  ABSENT = 3,
}

export enum Parking {
  PAID = 1,
  FREE = 2,
  ABSENT = 3,
}

export enum FoodType {
  NOT_PROVIDING = 1,
  BUFFET = 2,
  FROM_THE_MENU = 3,
  COMPLEX = 4,
}

export enum MealServiceTypes {
  INCLUDED = 1,
  NOT_INCLUDED = 2,
}

export interface CreateObjectState {
  anObjectTypeId: number;
  anObjectPropertyTypeId: number;
  name: string;
  countryId: number;
  regionId: number;
  cityId: number;
  internetAccess: number;
  internetAccessSumm: number;
  parking: number;
  parkingSumm: number;
  rating: number | undefined;
  fullAddress: string;
  building: string;
  latitude: number;
  longitude: number;
  anObjectDetail: AnObjectDetail;
  anObjectAdditionalComfort: AnObjectAdditionalComfort;
  anObjectMeal: AnObjectMeal;
  anObjectFeeAdditionalService: AnObjectFeeAdditionalService;
  addressData: AddressData;
}

export interface AddressData {
  streetName: string;
  house: string;
}

export interface AnObjectDetail {
  yearOfConstruntion: number;
  numberOfRooms: number;
  areaOfTheLand: number;
  checkInAfter: string;
  checkOutAfter: string;
  smokingOnSite: number;
  paymentType: number;
}

export interface AnObjectAdditionalComfort {
  restaurant: boolean;
  barCounter: boolean;
  sauna: boolean;
  garden: boolean;
  spaCenter: boolean;
  tennisCourt: boolean;
  aquapark: boolean;
  indoorPool: boolean;
  privateBeach: boolean;
  elevator: boolean;
  childrenSwimmingPool: boolean;
  roomDelivery: boolean;
  twentyFourhourFrontDesk: boolean;
  gym: boolean;
  terrace: boolean;
  footballField: boolean;
  golf: boolean;
  openPool: boolean;
  jacuzzi: boolean;
  playground: boolean;
  ramp: boolean;
  laundry: boolean;
}

export interface AnObjectMeal {
  allInclusive: boolean;
  breakfast: number;
  breakfastService: number;
  lunch: number;
  lunchService: number;
  dinner: number;
  dinnerService: number;
}

export interface AnObjectFeeAdditionalService {
  cleaning: number;
  cleaningSum: number;
  bedLinen: number;
  bedLinenSum: number;
  reportingDocuments: number;
  hasTransfer: boolean;
  transferDetails: string;
  detailComment: string;
  objectInAnotherResources: string;
}
