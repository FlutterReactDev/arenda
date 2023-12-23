import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { Box, Center, Portal } from "@chakra-ui/react";
import {
  useGetBedTypesQuery,
  useGetCleaningFeeTypesQuery,
  useGetCurrenciesQuery,
  useGetFromBookingToCheckInQuery,
  useGetInstantBookingValidQuery,
  useGetRoomCategoriesQuery,
  useGetRoomNameTypesQuery,
} from "@entites/CommonReference";
import {
  BookingSettingForm,
  CalendarInfoForm,
  CheckInCheckOutForm,
  FacilitiesForm,
  GeneralRoomInformationForm,
  HowGuestBookForm,
  PostingRulesForm,
  PriceForm,
  RoomOptionalServiceForm,
  RoomTypeForm,
  useCreateRoom,
  useCreateRoomsMutation,
} from "@entites/Object";
import { FormStepper } from "@shared/ui/FormSteppter";
import { PageLoader } from "@shared/ui/PageLoader";
import { Suspense } from "react";
import { useNavigate } from "react-router-dom";

export const CreateRoom = () => {
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
  } = useGetRoomNameTypesQuery("");

  const [createRooms, { isLoading }] = useCreateRoomsMutation();

  const {
    createRoomForm,
    anObjectId,
    categoryType,
    categoryCount,
    setAnObjectRoomBathroom,
    setAnObjectRoomBed,
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

    setCategoryType,
    setCategoryCount,
    clearForm: clearRoomForm,
  } = useCreateRoom();
  const {
    anObjectRoomDescription: {
      area,
      count,
      floor,
      floorsInTheBuilding,
      ownName,
      uniqueName,
      roomNameType,
    },
    anObjectRoomBathroom,
    anObjectRoomBed,
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
  } = createRoomForm;

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
                  const { beds, maximumGuests } = anObjectRoomBed;
                  return (
                    <>
                      {bedTypesIsSuccess && roomNameTypesIsSuccess && (
                        <Suspense fallback={<PageLoader />}>
                          <GeneralRoomInformationForm
                            bedTypes={bedTypes}
                            roomNameTypes={roomNameTypes}
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
                                floor,
                                floorsInTheBuilding,
                                numberOfBathroomsWithToilet,
                                ownName,
                                roomNameType,
                                uniqueName,
                              } = data;
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
                              setAnObjectRoomBed({
                                beds,
                                maximumGuests,
                              });
                              setAnObjectRoomDescription({
                                area,
                                count,
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                //@ts-ignore
                                floor,
                                floorsInTheBuilding,
                                ownName,
                                roomNameType,
                                uniqueName,
                              });
                            }}
                            value={{
                              additionalBathroom,
                              additionalToilet,
                              numberOfBathroomsWithOutToilet,
                              numberOfBathroomsWithToilet,
                              numberOfSeparateToilets,
                              ...othersBathroomForm,
                              area,
                              beds,
                              count,
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              //@ts-ignore
                              floor,
                              floorsInTheBuilding,
                              maximumGuests,
                              ownName,
                              roomNameType,
                              uniqueName,
                            }}
                            {...props}
                          />
                        </Suspense>
                      )}
                      {bedTypesIsLoading && roomNameTypesIsLoading && (
                        <PageLoader />
                      )}
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
              // {
              //   id: "ImageUploadForm",
              //   render(props) {
              //     return (
              //       <Suspense fallback={<PageLoader />}>
              //         <ImageUploadForm
              //           stateValue={files}
              //           changeState={(data) => {
              //             const files = data as { files: File[] };
              //             dispatch(
              //               addObjectStepActions.setForm({
              //                 step: 0,
              //                 screen: 4,
              //                 data: files,
              //               })
              //             );
              //           }}
              //           {...props}
              //         />
              //       </Suspense>
              //     );
              //   },
              // },
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
                              const rooms = Array(categoryCount)
                                .fill(0)
                                .map(() => ({
                                  anObjectId,
                                  anObjectRoomAmenities,
                                  anObjectRoomAvailability,
                                  anObjectRoomBaseCost,
                                  anObjectRoomBathroom,
                                  anObjectRoomBed: {
                                    maximumGuests: 10,
                                    bedType: 1,
                                    count: 1,
                                  },
                                  anObjectRoomCleaningFee: {
                                    amount: cleaningAmount || 0,
                                    cleaningFeeType,
                                  },

                                  anObjectRoomDescription: {
                                    area,
                                    count,
                                    floor,
                                    floorsInTheBuilding,
                                    ownName,
                                    roomNameType: 1,
                                    uniqueName,
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
                                  anObjectRoomInsuranceDeposit: {
                                    amount: depositAmount,
                                  },
                                  anObjectRoomKitchenEquipment,
                                  anObjectRoomOutsideRelaxation,
                                  anObjectRoomViewFromWindow,
                                  categoryType,
                                  anObjectRoomBookingSettings,
                                  anObjectRoomPostingRule,
                                  description,
                                }));
                              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                              //@ts-ignore
                              createRooms(rooms)
                                .unwrap()
                                .then(() => {
                                  navigate(RouteName.ADD_OBJECT);
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
