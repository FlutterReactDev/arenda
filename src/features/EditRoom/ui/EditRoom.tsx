import { Stack } from "@chakra-ui/react";
import {
  useGetCurrenciesQuery,
  useGetBedTypesQuery,
  useGetCleaningFeeTypesQuery,
  useGetRoomCategoriesQuery,
  useGetFromBookingToCheckInQuery,
  useGetInstantBookingValidQuery,
  useGetRoomNameTypesQuery,
} from "@entites/CommonReference";
import {
  FormSuspense,
  GeneralRoomInformationForm,
  FacilitiesForm,
  PostingRulesForm,
  CheckInCheckOutForm,
  PriceForm,
  RoomOptionalServiceForm,
} from "@entites/Object";
import { CollapseFormCard } from "@shared/ui/CollapseFormCard";
import { Loader } from "@shared/ui/Loader";

export const EditRoom = () => {
  const {
    data: currencies,
    isSuccess: currenciesIsSuccess,
    isLoading: currenciesIsLoading,
  } = useGetCurrenciesQuery("");

  const {
    data: bedTypes,
    isSuccess: bedTypesIsSuccess,
    isLoading: bedTypesIsLoading,
  } = useGetBedTypesQuery("");

  const {
    data: cleaningFeeTypes,
    isLoading: cleaningFeeTypesIsLoading,
    isSuccess: cleaningFeeTypesIsSuccess,
  } = useGetCleaningFeeTypesQuery("");

  const {
    data: roomCategories,
    isLoading: roomCategoriesIsLoading,
    isSuccess: roomCategoriesIsSuccess,
  } = useGetRoomCategoriesQuery("");
  const {
    data: fromBookingToCheckInOptions,
    isLoading: fromBookingToCheckInIsLoading,
    isSuccess: fromBookingToCheckInIsSuccess,
  } = useGetFromBookingToCheckInQuery("");

  const {
    data: instantBookingValid,
    isSuccess: instantBookingValidIsSuccess,
    isLoading: instantBookingValidIsLoading,
  } = useGetInstantBookingValidQuery("");

  const {
    data: roomNameTypes,
    isLoading: roomNameTypesIsLoading,
    isSuccess: roomNameTypesIsSuccess,
  } = useGetRoomNameTypesQuery("");
  return (
    <Stack>
      <CollapseFormCard
        render={(closeButton) => {
          return (
            <>
              {bedTypesIsSuccess && roomNameTypesIsSuccess && (
                <FormSuspense>
                  <GeneralRoomInformationForm
                    bedTypes={bedTypes}
                    roomNameTypes={roomNameTypes}
                    onChange={() => {}}
                  />
                </FormSuspense>
              )}

              {}
            </>
          );
        }}
        title={""}
      />
      <CollapseFormCard
        title={"Удобства"}
        render={(closeButton) => {
          return (
            <FormSuspense>
              <FacilitiesForm
                value={{
                  roomAmenities: {
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
                  roomAvailability: {
                    contactlessCheckinPossible: false,
                    disabledAccess: false,
                    elevator: false,
                    locatedOnTheFirstFloor: false,
                    toiletWithGrabBars: false,
                  },
                  roomEquipment: {
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
                    safe: false,
                    wirelessInternetWiFi: false,
                    pool: false,
                    waterHeater: false,
                    wardrobe: false,
                    seatingArea: false,
                    woodParquetFloor: false,
                    sofa: false,
                    sofaBed: false,
                    soundproofing: false,
                    steelDoor: false,
                    mosquitoNet: false,
                    personalComputer: false,
                    tileMarbleFloor: false,
                    wiredInternet: false,
                    washingMachine: false,
                    telephone: false,
                    vacuumCleaner: false,
                    skiSnowboardStorage: false,
                  },
                  roomForChildren: {
                    chairForBabies: false,
                    highChairForChild: false,
                    childrensPotty: false,
                    crib: false,
                    windowProtection: false,
                    gamesToysForChildren: false,
                    playpenBed: false,
                    changingTable: false,
                    protectiveCoversOnSockets: false,
                  },
                  roomIndoorRelaxation: {
                    billiards: false,
                    radio: false,
                    tv: false,
                    gameConsole: false,
                    cableTV: false,
                    books: false,
                    musicCenter: false,
                    boardGames: false,
                    tableTennis: false,
                    laptop: false,
                    satelliteTV: false,
                    terrestrialTV: false,
                    payTVChannels: false,
                    smartTV: false,
                  },
                  roomInfrastructureLeisureNearby: {
                    amusementPark: false,
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
                    bicyclesForRent: false,
                    rollerSkateRental: false,
                    pondLakeNearby: false,
                    fishing: false,
                    theater: false,
                    tennisCourt: false,
                    yachtClub: false,
                  },
                  roomKitchenEquipment: {
                    barCounter: false,
                    electricKettle: false,
                    microwave: false,
                    blender: false,
                    gasStove: false,
                    oven: false,
                    coffeeMaker: false,
                    coffeeMachine: false,
                    kitchenSet: false,
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
                    electricStove: false,
                  },
                  roomOutsideRelaxation: {
                    alcove: false,
                    bathhouseOnSide: false,
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
                  roomViewFromWindow: {
                    intoTheYard: false,
                    onTheSea: false,
                    toTheMountains: false,
                    toTheCity: false,
                    toTheRiver: false,
                    toTheLake: false,
                    toTheForest: false,
                    toThePark: false,
                    outside: false,
                    toThePool: false,
                    toTheAttraction: false,
                    toTheGarden: false,
                  },
                }}
                onChange={() => {}}
              />
            </FormSuspense>
          );
        }}
      />
      <CollapseFormCard
        title={"Правила"}
        render={(closeButton) => {
          return (
            <FormSuspense>
              <PostingRulesForm />
            </FormSuspense>
          );
        }}
      />
      <CollapseFormCard
        title={"Заезд/отъезд"}
        render={(closeButton) => {
          return (
            <FormSuspense>
              <CheckInCheckOutForm />
            </FormSuspense>
          );
        }}
      />
      <CollapseFormCard
        title={"Заезд/отъезд"}
        render={(closeButton) => {
          return (
            <FormSuspense>
              <CheckInCheckOutForm />
            </FormSuspense>
          );
        }}
      />
      <CollapseFormCard
        title={"Настройка цены"}
        render={(closeButton) => {
          return (
            <>
              {currenciesIsSuccess && (
                <FormSuspense>
                  <PriceForm currencies={currencies} />
                </FormSuspense>
              )}
              {currenciesIsLoading && <Loader />}
            </>
          );
        }}
      />
      <CollapseFormCard
        title={"Ljgjkybt"}
        render={(closeButton) => {
          return (
            <>
              {cleaningFeeTypesIsSuccess && currenciesIsSuccess && (
                <FormSuspense>
                  <RoomOptionalServiceForm
                    currentCurrencyId={398}
                    currencies={currencies}
                    cleaningFeeTypes={cleaningFeeTypes}
                  />
                </FormSuspense>
              )}
              {cleaningFeeTypesIsLoading && currenciesIsLoading && <Loader />}
            </>
          );
        }}
      />
    </Stack>
  );
};
