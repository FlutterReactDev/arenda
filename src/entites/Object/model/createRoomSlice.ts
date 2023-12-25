import { createSlice } from "@reduxjs/toolkit";
import { CleaningFeeType, CreateRoomState } from "./types/createRoomTypes";

const initialState = {
  anObjectId: 1071,
  categoryType: 1,
  categoryCount: 1,
  createRoomForm: {
    anObjectRoomDescription: {
      area: 0,
      count: 1,
      floorType: 1,
      floorsInTheBuilding: 1,
      ownName: "",

      uniqueName: "",
      kitchenType: 1,
      numberOfIsolatedBedroom: 1,
      repairType: 1,
      roomNameTypeId: 1,
    },
    anObjectRoomBeds: [
      {
        anObjectRoomId: 0,
        bedType: 1,
        count: 1,
      },
    ],
    anObjectRoomBathroom: {
      additionalBathroom: false,
      additionalToilet: false,
      bath: false,
      bidet: false,
      hairDryer: false,
      hygienicShower: false,
      numberOfBathroomsWithOutToilet: 0,
      numberOfBathroomsWithToilet: 0,
      numberOfSeparateToilets: 0,
      robe: false,
      sauna: false,
      sharedBathroom: false,
      sharedShowerRoom: false,
      sharedToilet: false,
      shower: false,
      slippers: false,
      toiletries: false,
      towels: false,
    },

    anObjectRoomAmenities: {
      airConditioner: false,
      balcony: false,
      bath: false,
      electricKettle: false,
      hairDryer: false,
      jacuzzi: false,
      microwave: false,
      safe: false,
      toiletries: false,
      tv: false,
    },
    anObjectRoomAvailability: {
      contactlessCheckinPossible: false,
      disabledAccess: false,
      elevator: false,
      locatedOnTheFirstFloor: false,
      toiletWithGrabBars: false,
    },
    anObjectRoomBaseCost: {
      currencyId: 0,
      forHowManyGuests: 1,
      minimumLengthOfStay: 1,
      pricePerDay: 0,
    },
    anObjectRoomCleaningFee: {
      amount: 0,
      cleaningFeeType: CleaningFeeType.INCLUDED,
    },
    anObjectRoomEquipment: {
      airConditioner: false,
      attic: false,
      balcony: false,
      beachTowels: false,
      blackoutCurtains: false,
      carpetCovering: false,
      centralHeating: false,
      cleaners: false,
      closet: false,
      clothesDryer: false,
      clothesHanger: false,
      coffeeTable: false,
      desktop: false,
      dryer: false,
      electricHeatedBlankets: false,
      fan: false,
      fireplace: false,
      foldingBed: false,
      gasWaterHeater: false,
      heater: false,
      intercom: false,
      ironWithIroningBoard: false,
      jacuzzi: false,
      laminate: false,
      linoleum: false,
      mosquitoNet: false,
      personalComputer: false,
      pool: false,
      safe: false,
      seatingArea: false,
      skiSnowboardStorage: false,
      sofa: false,
      sofaBed: false,
      soundproofing: false,
      steelDoor: false,
      telephone: false,
      tileMarbleFloor: false,
      vacuumCleaner: false,
      wardrobe: false,
      washingMachine: false,
      waterHeater: false,
      wiredInternet: false,
      wirelessInternetWiFi: false,
      woodParquetFloor: false,
    },
    anObjectRoomForChildren: {
      chairForBabies: false,
      changingTable: false,
      childrensPotty: false,
      crib: false,
      gamesToysForChildren: false,
      highChairForChild: false,
      playpenBed: false,
      protectiveCoversOnSockets: false,
      windowProtection: false,
    },
    anObjectRoomImages: [
      {
        fileName: "",
        id: 0,
      },
    ],
    anObjectRoomIndoorRelaxation: {
      billiards: false,
      gameConsole: false,
      cableTV: false,
      books: false,
      musicCenter: false,
      boardGames: false,
      tableTennis: false,
      laptop: false,
      radio: false,
      satelliteTV: false,
      tv: false,
      terrestrialTV: false,
      payTVChannels: false,
      smartTV: false,
    },
    anObjectRoomInfrastructureLeisureNearby: {
      hotSprings: false,
      spaCenter: false,
      mountaineering: false,
      bathhouseOffSite: false,
      billiardClub: false,
      bowling: false,
      horsebackRiding: false,
      waterSports: false,
      golf: false,
      skiing: false,
      snowmobiling: false,
      housingIsInPrivateSector: false,
      zoo: false,
      iceRink: false,
      cinema: false,
      forest: false,
      nightClub: false,
      hunting: false,
      amusementPark: false,
      bicyclesForRent: false,
      rollerSkateRental: false,
      pondLakeNearby: false,
      fishing: false,
      theater: false,
      tennisCourt: false,
      yachtClub: false,
    },
    anObjectRoomInsuranceDeposit: {
      amount: 0,
    },
    anObjectRoomKitchenEquipment: {
      barCounter: false,
      blender: false,
      gasStove: false,
      oven: false,
      coffeeMaker: false,
      coffeeMachine: false,
      kitchenSet: false,
      microwave: false,
      miniBar: false,
      freezer: false,
      multicooker: false,
      dinnerTable: false,
      dishesAndAccessories: false,
      dishwasher: false,
      cutlery: false,
      toaster: false,
      turkForMakingCoffee: false,
      waterFilter: false,
      fridge: false,
      electricKettle: false,
      electricStove: false,
    },
    anObjectRoomOutsideRelaxation: {
      bathhouseOnSide: false,
      alcove: false,
      veranda: false,
      hammock: false,
      garage: false,
      babySwing: false,
      playground: false,
      boat: false,
      barbecueGrill: false,
      outdoorFurniture: false,
      outdoorDiningArea: false,
      protectedArea: false,
      parking: false,
      patio: false,
      beachUmbrella: false,
      barbecueSupplies: false,
      gardenFurniture: false,
      gym: false,
      terrace: false,
      footballField: false,
      sunLoungers: false,
    },
    anObjectRoomViewFromWindow: {
      onTheSea: false,
      toTheMountains: false,
      toTheCity: false,
      toTheRiver: false,
      toTheLake: false,
      toTheForest: false,
      toThePark: false,
      outside: false,
      intoTheYard: false,
      toThePool: false,
      toTheAttraction: false,
      toTheGarden: false,
    },
    anObjectRoomBookingSettings: {
      checkInAfter: "12:00",
      checkOutAfter: "14:00",
      fromBookingToCheckIn: 1,
      howCanBook: 1,
      instantBookingStart: 1,
      prepaymentPercent: 10,
      reportingDocuments: 1,
    },

    anObjectRoomPostingRule: {
      childsAge: 0,
      partiesAllowed: true,
      petsAllowed: true,
      possibleWithChildren: true,
      smokingAllowed: true,
    },

    description: "",
    maximumGuests: 0,
  },
} as CreateRoomState;
const createRoomSlice = createSlice({
  name: "createRoomSlice",
  initialState: initialState,
  reducers: {
    setAnObjectRoomDescription(state, action) {
      state.createRoomForm.anObjectRoomDescription = {
        ...state.createRoomForm.anObjectRoomDescription,
        ...action.payload,
      };
    },

    setAnObjectRoomBeds(state, action) {
      state.createRoomForm.anObjectRoomBeds = action.payload;
    },

    setAnObjectRoomBaseCost(state, action) {
      state.createRoomForm.anObjectRoomBaseCost = {
        ...state.createRoomForm.anObjectRoomBaseCost,
        ...action.payload,
      };
    },

    setAnObjectRoomInsuranceDeposit(state, action) {
      state.createRoomForm.anObjectRoomInsuranceDeposit = {
        ...state.createRoomForm.anObjectRoomInsuranceDeposit,
        ...action.payload,
      };
    },

    setAnObjectRoomCleaningFee(state, action) {
      state.createRoomForm.anObjectRoomCleaningFee = {
        ...state.createRoomForm.anObjectRoomCleaningFee,
        ...action.payload,
      };
    },

    setAnObjectRoomAmenities(state, action) {
      state.createRoomForm.anObjectRoomAmenities = {
        ...state.createRoomForm.anObjectRoomAmenities,
        ...action.payload,
      };
    },

    setAnObjectRoomViewFromWindow(state, action) {
      state.createRoomForm.anObjectRoomViewFromWindow = {
        ...state.createRoomForm.anObjectRoomViewFromWindow,
        ...action.payload,
      };
    },

    setAnObjectRoomAvailability(state, action) {
      state.createRoomForm.anObjectRoomAvailability = {
        ...state.createRoomForm.anObjectRoomAvailability,
        ...action.payload,
      };
    },
    setAnObjectRoomEquipment(state, action) {
      state.createRoomForm.anObjectRoomEquipment = {
        ...state.createRoomForm.anObjectRoomEquipment,
        ...action.payload,
      };
    },
    setAnObjectRoomKitchenEquipment(state, action) {
      state.createRoomForm.anObjectRoomKitchenEquipment = {
        ...state.createRoomForm.anObjectRoomKitchenEquipment,
        ...action.payload,
      };
    },
    setAnObjectRoomBathroom(state, action) {
      state.createRoomForm.anObjectRoomBathroom = {
        ...state.createRoomForm.anObjectRoomBathroom,
        ...action.payload,
      };
    },
    setAnObjectRoomIndoorRelaxation(state, action) {
      state.createRoomForm.anObjectRoomIndoorRelaxation = {
        ...state.createRoomForm.anObjectRoomIndoorRelaxation,
        ...action.payload,
      };
    },
    setAnObjectRoomOutsideRelaxation(state, action) {
      state.createRoomForm.anObjectRoomOutsideRelaxation = {
        ...state.createRoomForm.anObjectRoomOutsideRelaxation,
        ...action.payload,
      };
    },
    setAnObjectRoomInfrastructureLeisureNearby(state, action) {
      state.createRoomForm.anObjectRoomInfrastructureLeisureNearby = {
        ...state.createRoomForm.anObjectRoomInfrastructureLeisureNearby,
        ...action.payload,
      };
    },
    setAnObjectRoomForChildren(state, action) {
      state.createRoomForm.anObjectRoomForChildren = {
        ...state.createRoomForm.anObjectRoomForChildren,
        ...action.payload,
      };
    },

    setAnObjectRoomImages(state, action) {
      state.createRoomForm.anObjectRoomImages = {
        ...state.createRoomForm.anObjectRoomImages,
        ...action.payload,
      };
    },
    setAnObjectRoomBookingSettings(state, action) {
      state.createRoomForm.anObjectRoomBookingSettings = {
        ...state.createRoomForm.anObjectRoomBookingSettings,
        ...action.payload,
      };
    },
    setAnObjectRoomPostingRule(state, action) {
      state.createRoomForm.anObjectRoomPostingRule = {
        ...state.createRoomForm.anObjectRoomPostingRule,
        ...action.payload,
      };
    },
    setDescription(state, action) {
      state.createRoomForm.description = action.payload;
    },
    clearForm(state) {
      state.createRoomForm = {
        ...initialState.createRoomForm,
      };
    },
    setCategoryType(state, action) {
      state.categoryType = action.payload;
    },
    setCategoryCount(state, action) {
      state.categoryCount = action.payload;
    },
    setAnObjectId(state, action) {
      state.anObjectId = action.payload;
    },
    setAnObjectRoomMaximumGuests(state, action) {
      state.createRoomForm.maximumGuests = action.payload;
    },
  },
});

export const { actions: createRoomAction, reducer: createRoomReducer } =
  createRoomSlice;
