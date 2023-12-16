export interface ObjectResponse {
  id: number;
  anObjectTypeId: number;
  anObjectPropertyTypeId: number;
  countryId: number;
  regionId: number;
  cityId: number;
  building: string;

  fullAddress: string;
  latitude: number;
  longitude: number;

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

export interface AnObjectFeeAdditionalServiceResponse {
  id: number;
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

export interface AnObjectMealResponse {
  id: number;
  allInclusive: boolean;
  breakfast: number;
  breakfastService: number;
  lunch: number;
  lunchService: number;
  dinner: number;
  dinnerService: number;
}
export interface AnObjectAdditionalComfortResponse {
  id: number;
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
export interface AnObjectDetailResponse {
  id: number;
  yearOfConstruntion: number;
  numberOfRooms: number;
  areaOfTheLand: number;
  checkInAfter: string;
  checkOutAfter: string;
  smokingOnSite: number;
  paymentType: number;
}
