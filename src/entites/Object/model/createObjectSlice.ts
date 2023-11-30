import { createSlice } from "@reduxjs/toolkit";
import { CreateObjectState, MealServiceTypes } from "./types/createObjectTypes";

const initialState = {
  anObjectPropertyTypeId: 0,
  anObjectTypeId: 0,
  countryId: 0,
  cityId: 0,
  regionId: 0,

  building: "",
  fullAddress: "",
  longitude: 0,
  latitude: 0,
  name: "",
  addressData: {
    house: "",
    streetName: "",
  },
  internetAccess: 0,
  internetAccessSumm: 0,
  parking: 0,
  parkingSumm: 0,
  rating: undefined,
  anObjectAdditionalComfort: {
    aquapark: false,
    barCounter: false,
    childrenSwimmingPool: false,
    elevator: false,
    footballField: false,
    garden: false,
    golf: false,
    gym: false,
    indoorPool: false,
    jacuzzi: false,
    laundry: false,
    openPool: false,
    playground: false,
    privateBeach: false,
    ramp: false,
    restaurant: false,
    roomDelivery: false,
    sauna: false,
    spaCenter: false,
    tennisCourt: false,
    twentyFourhourFrontDesk: false,
    terrace: false,
  },
  anObjectDetail: {
    areaOfTheLand: 0,
    checkInAfter: "14:00",
    checkOutAfter: "12:00",
    numberOfRooms: 0,
    paymentType: 0,
    smokingOnSite: 0,
    yearOfConstruntion: 0,
  },
  anObjectFeeAdditionalService: {
    bedLinen: 0,
    bedLinenSum: 0,
    cleaning: 0,
    cleaningSum: 0,
    detailComment: "",
    hasTransfer: false,
    objectInAnotherResources: "",
    reportingDocuments: 0,
    transferDetails: "",
  },
  anObjectMeal: {
    allInclusive: false,
    breakfast: 0,
    breakfastService: MealServiceTypes.INCLUDED,
    dinner: 0,
    dinnerService: MealServiceTypes.INCLUDED,
    lunch: 0,
    lunchService: MealServiceTypes.INCLUDED,
  },
} as CreateObjectState;
const createObjectSlice = createSlice({
  initialState,
  name: "createObjectSlice",
  reducers: {
    setAddressData(state, action) {
      state.addressData = action.payload;
    },

    setLocationMap(state, action) {
      state.latitude = action.payload.coordinates[1];
      state.longitude = action.payload.coordinates[0];
      state.fullAddress = action.payload.fullAddress;
    },
    setAnObjectPropertyTypeId(state, action) {
      state.anObjectPropertyTypeId = action.payload;
    },
    setAnObjectTypeId(state, action) {
      state.anObjectTypeId = action.payload;
    },
    setCountryId(state, action) {
      state.countryId = action.payload;
    },
    setRegionId(state, action) {
      state.regionId = action.payload;
    },
    setCityId(state, action) {
      state.cityId = action.payload;
    },
    setAnObjectAdditionalComfort(state, action) {
      state.anObjectAdditionalComfort = action.payload;
    },
    setAnObjectFeeAdditionalService(state, action) {
      state.anObjectFeeAdditionalService = {
        ...state.anObjectFeeAdditionalService,
        ...action.payload,
      };
    },
    setAnObjectMeal(state, action) {
      state.anObjectMeal = action.payload;
    },

    setRating(state, action) {
      state.rating = action.payload;
    },
    setName(state, action) {
      state.name = action.payload;
    },
    setAnObjectDetail(state, action) {
      state.anObjectDetail = action.payload;
    },

    setParking(state, action) {
      state.parking = action.payload;
    },
    setParkingSumm(state, action) {
      state.parkingSumm = action.payload;
    },

    setInternetAccess(state, action) {
      state.internetAccess = action.payload;
    },
    setInternetAccessSumm(state, action) {
      state.internetAccessSumm = action.payload;
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    clearForm(state) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      state = initialState;
    },
  },
});

export const { reducer: createObjectReducer, actions: createObjectAction } =
  createObjectSlice;
