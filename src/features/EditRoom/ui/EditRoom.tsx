import { Box, Button, Center, HStack, Stack, useToast } from "@chakra-ui/react";
import {
  useGetBedTypesQuery,
  useGetCleaningFeeTypesQuery,
  useGetCurrenciesQuery,
  useGetFloorTypeQuery,
  useGetRoomCategoriesQuery,
  useGetRoomTypeNamesQuery,
} from "@entites/CommonReference";

import {
  CheckInCheckOutForm,
  FacilitiesForm,
  FormSuspense,
  GeneralRoomInformationForm,
  ImageUploadForm,
  PostingRulesForm,
  PriceForm,
  RoomCategoryForm,
  RoomOptionalServiceForm,
} from "@entites/Object";
import { ErrorAlert } from "@shared/ui/Alerts/ErrorAlert";
import { SucessAlert } from "@shared/ui/Alerts/SucessAlert";
import { CollapseFormCard } from "@shared/ui/CollapseFormCard";
import { Loader } from "@shared/ui/Loader";
import { useEditRoom } from "../model/useEditRoom";

export const EditRoom = () => {
  const toast = useToast();
  const {
    data: currencies,
    isSuccess: currenciesIsSuccess,
    isLoading: currenciesIsLoading,
  } = useGetCurrenciesQuery();

  const { data: bedTypes, isSuccess: bedTypesIsSuccess } =
    useGetBedTypesQuery("");

  const {
    data: cleaningFeeTypes,
    isLoading: cleaningFeeTypesIsLoading,
    isSuccess: cleaningFeeTypesIsSuccess,
  } = useGetCleaningFeeTypesQuery("");

  const {
    data: roomCategories,
    isLoading: roomCategoriesIsLoading,
    isSuccess: roomCategoriesIsSuccess,
  } = useGetRoomCategoriesQuery();

  const { data: roomNameTypes, isSuccess: roomNameTypesIsSuccess } =
    useGetRoomTypeNamesQuery(30);

  const { data: floorTypes, isSuccess: floorTypeIsSuccesss } =
    useGetFloorTypeQuery();

  const {
    roomData,
    roomEditIsLoading,
    roomIsLoading,
    roomIsSuсcess,
    updateBaseCost,
    updateCheckInCheckOut,
    updateFacilities,
    updateGeneralRoomInformation,
    updatePostingRules,
    updateOptionalService,
    updateCategoryName,
  } = useEditRoom();

  return (
    <>
      {roomData && roomIsSuсcess && (
        <Stack>
          <CollapseFormCard
            title="Категория комнаты"
            render={(closeButton) => {
              const { categoryType } = roomData;
              return (
                <FormSuspense>
                  {roomCategoriesIsSuccess && (
                    <RoomCategoryForm
                      value={{
                        categoryType,
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
                      roomCategories={roomCategories}
                      onChange={(data) => {
                        updateCategoryName(data)
                          ?.then(() => {
                            toast({
                              isClosable: true,
                              position: "top-right",
                              render({ onClose }) {
                                return (
                                  <SucessAlert
                                    title="Сохранение"
                                    description="Категория комнаты сохранена"
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
                  {roomCategoriesIsLoading && <Loader />}
                </FormSuspense>
              );
            }}
          />
          <CollapseFormCard
            render={(closeButton) => {
              const {
                anObjectRoomDescription,
                anObjectRoomBathroom,
                maximumGuests,
                anObjectRoomBeds,
              } = roomData;
              return (
                <>
                  {bedTypesIsSuccess &&
                    roomNameTypesIsSuccess &&
                    floorTypeIsSuccesss && (
                      <FormSuspense>
                        <GeneralRoomInformationForm
                          bedTypes={bedTypes}
                          roomNameTypes={roomNameTypes}
                          floorTypes={floorTypes}
                          onChange={(data) => {
                            updateGeneralRoomInformation(data)
                              ?.then(() => {
                                toast({
                                  isClosable: true,
                                  position: "top-right",
                                  render({ onClose }) {
                                    return (
                                      <SucessAlert
                                        title="Сохранение"
                                        description="Информация комнаты сохранено"
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
                            ...anObjectRoomDescription,
                            ...anObjectRoomBathroom,
                            maximumGuests,
                            beds: anObjectRoomBeds,
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
                        />
                      </FormSuspense>
                    )}
                </>
              );
            }}
            title={"Основная информация"}
          />
          <CollapseFormCard
            title={"Удобства"}
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
            title={"Дополнительная информация"}
            render={(closeButton) => {
              const {
                anObjectRoomCleaningFee: {
                  cleaningFeeType,
                  amount: cleaningAmount,
                },
                anObjectRoomInsuranceDeposit: { amount: depositAmount },
                anObjectRoomBaseCost: { currencyId },
              } = roomData;
              return (
                <>
                  {cleaningFeeTypesIsSuccess && currenciesIsSuccess && (
                    <FormSuspense>
                      <RoomOptionalServiceForm
                        currentCurrencyId={currencyId}
                        currencies={currencies}
                        cleaningFeeTypes={cleaningFeeTypes}
                        value={{
                          cleaningAmount,
                          cleaningFeeType,
                          depositAmount,
                        }}
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
                  )}
                  {(cleaningFeeTypesIsLoading || currenciesIsLoading) && (
                    <Loader />
                  )}
                </>
              );
            }}
          />
        </Stack>
      )}
      {roomEditIsLoading && (
        <Box
          pos={"fixed"}
          bgColor={"blackAlpha.500"}
          top={0}
          left={0}
          right={0}
          bottom={0}
        >
          <Center w="full" h="full">
            <Loader />
          </Center>
        </Box>
      )}
      {roomIsLoading && (
        <Box
          pos={"fixed"}
          bgColor={"blackAlpha.500"}
          top={0}
          left={0}
          right={0}
          bottom={0}
        >
          <Center w="full" h="full">
            <Loader />
          </Center>
        </Box>
      )}
    </>
  );
};
