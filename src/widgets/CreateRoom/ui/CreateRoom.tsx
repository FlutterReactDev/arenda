import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { Box, Center, Portal } from "@chakra-ui/react";
import {
  useGetBedTypesQuery,
  useGetCleaningFeeTypesQuery,
  useGetCurrenciesQuery,
  useGetFromBookingToCheckInQuery,
  useGetInstantBookingValidQuery,
  useGetRoomCategoriesQuery,
  useGetFloorTypeQuery,
  useGetRoomTypeNamesQuery,
} from "@entites/CommonReference";
import {
  BookingSettingForm,
  CalendarInfoForm,
  CheckInCheckOutForm,
  FacilitiesForm,
  GeneralRoomInformationForm,
  HowGuestBookForm,
  ImageUploadForm,
  PostingRulesForm,
  PriceForm,
  RoomOptionalServiceForm,
  RoomTypeForm,
  useCreateRoom,
  useCreateRoomsMutation,
} from "@entites/Object";
import { CreateRoomType } from "@entites/Object/model/types/createRoomTypes";
import { FormStepper } from "@shared/ui/FormSteppter";
import { PageLoader } from "@shared/ui/PageLoader";
import { Suspense, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const CreateRoom = () => {
  const { hotelId } = useParams();
  const navigate = useNavigate();
  const {
    data: currencies,
    isSuccess: currenciesIsSuccess,
    isLoading: currenciesIsLoading,
  } = useGetCurrenciesQuery();

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
  } = useGetRoomTypeNamesQuery(30);

  const {
    data: floorTypes,
    isLoading: floorTypesIsLoading,
    isSuccess: floorTypeIsSuccesss,
  } = useGetFloorTypeQuery();
  const [createRooms, { isLoading }] = useCreateRoomsMutation();

  const {
    createRoomForm,
    anObjectId,
    categoryType,
    categoryCount,
    setAnObjectRoomBathroom,
    setAnObjectRoomBeds,
    setAnObjectRoomDescription,
    setAnObjectRoomEquipment,
    setAnObjectRoomAvailability,
    setAnObjectRoomAmenities,
    setAnObjectRoomForChildren,
    setAnObjectRoomIndoorRelaxation,
    setAnObjectRoomInfrastructureLeisureNearby,
    setAnObjectRoomKitchenEquipment,
    setAnObjectRoomOutsideRelaxation,
    setAnObjectRoomViewFromWindow,
    setAnObjectRoomBaseCost,
    setAnObjectRoomCleaningFee,
    setAnObjectRoomInsuranceDeposit,
    setAnObjectRoomPostingRule,
    setAnObjectRoomBookingSettings,
    setAnObjectId,
    setCategoryType,
    setCategoryCount,
    setAnObjectRoomMaximumGuests,
    clearForm: clearRoomForm,
  } = useCreateRoom();

  const {
    anObjectRoomDescription: {
      area,
      count,
      floorType,
      floorsInTheBuilding,
      ownName,
      uniqueName,
      roomNameTypeId,
    },
    anObjectRoomBathroom,
    anObjectRoomBeds,
    anObjectRoomEquipment,
    anObjectRoomAvailability,
    anObjectRoomAmenities,
    anObjectRoomForChildren,
    anObjectRoomIndoorRelaxation,
    anObjectRoomInfrastructureLeisureNearby,
    anObjectRoomKitchenEquipment,
    anObjectRoomOutsideRelaxation,
    anObjectRoomViewFromWindow,
    anObjectRoomBaseCost,
    anObjectRoomCleaningFee: { amount, cleaningFeeType },
    anObjectRoomInsuranceDeposit,
    description,
    anObjectRoomPostingRule,
    anObjectRoomBookingSettings,
    maximumGuests,
  } = createRoomForm;

  useEffect(() => {
    if (hotelId) {
      setAnObjectId(Number(hotelId));
    }
  }, [hotelId]);
  return (
    <>
      <FormStepper
        forms={[
          {
            stepTitle: "1 шаг",
            stepScreens: [
              {
                id: "RoomCategory",
                render(props) {
                  return (
                    <>
                      {roomCategoriesIsSuccess && (
                        <Suspense fallback={<PageLoader />}>
                          <RoomTypeForm
                            {...props}
                            onChange={(data) => {
                              const { categoryType, count } = data;

                              setCategoryType(categoryType);
                              setCategoryCount(count);
                            }}
                            value={{
                              categoryType,
                              count: categoryCount,
                            }}
                            roomCategories={roomCategories}
                          />
                        </Suspense>
                      )}
                      {roomCategoriesIsLoading && <PageLoader />}
                    </>
                  );
                },
              },
              {
                id: "GeneralRoomInformation",
                render(props) {
                  const {
                    additionalBathroom,
                    additionalToilet,
                    numberOfBathroomsWithOutToilet,
                    numberOfBathroomsWithToilet,
                    numberOfSeparateToilets,
                    ...othersBathroomForm
                  } = anObjectRoomBathroom;

                  return (
                    <>
                      {bedTypesIsSuccess &&
                        roomNameTypesIsSuccess &&
                        floorTypeIsSuccesss && (
                          <Suspense fallback={<PageLoader />}>
                            <GeneralRoomInformationForm
                              bedTypes={bedTypes}
                              roomNameTypes={roomNameTypes}
                              floorTypes={floorTypes}
                              onChange={(data) => {
                                const {
                                  additionalBathroom,
                                  additionalToilet,
                                  numberOfBathroomsWithOutToilet,
                                  numberOfSeparateToilets,
                                  bidet,
                                  bath,
                                  robe,
                                  hygienicShower,
                                  hairDryer,
                                  sauna,
                                  sharedBathroom,
                                  sharedShowerRoom,
                                  sharedToilet,
                                  shower,
                                  slippers,
                                  toiletries,
                                  towels,
                                  beds,
                                  maximumGuests,
                                  area,
                                  count,
                                  floorType,
                                  floorsInTheBuilding,
                                  numberOfBathroomsWithToilet,
                                  ownName,
                                  uniqueName,
                                  roomNameTypeId,
                                } = data;
                                const roomBeds = beds.map(
                                  ({ bedType, count }) => ({
                                    bedType,
                                    count,
                                    anObjectRoomId: 0,
                                  })
                                );
                                setAnObjectRoomBeds(roomBeds);
                                setAnObjectRoomBathroom({
                                  additionalBathroom,
                                  additionalToilet,
                                  bidet,
                                  numberOfBathroomsWithOutToilet,
                                  numberOfBathroomsWithToilet,
                                  numberOfSeparateToilets,
                                  bath,
                                  hairDryer,
                                  hygienicShower,
                                  robe,
                                  sauna,
                                  sharedBathroom,
                                  sharedShowerRoom,
                                  sharedToilet,
                                  shower,
                                  slippers,
                                  toiletries,
                                  towels,
                                });

                                setAnObjectRoomDescription({
                                  area,
                                  count,
                                  floorType,
                                  floorsInTheBuilding,
                                  ownName,
                                  roomNameTypeId,
                                  uniqueName,
                                });
                                setAnObjectRoomMaximumGuests(maximumGuests);
                              }}
                              value={{
                                additionalBathroom,
                                additionalToilet,
                                numberOfBathroomsWithOutToilet,
                                numberOfBathroomsWithToilet,
                                numberOfSeparateToilets,
                                ...othersBathroomForm,
                                area,
                                beds: anObjectRoomBeds,
                                count,
                                floorsInTheBuilding,
                                maximumGuests,
                                ownName,
                                floorType,
                                uniqueName,
                                roomNameTypeId,
                              }}
                              {...props}
                            />
                          </Suspense>
                        )}
                      {floorTypesIsLoading &&
                        bedTypesIsLoading &&
                        roomNameTypesIsLoading && <PageLoader />}
                    </>
                  );
                },
              },
              {
                id: "FacilitiesForm",
                render(props) {
                  return (
                    <Suspense fallback={<PageLoader />}>
                      <FacilitiesForm
                        value={{
                          roomAmenities: { ...anObjectRoomAmenities },
                          roomEquipment: { ...anObjectRoomEquipment },
                          roomForChildren: { ...anObjectRoomForChildren },
                          roomIndoorRelaxation: {
                            ...anObjectRoomIndoorRelaxation,
                          },
                          roomInfrastructureLeisureNearby: {
                            ...anObjectRoomInfrastructureLeisureNearby,
                          },
                          roomKitchenEquipment: {
                            ...anObjectRoomKitchenEquipment,
                          },
                          roomOutsideRelaxation: {
                            ...anObjectRoomOutsideRelaxation,
                          },
                          roomViewFromWindow: {
                            ...anObjectRoomViewFromWindow,
                          },
                          roomAvailability: {
                            ...anObjectRoomAvailability,
                          },
                        }}
                        onChange={({
                          roomAmenities,
                          roomAvailability,
                          roomEquipment,
                          roomForChildren,
                          roomIndoorRelaxation,
                          roomInfrastructureLeisureNearby,
                          roomKitchenEquipment,
                          roomOutsideRelaxation,
                          roomViewFromWindow,
                        }) => {
                          setAnObjectRoomAvailability(roomAvailability);
                          setAnObjectRoomAmenities(roomAmenities);
                          setAnObjectRoomEquipment(roomEquipment);
                          setAnObjectRoomForChildren(roomForChildren);
                          setAnObjectRoomIndoorRelaxation(roomIndoorRelaxation);
                          setAnObjectRoomInfrastructureLeisureNearby(
                            roomInfrastructureLeisureNearby
                          );
                          setAnObjectRoomKitchenEquipment(roomKitchenEquipment);
                          setAnObjectRoomOutsideRelaxation(
                            roomOutsideRelaxation
                          );
                          setAnObjectRoomViewFromWindow(roomViewFromWindow);
                        }}
                        {...props}
                      />
                    </Suspense>
                  );
                },
              },
              {
                id: "ImageUploadForm",
                render(props) {
                  return (
                    <Suspense fallback={<PageLoader />}>
                      <ImageUploadForm {...props} />
                    </Suspense>
                  );
                },
              },
            ],
          },
          {
            stepTitle: "2 шаг",
            stepScreens: [
              {
                id: "PostingRulesForm",
                render(props) {
                  return (
                    <Suspense fallback={<PageLoader />}>
                      <PostingRulesForm
                        value={anObjectRoomPostingRule}
                        onChange={setAnObjectRoomPostingRule}
                        {...props}
                      />
                    </Suspense>
                  );
                },
              },
              {
                id: "CheckInCheckOutForm",
                render(props) {
                  const { checkInAfter, checkOutAfter } =
                    anObjectRoomBookingSettings;
                  return (
                    <Suspense fallback={<PageLoader />}>
                      <CheckInCheckOutForm
                        value={{
                          checkInAfter,
                          checkOutAfter,
                        }}
                        onChange={setAnObjectRoomBookingSettings}
                        {...props}
                      />
                    </Suspense>
                  );
                },
              },
              {
                id: "HowGuestBookForm",
                render(props) {
                  return (
                    <Suspense fallback={<PageLoader />}>
                      <HowGuestBookForm
                        value={{
                          bookingType: "bookInstantly",
                        }}
                        onChange={() => {}}
                        {...props}
                      />
                    </Suspense>
                  );
                },
              },
              {
                id: "BookingSettingForm",
                render(props) {
                  const {
                    prepaymentPercent,
                    instantBookingStart,
                    fromBookingToCheckIn,
                  } = anObjectRoomBookingSettings;
                  return (
                    <>
                      {fromBookingToCheckInIsSuccess &&
                        instantBookingValidIsSuccess && (
                          <Suspense fallback={<PageLoader />}>
                            <BookingSettingForm
                              value={{
                                prepaymentPercent,
                                instantBookingStart,
                                fromBookingToCheckIn,
                              }}
                              fromBookingToCheckIn={fromBookingToCheckInOptions}
                              instantBookingValid={instantBookingValid}
                              onChange={setAnObjectRoomBookingSettings}
                              {...props}
                            />
                          </Suspense>
                        )}
                      {fromBookingToCheckInIsLoading &&
                        instantBookingValidIsLoading && <PageLoader />}
                    </>
                  );
                },
              },
              {
                id: "CalendarInfoForm",
                render(props) {
                  return (
                    <Suspense fallback={<PageLoader />}>
                      <CalendarInfoForm
                        value={{
                          calendarAgree: false,
                        }}
                        onChange={() => {}}
                        {...props}
                      />
                    </Suspense>
                  );
                },
              },
            ],
          },
          {
            stepTitle: "3 шаг",
            stepScreens: [
              {
                id: "PriceForm",
                render(props) {
                  return (
                    <>
                      {currenciesIsSuccess && (
                        <Suspense fallback={<PageLoader />}>
                          <PriceForm
                            onChange={setAnObjectRoomBaseCost}
                            value={anObjectRoomBaseCost}
                            currencies={currencies}
                            {...props}
                          />
                        </Suspense>
                      )}
                      {currenciesIsLoading && <PageLoader />}
                    </>
                  );
                },
              },
              {
                id: "OptionalServiceForm",
                render(props) {
                  const { currencyId } = anObjectRoomBaseCost;
                  return (
                    <>
                      {cleaningFeeTypesIsSuccess && currenciesIsSuccess && (
                        <Suspense fallback={<PageLoader />}>
                          <RoomOptionalServiceForm
                            value={{
                              cleaningFeeType,
                              cleaningAmount: amount,
                              depositAmount:
                                anObjectRoomInsuranceDeposit.amount,
                            }}
                            currentCurrencyId={currencyId}
                            currencies={currencies}
                            onChange={({
                              cleaningFeeType,
                              cleaningAmount,
                              depositAmount,
                            }) => {
                              setAnObjectRoomCleaningFee({
                                amount: cleaningAmount,
                                cleaningFeeType: cleaningFeeType,
                              });
                              setAnObjectRoomInsuranceDeposit({
                                amount: depositAmount,
                              });
                              const rooms: CreateRoomType[] = Array(
                                categoryCount
                              )
                                .fill(0)
                                .map(() => ({
                                  anObjectId,
                                  anObjectRoomAmenities,
                                  anObjectRoomAvailability,
                                  anObjectRoomBaseCost,
                                  anObjectRoomBathroom,
                                  anObjectRoomBeds,
                                  anObjectRoomCleaningFee: {
                                    amount: cleaningAmount || 0,
                                    cleaningFeeType,
                                  },

                                  anObjectRoomDescription: {
                                    area,
                                    count,
                                    floorType,
                                    floorsInTheBuilding,
                                    ownName,
                                    roomNameTypeId,
                                    uniqueName,
                                    kitchenType: 1,
                                    repairType: 1,
                                    numberOfIsolatedBedroom: 1,
                                  },
                                  anObjectRoomEquipment,
                                  anObjectRoomForChildren,
                                  anObjectRoomImages: [
                                    {
                                      fileName: "asdasd",
                                      id: 0,
                                    },
                                  ],
                                  anObjectRoomIndoorRelaxation,
                                  anObjectRoomInfrastructureLeisureNearby,
                                  anObjectRoomInsuranceDeposit,
                                  anObjectRoomKitchenEquipment,
                                  anObjectRoomOutsideRelaxation,
                                  anObjectRoomViewFromWindow,
                                  categoryType,
                                  description,
                                  anObjectRoomBookingSettings,
                                  anObjectRoomPostingRule,
                                  maximumGuests,
                                }));

                              createRooms(rooms)
                                .unwrap()
                                .then(() => {
                                  navigate(RouteName.MY_OBJECTS);
                                  clearRoomForm();
                                });
                            }}
                            cleaningFeeTypes={cleaningFeeTypes}
                            {...props}
                          />
                        </Suspense>
                      )}
                      {cleaningFeeTypesIsLoading && currenciesIsLoading && (
                        <PageLoader />
                      )}
                    </>
                  );
                },
              },
            ],
          },
        ]}
      />
      {isLoading && (
        <Portal>
          <Box
            pos={"fixed"}
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgColor={"blackAlpha.500"}
          >
            <Center w="full" h="full">
              <PageLoader />
            </Center>
          </Box>
        </Portal>
      )}
    </>
  );
};
