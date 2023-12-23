import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { Box, Button, Center, HStack } from "@chakra-ui/react";
import {
  useGetBedTypesQuery,
  useGetCleaningFeeTypesQuery,
  useGetCurrenciesQuery,
  useGetFromBookingToCheckInQuery,
  useGetInstantBookingValidQuery,
} from "@entites/CommonReference";
import {
  AddressForm,
  BookingSettingForm,
  CalendarInfoForm,
  CheckInCheckOutForm,
  FacilitiesForm,
  GeneralInformationForm,
  HeadingForm,
  HowGuestBookForm,
  OptionalServiceForm,
  PostingRulesForm,
  PriceForm,
  SelectLocationMapForm,
  useCreateRoom,
  useCreateRoomMutation,
} from "@entites/Object";
import { GeneralInformationSchemaType } from "@entites/Object/model/schemas/generalInformationSchema";
import { useCreateObject } from "@entites/Object/model/useCreateObject";
import { useAddObject } from "@features/SelectLocationForm";
import { FormStepper } from "@shared/ui/FormSteppter";
import { PageLoader } from "@shared/ui/PageLoader";
import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CreateObject = () => {
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

  const [createRoom, { isLoading }] = useCreateRoomMutation();
  const {
    objectFormData: { city, country, objectType, objectTypeProperty, region },
  } = useAddObject();
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
    setAnObjectPropertyTypeId,
    setAnObjectTypeId,
    setCityId,
    setCountryId,
    setRegionId,
    setAddressData,

    formData: { addressData, longitude, latitude, fullAddress },
    setLocationMap,
    clearForm: clearObjectForm,
  } = useCreateObject();

  useEffect(() => {
    setAnObjectTypeId(objectType);
    setAnObjectPropertyTypeId(objectTypeProperty.id);
    setCityId(city.id);
    setRegionId(region.id);
    setCountryId(country.id);
  }, []);

  const {
    createRoomForm: {
      anObjectRoomDescription: {
        area,
        count,
        floor,
        floorsInTheBuilding,
        ownName,
        uniqueName,
      },
      anObjectRoomBathroom,
      anObjectRoomBed: { beds },
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
    },
    anObjectId,
    categoryType,
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
    setDescription,
    setAnObjectRoomPostingRule,
    setAnObjectRoomBookingSettings,
    clearForm: clearRoomForm,
  } = useCreateRoom();

  useEffect(() => {
    return () => {
      clearRoomForm();
      clearObjectForm();
    };
  }, []);

  const generalInformationData: GeneralInformationSchemaType = {
    area,
    count,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    floor,
    floorsInTheBuilding,
    ...anObjectRoomBathroom,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    beds,
    elevator: anObjectRoomAvailability.elevator,
    attic: anObjectRoomEquipment.attic,
  };

  return (
    <>
      <FormStepper
        forms={[
          {
            stepTitle: "1 шаг",
            stepScreens: [
              {
                id: "AddressForm",
                render(props) {
                  return (
                    <Suspense fallback={<PageLoader />}>
                      <AddressForm
                        defaultValues={addressData}
                        changeState={setAddressData}
                        {...props}
                        navigation={
                          <>
                            <HStack bgColor={"white"} rounded={"lg"} p={3}>
                              <Button w="full" type="submit" colorScheme="red">
                                Продолжить
                              </Button>
                            </HStack>
                          </>
                        }
                      />
                    </Suspense>
                  );
                },
              },
              {
                id: "SelectLocationMap",
                render(props) {
                  return (
                    <Suspense fallback={<PageLoader />}>
                      <SelectLocationMapForm
                        city={city.name}
                        house={addressData.house}
                        streetName={addressData.streetName}
                        country={country.name}
                        region={region.name}
                        onChange={setLocationMap}
                        value={{
                          selectMap: {
                            fullAddress,
                            coordinates: {
                              latitude,
                              longitude,
                            },
                          },
                        }}
                        viewpoint1={country.viewPoint1}
                        viewpoint2={country.viewPoint2}
                        {...props}
                      />
                    </Suspense>
                  );
                },
              },
              {
                id: "GeneralInformation",
                render(props) {
                  return (
                    <>
                      {bedTypesIsSuccess && (
                        <Suspense fallback={<PageLoader />}>
                          <GeneralInformationForm
                            value={generalInformationData}
                            onChange={({
                              beds,
                              area,
                              count,
                              floor,
                              floorsInTheBuilding,
                              numberOfBathroomsWithToilet,
                              numberOfBathroomsWithOutToilet,

                              numberOfSeparateToilets,
                              additionalBathroom,
                              additionalToilet,
                              attic,
                              bath,
                              bidet,
                              elevator,
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
                              maximumGuests,
                            }) => {
                              setAnObjectRoomBed({
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                //@ts-ignore
                                beds,
                                maximumGuests,
                              });
                              setAnObjectRoomDescription({
                                roomNameType: 1,
                                count,
                                area,
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                //@ts-ignore
                                floor,
                                floorsInTheBuilding,
                              });
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
                              setAnObjectRoomEquipment({
                                attic,
                              });
                              setAnObjectRoomAvailability({
                                elevator,
                              });
                            }}
                            bedTypes={bedTypes}
                            {...props}
                          />
                        </Suspense>
                      )}
                      {bedTypesIsLoading && <PageLoader />}
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
              {
                id: "HeadingForm",
                render(props) {
                  return (
                    <Suspense fallback={<PageLoader />}>
                      <HeadingForm
                        value={{
                          detailedDescription: description,
                          title: uniqueName,
                          ownName,
                        }}
                        onChange={({ detailedDescription, title, ownName }) => {
                          setAnObjectRoomDescription({
                            ownName,
                            uniqueName: title,
                          });

                          setDescription(detailedDescription);
                        }}
                        {...props}
                      />
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
                          highlyRatedGuestsBookInstantly: true,
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
                          <OptionalServiceForm
                            currencies={currencies}
                            currentCurrencyId={currencyId}
                            value={{
                              cleaningFeeType,
                              cleaningAmount: amount,
                              depositAmount:
                                anObjectRoomInsuranceDeposit.amount,
                              transfer: true,
                              transferDescription: "sasfksdosaokdpaskdops",
                            }}
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

                              createRoom({
                                anObjectId,
                                anObjectRoomAmenities,
                                anObjectRoomAvailability,
                                anObjectRoomBaseCost,
                                anObjectRoomBathroom,
                                anObjectRoomBed: {
                                  maximumGuests: 10,
                                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                  //@ts-ignore
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
                                anObjectRoomInsuranceDeposit,
                                anObjectRoomKitchenEquipment,
                                anObjectRoomOutsideRelaxation,
                                anObjectRoomViewFromWindow,
                                categoryType,
                                description,
                              })
                                .unwrap()
                                .then(() => {
                                  navigate(RouteName.ADD_OBJECT);
                                  clearObjectForm();
                                  clearRoomForm();
                                });
                            }}
                            cleaningFeeTypes={cleaningFeeTypes}
                            {...props}
                          />
                        </Suspense>
                      )}
                      {cleaningFeeTypesIsLoading && currenciesIsSuccess && (
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
      )}
    </>
  );
};
