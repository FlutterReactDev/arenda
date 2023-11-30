export interface CreateRoomState {
  anObjectId: number;
  categoryType: number;
  categoryCount: number;
  createRoomForm: {
    anObjectRoomDescription: AnObjectRoomDescription;
    anObjectRoomBed: AnObjectRoomBed;
    anObjectRoomBaseCost: AnObjectRoomBaseCost;
    anObjectRoomInsuranceDeposit: AnObjectRoomInsuranceDeposit;
    anObjectRoomCleaningFee: AnObjectRoomCleaningFee;
    anObjectRoomAmenities: AnObjectRoomAmenities;
    anObjectRoomViewFromWindow: AnObjectRoomViewFromWindow;
    anObjectRoomAvailability: AnObjectRoomAvailability;
    anObjectRoomEquipment: AnObjectRoomEquipment;
    anObjectRoomKitchenEquipment: AnObjectRoomKitchenEquipment;
    anObjectRoomBathroom: AnObjectRoomBathroom;
    anObjectRoomIndoorRelaxation: AnObjectRoomIndoorRelaxation;
    anObjectRoomOutsideRelaxation: AnObjectRoomOutsideRelaxation;
    anObjectRoomInfrastructureLeisureNearby: AnObjectRoomInfrastructureLeisureNearby;
    anObjectRoomForChildren: AnObjectRoomForChildren;
    anObjectRoomImages: AnObjectRoomImage[];
    anObjectRoomPostingRule: AnObjectRoomPostingRule;
    anObjectRoomBookingSettings: AnObjectRoomBookingSettings;
    description: string;
  };
}

export interface CreateRoomType {
  anObjectId: number;
  categoryType: number;
  anObjectRoomDescription: AnObjectRoomDescription;
  anObjectRoomBed: AnObjectRoomBed;
  anObjectRoomBaseCost: AnObjectRoomBaseCost;
  anObjectRoomInsuranceDeposit: AnObjectRoomInsuranceDeposit;
  anObjectRoomCleaningFee: AnObjectRoomCleaningFee;
  anObjectRoomAmenities: AnObjectRoomAmenities;
  anObjectRoomViewFromWindow: AnObjectRoomViewFromWindow;
  anObjectRoomAvailability: AnObjectRoomAvailability;
  anObjectRoomEquipment: AnObjectRoomEquipment;
  anObjectRoomKitchenEquipment: AnObjectRoomKitchenEquipment;
  anObjectRoomBathroom: AnObjectRoomBathroom;
  anObjectRoomIndoorRelaxation: AnObjectRoomIndoorRelaxation;
  anObjectRoomOutsideRelaxation: AnObjectRoomOutsideRelaxation;
  anObjectRoomInfrastructureLeisureNearby: AnObjectRoomInfrastructureLeisureNearby;
  anObjectRoomForChildren: AnObjectRoomForChildren;
  anObjectRoomImages: AnObjectRoomImage[];
  anObjectRoomPostingRule: AnObjectRoomPostingRule;
  anObjectRoomBookingSettings: AnObjectRoomBookingSettings;
  description: string;
}

export enum CleaningFeeType {
  PAID_SEPARATELY = 1,
  INCLUDED = 2,
}

export enum RoomCategory {
  SINGLE = 1,
  DUBLE = 2,
  TWIN = 3,
  TRIPLE = 4,
  QUADRUPLE = 5,
  FAMYILY = 6,
  MIXED = 7,
  APARTMENTS = 8,
  HOUSE = 9,
}

export enum RoomNameType {
  OWN_OPTION = 1,
  STANDART_WIDTH_BATHROOM = 2,
  ECONOMY = 3,
  IMPROVED = 4,
}

export interface AnObjectRoomBaseCost {
  currencyId: number;
  minimumLengthOfStay: number;
  pricePerDay: number;
  forHowManyGuests: number;
}

export interface AnObjectRoomDescription {
  uniqueName: string;
  ownName: string;
  roomNameType: number;
  count: number;
  area: number;
  floor: number;
  floorsInTheBuilding: number;
}

export interface AnObjectRoomBed {
  maximumGuests: number;
  beds: BedTypes[];
}

export interface BedTypes {
  bedType: number;
  count: number;
}

export interface AnObjectRoomInsuranceDeposit {
  amount: number;
}

export interface AnObjectRoomCleaningFee {
  cleaningFeeType: number;
  amount: number;
}

export interface AnObjectRoomAmenities {
  airConditioner: boolean;
  balcony: boolean;
  bath: boolean;
  toiletries: boolean;
  safe: boolean;
  tv: boolean;
  electricKettle: boolean;
  hairDryer: boolean;
  jacuzzi: boolean;
  microwave: boolean;
}

export interface AnObjectRoomViewFromWindow {
  onTheSea: boolean;
  toTheMountains: boolean;
  toTheCity: boolean;
  toTheRiver: boolean;
  toTheLake: boolean;
  toTheForest: boolean;
  toThePark: boolean;
  outside: boolean;
  intoTheYard: boolean;
  toThePool: boolean;
  toTheAttraction: boolean;
  toTheGarden: boolean;
}

export interface AnObjectRoomAvailability {
  contactlessCheckinPossible: boolean;
  disabledAccess: boolean;
  elevator: boolean;
  locatedOnTheFirstFloor: boolean;
  toiletWithGrabBars: boolean;
}

export interface AnObjectRoomEquipment {
  balcony: boolean;
  wirelessInternetWiFi: boolean;
  fan: boolean;
  pool: boolean;
  waterHeater: boolean;
  gasWaterHeater: boolean;
  wardrobe: boolean;
  seatingArea: boolean;
  woodParquetFloor: boolean;
  jacuzzi: boolean;
  sofa: boolean;
  sofaBed: boolean;
  intercom: boolean;
  soundproofing: boolean;
  fireplace: boolean;
  carpetCovering: boolean;
  airConditioner: boolean;
  steelDoor: boolean;
  mosquitoNet: boolean;
  heater: boolean;
  electricHeatedBlankets: boolean;
  personalComputer: boolean;
  tileMarbleFloor: boolean;
  wiredInternet: boolean;
  desktop: boolean;
  foldingBed: boolean;
  safe: boolean;
  washingMachine: boolean;
  clothesDryer: boolean;
  dryer: boolean;
  telephone: boolean;
  ironWithIroningBoard: boolean;
  centralHeating: boolean;
  cleaners: boolean;
  closet: boolean;
  attic: boolean;
  laminate: boolean;
  linoleum: boolean;
  coffeeTable: boolean;
  vacuumCleaner: boolean;
  clothesHanger: boolean;
  beachTowels: boolean;
  skiSnowboardStorage: boolean;
  blackoutCurtains: boolean;
}

export interface AnObjectRoomKitchenEquipment {
  barCounter: boolean;
  blender: boolean;
  gasStove: boolean;
  oven: boolean;
  coffeeMaker: boolean;
  coffeeMachine: boolean;
  kitchenSet: boolean;
  microwave: boolean;
  miniBar: boolean;
  freezer: boolean;
  multicooker: boolean;
  dinnerTable: boolean;
  dishesAndAccessories: boolean;
  dishwasher: boolean;
  cutlery: boolean;
  toaster: boolean;
  turkForMakingCoffee: boolean;
  waterFilter: boolean;
  fridge: boolean;
  electricKettle: boolean;
  electricStove: boolean;
}
export interface AnObjectRoomBathroom {
  numberOfBathroomsWithToilet: number;
  numberOfBathroomsWithOutToilet: number;
  numberOfSeparateToilets: number;
  bidet: boolean;
  bath: boolean;
  hygienicShower: boolean;
  additionalBathroom: boolean;
  additionalToilet: boolean;
  shower: boolean;
  sharedBathroom: boolean;
  sharedToilet: boolean;
  towels: boolean;
  sauna: boolean;
  slippers: boolean;
  toiletries: boolean;
  hairDryer: boolean;
  robe: boolean;
  sharedShowerRoom: boolean;
}

export interface AnObjectRoomIndoorRelaxation {
  billiards: boolean;
  gameConsole: boolean;
  cableTV: boolean;
  books: boolean;
  musicCenter: boolean;
  boardGames: boolean;
  tableTennis: boolean;
  laptop: boolean;
  radio: boolean;
  satelliteTV: boolean;
  tv: boolean;
  terrestrialTV: boolean;
  payTVChannels: boolean;
  smartTV: boolean;
}

export interface AnObjectRoomOutsideRelaxation {
  bathhouseOnSide: boolean;
  alcove: boolean;
  veranda: boolean;
  hammock: boolean;
  garage: boolean;
  babySwing: boolean;
  playground: boolean;
  boat: boolean;
  barbecueGrill: boolean;
  outdoorFurniture: boolean;
  outdoorDiningArea: boolean;
  protectedArea: boolean;
  parking: boolean;
  patio: boolean;
  beachUmbrella: boolean;
  barbecueSupplies: boolean;
  gardenFurniture: boolean;
  gym: boolean;
  terrace: boolean;
  footballField: boolean;
  sunLoungers: boolean;
}
export interface AnObjectRoomInfrastructureLeisureNearby {
  hotSprings: boolean;
  spaCenter: boolean;
  mountaineering: boolean;
  bathhouseOffSite: boolean;
  billiardClub: boolean;
  bowling: boolean;
  horsebackRiding: boolean;
  waterSports: boolean;
  golf: boolean;
  skiing: boolean;
  snowmobiling: boolean;
  housingIsInPrivateSector: boolean;
  zoo: boolean;
  iceRink: boolean;
  cinema: boolean;
  forest: boolean;
  nightClub: boolean;
  hunting: boolean;
  amusementPark: boolean;
  bicyclesForRent: boolean;
  rollerSkateRental: boolean;
  pondLakeNearby: boolean;
  fishing: boolean;
  theater: boolean;
  tennisCourt: boolean;
  yachtClub: boolean;
}
export interface AnObjectRoomForChildren {
  highChairForChild: boolean;
  childrensPotty: boolean;
  crib: boolean;
  windowProtection: boolean;
  gamesToysForChildren: boolean;
  playpenBed: boolean;
  changingTable: boolean;
  chairForBabies: boolean;
  protectiveCoversOnSockets: boolean;
}

export interface AnObjectRoomImage {
  id: number;
  fileName: string;
}
export interface AnObjectRoomPostingRule {
  possibleWithChildren: boolean;
  childsAge: number;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  partiesAllowed: boolean;
}

export interface AnObjectRoomBookingSettings {
  howCanBook: number;
  checkInAfter: string;
  checkOutAfter: string;
  reportingDocuments: number;
  fromBookingToCheckIn: number;
  instantBookingStart: number;
  prepaymentPercent: number;
}
