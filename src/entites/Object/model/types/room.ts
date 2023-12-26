export interface RoomResponse {
  id: number;
  anObjectId: number;
  categoryType: number;
  anObjectRoomDescription: AnObjectRoomDescription;
  anObjectRoomBeds: AnObjectRoomBed[];
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
  anObjectRoomBookingSettings: AnObjectRoomBookingSettings;
  anObjectRoomPostingRule: AnObjectRoomPostingRule;
  anObjectRoomImages: AnObjectRoomImages[];
  description: string;
  maximumGuests: number;
}
interface AnObjectRoomImages {
  id: number;
  fileName: string;
}
interface AnObjectRoomPostingRule {
  id: number;
  possibleWithChildren: boolean;
  childsAge: number;
  petsAllowed: boolean;
  smokingAllowed: boolean;
  partiesAllowed: boolean;
}
interface AnObjectRoomBookingSettings {
  id: number;
  howCanBook: number;
  checkInAfter: string;
  checkOutAfter: string;
  reportingDocuments: number;
  fromBookingToCheckIn: number;
  instantBookingStart: number;
  prepaymentPercent: number;
}
interface AnObjectRoomForChildren {
  id: number;
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
interface AnObjectRoomInfrastructureLeisureNearby {
  id: number;
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
interface AnObjectRoomOutsideRelaxation {
  id: number;
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
interface AnObjectRoomIndoorRelaxation {
  id: number;
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
interface AnObjectRoomBathroom {
  id: number;
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
interface AnObjectRoomKitchenEquipment {
  id: number;
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
interface AnObjectRoomEquipment {
  id: number;
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
interface AnObjectRoomAvailability {
  id: number;
  contactlessCheckinPossible: boolean;
  disabledAccess: boolean;
  elevator: boolean;
  locatedOnTheFirstFloor: boolean;
  toiletWithGrabBars: boolean;
}
interface AnObjectRoomViewFromWindow {
  id: number;
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
interface AnObjectRoomAmenities {
  id: number;
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
interface AnObjectRoomCleaningFee {
  id: number;
  cleaningFeeType: number;
  amount: number;
}
interface AnObjectRoomInsuranceDeposit {
  id: number;
  amount: number;
}
interface AnObjectRoomBaseCost {
  id: number;
  currencyId: number;
  minimumLengthOfStay: number;
  pricePerDay: number;
  forHowManyGuests: number;
}
interface AnObjectRoomBed {
  id: number;
  anObjectRoomId: number;
  bedType: number;
  count: number;
  isDelete: boolean;
}
interface AnObjectRoomDescription {
  id: number;
  uniqueName: string;
  ownName: string;
  roomNameTypeId: number;
  count: number;
  area: number;
  floorType: number;
  floorsInTheBuilding: number;
  kitchenType: number;
  repairType: number;
  numberOfIsolatedBedroom: number;
}
