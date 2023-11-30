export interface CreateRoomState {
  createRoomForm: {
    anObjectRoomDescription: AnObjectRoomDescription | undefined;
    anObjectRoomBed: AnObjectRoomBed | undefined;
    anObjectRoomBaseCost: AnObjectRoomBaseCost | undefined;
    anObjectRoomInsuranceDeposit: AnObjectRoomInsuranceDeposit | undefined;
    anObjectRoomCleaningFee: AnObjectRoomCleaningFee | undefined;
    anObjectRoomAmenities: AnObjectRoomAmenities | undefined;
    anObjectRoomViewFromWindow: AnObjectRoomViewFromWindow | undefined;
    anObjectRoomAvailability: AnObjectRoomAvailability | undefined;
    anObjectRoomEquipment: AnObjectRoomEquipment | undefined;
    anObjectRoomKitchenEquipment: AnObjectRoomKitchenEquipment | undefined;
    anObjectRoomBathroom: AnObjectRoomBathroom | undefined;
    anObjectRoomIndoorRelaxation: AnObjectRoomIndoorRelaxation | undefined;
    anObjectRoomOutsideRelaxation: AnObjectRoomOutsideRelaxation | undefined;
    anObjectRoomInfrastructureLeisureNearby:
      | AnObjectRoomInfrastructureLeisureNearby
      | undefined;
    anObjectRoomForChildren: AnObjectRoomForChildren | undefined;
    anObjectRoomImages: AnObjectRoomImage | undefined;
    description: string | undefined;
  };
}

interface AnObjectRoomBaseCost {
  currencyId: number;
  minimumLengthOfStay: number;
  pricePerDay: number;
  forHowManyGuests: number;
}

interface AnObjectRoomDescription {
  uniqueName: string;
  ownName: string;
  roomNameType: number;
  count: number;
  area: number;
  floor: number;
  floorsInTheBuilding: number;
}

interface AnObjectRoomBed {
  maximumGuests: number;
  beds: BedTypes[];
}

interface BedTypes {
  type: number;
  count: number;
}

interface AnObjectRoomBaseCost {
  currencyId: number;
  minimumLengthOfStay: number;
  pricePerDay: number;
  forHowManyGuests: number;
}

interface AnObjectRoomInsuranceDeposit {
  amount: number;
}

interface AnObjectRoomCleaningFee {
  cleaningFeeType: number;
  amount: number;
}

interface AnObjectRoomAmenities {
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

interface AnObjectRoomViewFromWindow {
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

interface AnObjectRoomAvailability {
  contactlessCheckinPossible: boolean;
  disabledAccess: boolean;
  elevator: boolean;
  locatedOnTheFirstFloor: boolean;
  toiletWithGrabBars: boolean;
}

interface AnObjectRoomEquipment {
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

interface AnObjectRoomKitchenEquipment {
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
interface AnObjectRoomBathroom {
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

interface AnObjectRoomOutsideRelaxation {
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
interface AnObjectRoomInfrastructureLeisureNearby {
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

interface AnObjectRoomImage {
  id: number;
  fileName: string;
}
