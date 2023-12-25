import { Box, Button, Center, HStack, Stack, useToast } from "@chakra-ui/react";
import { useEditObject } from "../model/useEditObject";
import {
  CheckInCheckOutForm,
  EditSelectFormMap,
  FacilitiesForm,
  FormSuspense,
  GeneralInformationForm,
  HeadingForm,
  ImageUploadForm,
  OptionalServiceForm,
  PostingRulesForm,
  PriceForm,
} from "@entites/Object";
import { ErrorAlert } from "@shared/ui/Alerts/ErrorAlert";
import { SucessAlert } from "@shared/ui/Alerts/SucessAlert";
import { CollapseFormCard } from "@shared/ui/CollapseFormCard";
import { Loader } from "@shared/ui/Loader";
import {
  useGetCurrenciesQuery,
  useGetNumberOfIsolatedBedroomQuery,
  useGetKitchenTypeQuery,
  useGetRepairTypeQuery,
  useGetBedTypesQuery,
  useGetCleaningFeeTypesQuery,
} from "@entites/CommonReference";
import { useGetFloorTypeQuery } from "@entites/CommonReference/model/api/commonReferenceApi";
import { PageLoader } from "@shared/ui/PageLoader";

export const EditObject = () => {
  const toast = useToast();
  const { data: currencies, isSuccess: currenciesIsSuccess } =
    useGetCurrenciesQuery();

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

  const { data: cleaningFeeTypes, isSuccess: cleaningFeeTypesIsSuccess } =
    useGetCleaningFeeTypesQuery("");

  const {
    data: floorTypes,
    isLoading: floorTypesIsLoading,
    isSuccess: floorTypeIsSuccesss,
  } = useGetFloorTypeQuery();
  const {
    roomData,
    objectData,
    objectIsLoading,
    objectIsSuccess,
    roomIsLoading,
    roomIsSuсcess,
    objectEditIsLoading,
    updatePositionData,
    roomEditIsLoading,
    updateObjectGeneralInformation,
    updateFacilities,
    updateHeading,
    updatePostingRules,
    updateCheckInCheckOut,
    updateBaseCost,
    updateOptionalService,
  } = useEditObject();

  return (
    <>
      {!roomIsLoading &&
        roomIsSuсcess &&
        objectIsSuccess &&
        !objectIsLoading &&
        objectData &&
        roomData && (
          <Stack minH={"100dvh"}>
            <CollapseFormCard
              title="Карта"
              defaultIsOpen
              render={(_, onClose) => {
                const { fullAddress, latitude, longitude } = objectData;
                return (
                  <EditSelectFormMap
                    value={{
                      selectMap: {
                        fullAddress,
                        coordinates: {
                          latitude,
                          longitude,
                        },
                      },
                    }}
                    onChange={({ selectMap }) => {
                      const {
                        coordinates: { latitude, longitude },
                        fullAddress,
                      } = selectMap;
                      updatePositionData({
                        fullAddress,
                        latitude,
                        longitude,
                      })
                        ?.then(() => {
                          toast({
                            isClosable: true,
                            position: "top-right",
                            render({ onClose }) {
                              return (
                                <SucessAlert
                                  title="Сохранение"
                                  description="Расположение объекта сохранено"
                                  onClose={onClose}
                                />
                              );
                            },
                          });
                        })
                        .catch(() => {
                          toast({
                            isClosable: true,
                            position: "top-right",
                            render({ onClose }) {
                              return (
                                <ErrorAlert
                                  title="Ошибка"
                                  description="Произошла ошибка"
                                  onClose={onClose}
                                />
                              );
                            },
                          });
                        });
                    }}
                    onCancel={() => {
                      onClose();
                    }}
                  />
                );
              }}
            />

            <CollapseFormCard
              title="Основная информация"
              render={(closeButton) => {
                const {
                  anObjectRoomDescription: {
                    area,
                    count,
                    floorType,
                    floorsInTheBuilding,
                    kitchenType,
                    numberOfIsolatedBedroom,
                    repairType,
                  },

                  anObjectRoomBathroom: {
                    additionalBathroom,
                    additionalToilet,
                    bath,
                    bidet,
                    hairDryer,
                    hygienicShower,
                    numberOfBathroomsWithOutToilet,
                    numberOfBathroomsWithToilet,
                    numberOfSeparateToilets,
                    robe,
                    sauna,
                    sharedBathroom,
                    sharedShowerRoom,
                    sharedToilet,
                    shower,
                    slippers,
                    toiletries,
                    towels,
                  },
                  anObjectRoomAvailability: { elevator },
                  anObjectRoomEquipment: { attic },
                  anObjectRoomBeds,
                  maximumGuests,
                } = roomData;
                return (
                  <FormSuspense>
                    {bedTypesIsSuccess &&
                      repairTypeIsSuccess &&
                      kitchenTypeIsSuccess &&
                      numberOfIsolatedBedroomIsSuccess &&
                      floorTypeIsSuccesss && (
                        <GeneralInformationForm
                          value={{
                            area,
                            count,
                            floorType,
                            floorsInTheBuilding,
                            kitchenType,
                            numberOfIsolatedBedroom,
                            repairType,
                            beds: anObjectRoomBeds,
                            maximumGuests,
                            additionalBathroom,
                            additionalToilet,
                            attic,
                            bath,
                            bidet,
                            elevator,
                            hairDryer,
                            hygienicShower,
                            numberOfBathroomsWithOutToilet,
                            numberOfBathroomsWithToilet,
                            numberOfSeparateToilets,
                            robe,
                            sauna,
                            sharedBathroom,
                            sharedShowerRoom,
                            sharedToilet,
                            shower,
                            slippers,
                            toiletries,
                            towels,
                          }}
                          navigation={
                            <>
                              <HStack
                                bgColor={"white"}
                                w="full"
                                position={"sticky"}
                                bottom={0}
                                p={3}
                              >
                                <Button
                                  w="full"
                                  colorScheme="red"
                                  type="submit"
                                >
                                  Сохранить
                                </Button>
                                {closeButton}
                              </HStack>
                            </>
                          }
                          bedTypes={bedTypes}
                          kitchenTypes={kitchenTypes}
                          repairTypes={repairTypes}
                          floorTypes={floorTypes}
                          numberOfIsolatedBedroomTypes={
                            numberOfIsolatedBedroomTypes
                          }
                          onChange={(data) =>
                            updateObjectGeneralInformation(data)
                              ?.then(() => {
                                toast({
                                  isClosable: true,
                                  position: "top-right",
                                  render({ onClose }) {
                                    return (
                                      <SucessAlert
                                        title="Сохранение"
                                        description="Информация об объекте сохранено"
                                        onClose={onClose}
                                      />
                                    );
                                  },
                                });
                              })
                              .catch(() => {
                                toast({
                                  isClosable: true,
                                  position: "top-right",
                                  render({ onClose }) {
                                    return (
                                      <ErrorAlert
                                        title="Ошибка"
                                        description="Произошла ошибка"
                                        onClose={onClose}
                                      />
                                    );
                                  },
                                });
                              })
                          }
                        />
                      )}
                    {bedTypesIsLoading ||
                      kitchenTypeIsLoading ||
                      repairTypeIsLoading ||
                      floorTypesIsLoading ||
                      (numberOfIsolatedBedroomIsLoading && <PageLoader />)}
                  </FormSuspense>
                );
              }}
            />

            <CollapseFormCard
              title="Удобства"
              render={(closeButton) => {
                const {
                  anObjectRoomAmenities,
                  anObjectRoomAvailability,
                  anObjectRoomForChildren,
                  anObjectRoomEquipment,
                  anObjectRoomInfrastructureLeisureNearby,
                  anObjectRoomOutsideRelaxation,
                  anObjectRoomIndoorRelaxation,
                  anObjectRoomKitchenEquipment,
                  anObjectRoomViewFromWindow,
                } = roomData;
                return (
                  <FormSuspense>
                    <FacilitiesForm
                      navigation={
                        <>
                          <HStack
                            bgColor={"white"}
                            w="full"
                            position={"sticky"}
                            bottom={0}
                            p={3}
                          >
                            <Button w="full" colorScheme="red" type="submit">
                              Сохранить
                            </Button>
                            {closeButton}
                          </HStack>
                        </>
                      }
                      onChange={(data) => {
                        updateFacilities(data)
                          ?.then(() => {
                            toast({
                              isClosable: true,
                              position: "top-right",
                              render({ onClose }) {
                                return (
                                  <SucessAlert
                                    title="Сохранение"
                                    description="Удобства сохранены"
                                    onClose={onClose}
                                  />
                                );
                              },
                            });
                          })
                          .catch(() => {
                            toast({
                              isClosable: true,
                              position: "top-right",
                              render({ onClose }) {
                                return (
                                  <ErrorAlert
                                    title="Ошибка"
                                    description="Произошла ошибка"
                                    onClose={onClose}
                                  />
                                );
                              },
                            });
                          });
                      }}
                      value={{
                        roomAmenities: anObjectRoomAmenities,
                        roomAvailability: anObjectRoomAvailability,
                        roomEquipment: anObjectRoomEquipment,
                        roomForChildren: anObjectRoomForChildren,
                        roomInfrastructureLeisureNearby:
                          anObjectRoomInfrastructureLeisureNearby,
                        roomIndoorRelaxation: anObjectRoomIndoorRelaxation,
                        roomOutsideRelaxation: anObjectRoomOutsideRelaxation,
                        roomKitchenEquipment: anObjectRoomKitchenEquipment,
                        roomViewFromWindow: anObjectRoomViewFromWindow,
                      }}
                    />
                  </FormSuspense>
                );
              }}
            />
            <CollapseFormCard
              title="Изображение"
              render={(closeButton) => {
                return (
                  <FormSuspense>
                    <ImageUploadForm
                      navigation={
                        <HStack>
                          <HStack bgColor={"white"} w="full">
                            <Button w="full" colorScheme="red" type="submit">
                              Сохранить
                            </Button>
                            {closeButton}
                          </HStack>
                        </HStack>
                      }
                    />
                  </FormSuspense>
                );
              }}
            />
            <CollapseFormCard
              title="Загаловок"
              render={(closeButton) => {
                const {
                  description,
                  anObjectRoomDescription: { ownName, uniqueName },
                } = roomData;
                return (
                  <FormSuspense>
                    <HeadingForm
                      value={{
                        detailedDescription: description,
                        ownName,
                        title: uniqueName,
                      }}
                      navigation={
                        <HStack>
                          <HStack bgColor={"white"} w="full">
                            <Button w="full" colorScheme="red" type="submit">
                              Сохранить
                            </Button>
                            {closeButton}
                          </HStack>
                        </HStack>
                      }
                      onChange={(data) => {
                        updateHeading(data)
                          ?.then(() => {
                            toast({
                              isClosable: true,
                              position: "top-right",
                              render({ onClose }) {
                                return (
                                  <SucessAlert
                                    title="Сохранение"
                                    description="Название объекта сохранена"
                                    onClose={onClose}
                                  />
                                );
                              },
                            });
                          })
                          .catch(() => {
                            toast({
                              isClosable: true,
                              position: "top-right",
                              render({ onClose }) {
                                return (
                                  <ErrorAlert
                                    title="Ошибка"
                                    description="Произошла ошибка"
                                    onClose={onClose}
                                  />
                                );
                              },
                            });
                          });
                      }}
                    />
                  </FormSuspense>
                );
              }}
            />
            <CollapseFormCard
              title="Правила"
              render={(closeButton) => {
                const {
                  anObjectRoomPostingRule: {
                    childsAge,
                    partiesAllowed,
                    petsAllowed,
                    possibleWithChildren,
                    smokingAllowed,
                  },
                } = roomData;
                return (
                  <FormSuspense>
                    <PostingRulesForm
                      value={{
                        partiesAllowed,
                        petsAllowed,
                        possibleWithChildren,
                        smokingAllowed,
                        childsAge,
                      }}
                      navigation={
                        <HStack>
                          <HStack bgColor={"white"} w="full">
                            <Button w="full" colorScheme="red" type="submit">
                              Сохранить
                            </Button>
                            {closeButton}
                          </HStack>
                        </HStack>
                      }
                      onChange={(data) => {
                        updatePostingRules(data)
                          ?.then(() => {
                            toast({
                              isClosable: true,
                              position: "top-right",
                              render({ onClose }) {
                                return (
                                  <SucessAlert
                                    title="Сохранение"
                                    description="Правила размещения объекта сохранена"
                                    onClose={onClose}
                                  />
                                );
                              },
                            });
                          })
                          .catch(() => {
                            toast({
                              isClosable: true,
                              position: "top-right",
                              render({ onClose }) {
                                return (
                                  <ErrorAlert
                                    title="Ошибка"
                                    description="Произошла ошибка"
                                    onClose={onClose}
                                  />
                                );
                              },
                            });
                          });
                      }}
                    />
                  </FormSuspense>
                );
              }}
            />
            <CollapseFormCard
              title="Заезд / отъезд"
              render={(closeButton) => {
                const {
                  anObjectRoomBookingSettings: { checkInAfter, checkOutAfter },
                } = roomData;
                return (
                  <FormSuspense>
                    <CheckInCheckOutForm
                      value={{
                        checkInAfter,
                        checkOutAfter,
                      }}
                      navigation={
                        <HStack>
                          <HStack bgColor={"white"} w="full">
                            <Button w="full" colorScheme="red" type="submit">
                              Сохранить
                            </Button>
                            {closeButton}
                          </HStack>
                        </HStack>
                      }
                      onChange={(data) => {
                        updateCheckInCheckOut(data)
                          ?.then(() => {
                            toast({
                              isClosable: true,
                              position: "top-right",
                              render({ onClose }) {
                                return (
                                  <SucessAlert
                                    title="Сохранение"
                                    description="Заезд / отъезд объекта сохранена"
                                    onClose={onClose}
                                  />
                                );
                              },
                            });
                          })
                          .catch(() => {
                            toast({
                              isClosable: true,
                              position: "top-right",
                              render({ onClose }) {
                                return (
                                  <ErrorAlert
                                    title="Ошибка"
                                    description="Произошла ошибка"
                                    onClose={onClose}
                                  />
                                );
                              },
                            });
                          });
                      }}
                    />
                  </FormSuspense>
                );
              }}
            />
            <CollapseFormCard
              title="Цены"
              render={(closeButton) => {
                const {
                  anObjectRoomBaseCost: {
                    currencyId,
                    forHowManyGuests,
                    minimumLengthOfStay,
                    pricePerDay,
                  },
                } = roomData;
                return (
                  <FormSuspense>
                    {currenciesIsSuccess && (
                      <PriceForm
                        value={{
                          currencyId,
                          forHowManyGuests,
                          minimumLengthOfStay,
                          pricePerDay,
                        }}
                        currencies={currencies}
                        navigation={
                          <HStack>
                            <HStack bgColor={"white"} w="full">
                              <Button w="full" colorScheme="red" type="submit">
                                Сохранить
                              </Button>
                              {closeButton}
                            </HStack>
                          </HStack>
                        }
                        onChange={(data) => {
                          updateBaseCost(data)
                            ?.then(() => {
                              toast({
                                isClosable: true,
                                position: "top-right",
                                render({ onClose }) {
                                  return (
                                    <SucessAlert
                                      title="Сохранение"
                                      description="Цены сохранены"
                                      onClose={onClose}
                                    />
                                  );
                                },
                              });
                            })
                            .catch(() => {
                              toast({
                                isClosable: true,
                                position: "top-right",
                                render({ onClose }) {
                                  return (
                                    <ErrorAlert
                                      title="Ошибка"
                                      description="Произошла ошибка"
                                      onClose={onClose}
                                    />
                                  );
                                },
                              });
                            });
                        }}
                      />
                    )}
                  </FormSuspense>
                );
              }}
            />
            <CollapseFormCard
              title="Дополнительная информация"
              render={(closeButton) => {
                const {
                  anObjectRoomCleaningFee: {
                    amount: cleaningAmount,
                    cleaningFeeType,
                  },
                  anObjectRoomInsuranceDeposit: { amount: depositAmount },
                } = roomData;
                const {
                  anObjectFeeAdditionalService: {
                    hasTransfer,
                    transferDetails,
                  },
                } = objectData;
                return (
                  <FormSuspense>
                    {cleaningFeeTypesIsSuccess && currenciesIsSuccess && (
                      <OptionalServiceForm
                        currencies={currencies}
                        currentCurrencyId={
                          roomData.anObjectRoomBaseCost.currencyId
                        }
                        cleaningFeeTypes={cleaningFeeTypes}
                        value={{
                          cleaningFeeType,
                          cleaningAmount,
                          depositAmount,
                          transfer: hasTransfer,
                          transferDescription: transferDetails,
                        }}
                        navigation={
                          <HStack>
                            <HStack bgColor={"white"} w="full">
                              <Button w="full" colorScheme="red" type="submit">
                                Сохранить
                              </Button>
                              {closeButton}
                            </HStack>
                          </HStack>
                        }
                        onChange={(data) => {
                          updateOptionalService(data)
                            ?.then(() => {
                              toast({
                                isClosable: true,
                                position: "top-right",
                                render({ onClose }) {
                                  return (
                                    <SucessAlert
                                      title="Сохранение"
                                      description="Дополнительная информация сохранена"
                                      onClose={onClose}
                                    />
                                  );
                                },
                              });
                            })
                            .catch(() => {
                              toast({
                                isClosable: true,
                                position: "top-right",
                                render({ onClose }) {
                                  return (
                                    <ErrorAlert
                                      title="Ошибка"
                                      description="Произошла ошибка"
                                      onClose={onClose}
                                    />
                                  );
                                },
                              });
                            });
                        }}
                      />
                    )}
                  </FormSuspense>
                );
              }}
            />
          </Stack>
        )}
      {objectIsLoading ||
        (roomIsLoading && (
          <Box
            position={"fixed"}
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={"popover"}
            bgColor={"blackAlpha.500"}
          >
            <Center w="full" h="full">
              <Loader />
            </Center>
          </Box>
        ))}
      {roomEditIsLoading && (
        <Box
          position={"fixed"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={"popover"}
          bgColor={"blackAlpha.500"}
        >
          <Center w="full" h="full">
            <Loader />
          </Center>
        </Box>
      )}
      {objectEditIsLoading && (
        <Box
          position={"fixed"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          zIndex={"popover"}
          bgColor={"blackAlpha.500"}
        >
          <Center w="full" h="full">
            <Loader />
          </Center>
        </Box>
      )}
    </>
  );
};
