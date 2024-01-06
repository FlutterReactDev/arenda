import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { Box, Button, Center, HStack, useToast } from "@chakra-ui/react";
import {
  useGetBedTypesQuery,
  useGetCleaningFeeTypesQuery,
  useGetCurrenciesQuery,
  useGetFromBookingToCheckInQuery,
  useGetInstantBookingValidQuery,
  useGetKitchenTypeQuery,
  useGetNumberOfIsolatedBedroomQuery,
  useGetRepairTypeQuery,
} from "@entites/CommonReference";
import { useGetFloorTypeQuery } from "@entites/CommonReference/model/api/commonReferenceApi";
import {
  AddressForm,
  BookingSettingForm,
  CalendarInfoForm,
  CheckInCheckOutForm,
  FacilitiesForm,
  GeneralInformationForm,
  HeadingForm,
  HowGuestBookForm,
  ImageUploadForm,
  OptionalServiceForm,
  PostingRulesForm,
  PriceForm,
  SelectLocationMapForm,
  useCreateObjectMutation,
  useCreateRoom,
  useCreateRoomMutation,
} from "@entites/Object";
import { GeneralInformationSchemaType } from "@entites/Object/model/schemas/generalInformationSchema";
import { useCreateObject } from "@entites/Object/model/useCreateObject";
import { useAddObject } from "@features/SelectLocationForm";
import { SucessAlert } from "@shared/ui/Alerts/SucessAlert";
import { FormStepper } from "@shared/ui/FormSteppter";
import { PageLoader } from "@shared/ui/PageLoader";
import { Suspense, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CreateObject = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const {
    data: currencies,
    isSuccess: currenciesIsSuccess,
    isLoading: currenciesIsLoading,
  } = useGetCurrenciesQuery();

  const {
    data: numberOfIsolatedBedroomTypes,
    isLoading: numberOfIsolatedBedroomIsLoading,
    isSuccess: numberOfIsolatedBedroomIsSuccess,
  } = useGetNumberOfIsolatedBedroomQuery();

  const {
    data: kitchenTypes,
    isLoading: kitchenTypeIsLoading,
    isSuccess: kitchenTypeIsSuccess,
  } = useGetKitchenTypeQuery();

  const {
    data: repairTypes,
    isLoading: repairTypeIsLoading,
    isSuccess: repairTypeIsSuccess,
  } = useGetRepairTypeQuery();
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
    data: floorTypes,
    isLoading: floorTypesIsLoading,
    isSuccess: floorTypeIsSuccesss,
  } = useGetFloorTypeQuery();

  const [createRoom, { isLoading: createRoomIsLoading }] =
    useCreateRoomMutation();

  const [createObject, { isLoading: createObjectIsLoading }] =
    useCreateObjectMutation();

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
    formData: {
      addressData,
      longitude,
      latitude,
      fullAddress,
      anObjectFeeAdditionalService,
      anObjectAdditionalComfort,
      anObjectMeal,
    },
    setLocationMap,
    clearForm: clearObjectForm,
    setAnObjectFeeAdditionalService,
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
        floorsInTheBuilding,
        ownName,
        uniqueName,
        kitchenType,
        numberOfIsolatedBedroom,
        repairType,
        floorType,
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
    },

    categoryType,
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
    setDescription,
    setAnObjectRoomPostingRule,
    setAnObjectRoomBookingSettings,
    setAnObjectRoomMaximumGuests,
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
    floorType,
    floorsInTheBuilding,
    ...anObjectRoomBathroom,
    beds: anObjectRoomBeds.map(({ bedType, count }) => ({ bedType, count })),
    elevator: anObjectRoomAvailability.elevator,
    attic: anObjectRoomEquipment.attic,
    kitchenType,
    numberOfIsolatedBedroom,
    repairType,
    maximumGuests,
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
                      {bedTypesIsSuccess &&
                        repairTypeIsSuccess &&
                        kitchenTypeIsSuccess &&
                        numberOfIsolatedBedroomIsSuccess &&
                        floorTypeIsSuccesss && (
                          <Suspense fallback={<PageLoader />}>
                            <GeneralInformationForm
                              value={generalInformationData}
                              onChange={({
                                beds,
                                area,
                                count,
                                floorType,
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
                                kitchenType,
                                numberOfIsolatedBedroom,
                                repairType,
                              }) => {
                                const roomBeds = beds.map(
                                  ({ bedType, count }) => ({
                                    bedType,
                                    count,
                                    anObjectRoomId: 0,
                                  })
                                );
                                setAnObjectRoomBeds(roomBeds);

                                setAnObjectRoomMaximumGuests(maximumGuests);
                                setAnObjectRoomDescription({
                                  roomNameTypeId: 1,
                                  count,
                                  area,
                                  floorType,
                                  floorsInTheBuilding,
                                  kitchenType,
                                  numberOfIsolatedBedroom,
                                  repairType,
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
                              kitchenTypes={kitchenTypes}
                              repairTypes={repairTypes}
                              floorTypes={floorTypes}
                              numberOfIsolatedBedroomTypes={
                                numberOfIsolatedBedroomTypes
                              }
                              {...props}
                            />
                          </Suspense>
                        )}
                      {bedTypesIsLoading ||
                        kitchenTypeIsLoading ||
                        repairTypeIsLoading ||
                        floorTypesIsLoading ||
                        (numberOfIsolatedBedroomIsLoading && <PageLoader />)}
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
                            cleaningFeeTypes={cleaningFeeTypes}
                            value={{
                              cleaningFeeType,
                              cleaningAmount: amount,
                              depositAmount:
                                anObjectRoomInsuranceDeposit.amount,
                              transfer:
                                anObjectFeeAdditionalService.hasTransfer,
                              transferDescription:
                                anObjectFeeAdditionalService.transferDetails,
                            }}
                            onChange={({
                              cleaningFeeType,
                              cleaningAmount,
                              depositAmount,
                              transfer,
                              transferDescription,
                            }) => {
                              setAnObjectRoomCleaningFee({
                                amount: cleaningAmount,
                                cleaningFeeType: cleaningFeeType,
                              });
                              setAnObjectRoomInsuranceDeposit({
                                amount: depositAmount,
                              });
                              setAnObjectFeeAdditionalService({
                                transferDetails: transferDescription,
                                hasTransfer: transfer,
                              });
                              createObject({
                                addressData,
                                longitude,
                                latitude,
                                fullAddress,
                                anObjectFeeAdditionalService,
                                building: "",
                                countryId: country.id,
                                cityId: city.id,
                                regionId: region.id,
                                anObjectTypeId: objectType,
                                anObjectPropertyTypeId: objectTypeProperty.id,
                                anObjectDetail: {
                                  areaOfTheLand: area,
                                  checkInAfter:
                                    anObjectRoomBookingSettings.checkInAfter,
                                  checkOutAfter:
                                    anObjectRoomBookingSettings.checkOutAfter,
                                  numberOfRooms: count,
                                  paymentType: 1,
                                  smokingOnSite: 1,
                                  yearOfConstruntion: 2233,
                                },
                                internetAccess: 1,
                                internetAccessSumm: 0,
                                parking: 1,
                                parkingSumm: 0,
                                rating: 1,
                                anObjectAdditionalComfort,
                                anObjectMeal,
                                name: uniqueName,
                              })
                                .unwrap()
                                .then(({ id }) => {
                                  createRoom({
                                    anObjectId: id,
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
                                      roomNameTypeId: 1,
                                      uniqueName,
                                      kitchenType,
                                      numberOfIsolatedBedroom,
                                      repairType,
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
                                  })
                                    .unwrap()
                                    .then(() => {
                                      toast({
                                        position: "top-right",
                                        isClosable: true,
                                        duration: 3000,
                                        render({ onClose }) {
                                          return (
                                            <SucessAlert
                                              onClose={onClose}
                                              title="Создание"
                                              description={`Создан объект`}
                                            />
                                          );
                                        },
                                      });
                                      navigate(RouteName.MY_OBJECTS);
                                      clearObjectForm();
                                      clearRoomForm();
                                    });
                                });
                            }}
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
      {createRoomIsLoading && (
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
      {createObjectIsLoading && (
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
