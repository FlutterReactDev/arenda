import { Box, Button, Center, HStack, Stack, useToast } from "@chakra-ui/react";
import {
  EditSelectFormMap,
  HotelGeneralInformationForm,
  ImageUploadForm,
} from "@entites/Object";
import { CollapseFormCard } from "@shared/ui/CollapseFormCard";
import { useEditHotel } from "../model/useEditHotel";
import { EditForm } from "./EditForm";
import { Loader } from "@shared/ui/Loader";
import { SucessAlert } from "@shared/ui/Alerts/SucessAlert";
import { ErrorAlert } from "@shared/ui/Alerts/ErrorAlert";

export const EditHotel = () => {
  const toast = useToast();
  const {
    data,
    isSuccess,
    editIsLoading,
    isLoading,
    updateHotelGeneralInfo,
    updatePositionData,
  } = useEditHotel();

  return (
    <Stack minH="100dvh">
      {isSuccess && !isLoading && data && (
        <CollapseFormCard
          title="Карта"
          defaultIsOpen
          render={(_, onClose) => {
            const { fullAddress, latitude, longitude } = data;
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
      )}

      {isSuccess && !isLoading && data && (
        <CollapseFormCard
          title="Информация об отеле"
          render={(closeButton) => {
            const {
              anObjectAdditionalComfort,
              anObjectDetail,
              anObjectFeeAdditionalService,
              anObjectMeal,
              internetAccess,
              internetAccessSumm,
              name,
              parking,
              parkingSumm,
              rating,
            } = data;
            return (
              <EditForm>
                <HotelGeneralInformationForm
                  objectTypeName="Объекта"
                  stateValue={{
                    anObjectAdditionalComfort,
                    anObjectDetail,
                    anObjectFeeAdditionalService,
                    anObjectMeal,
                    internetAccess,
                    internetAccessSumm,
                    name,
                    parking,
                    parkingSumm,
                    rating,
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
                        <Button w="full" colorScheme="red" type="submit">
                          Сохранить
                        </Button>
                        {closeButton}
                      </HStack>
                    </>
                  }
                  changeState={(data) =>
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    updateHotelGeneralInfo(data)
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
              </EditForm>
            );
          }}
        />
      )}

      {isSuccess && !isLoading && data && (
        <CollapseFormCard
          title="Изображение"
          render={(closeButton) => {
            return (
              <EditForm>
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
              </EditForm>
            );
          }}
        />
      )}

      {isLoading ||
        (editIsLoading && (
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
    </Stack>
  );
};
