import { Box, Button, Center, HStack, Stack } from "@chakra-ui/react";
import {
  EditSelectFormMap,
  HotelGeneralInformationForm,
  ImageUploadForm,
} from "@entites/Object";
import { CollapseFormCard } from "@shared/ui/CollapseFormCard";
import { useEditHotel } from "../model/useEditHotel";
import { EditForm } from "./EditForm";
import { Loader } from "@shared/ui/Loader";

export const EditHotel = () => {
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
      {isSuccess && data && (
        <CollapseFormCard
          title="Карта"
          defaultIsOpen
          render={(closeButton) => {
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
                navigation={
                  <>
                    <HStack bgColor={"white"} w="full">
                      <Button w="full" colorScheme="red" type="submit">
                        Сохранить
                      </Button>
                      {closeButton}
                    </HStack>
                  </>
                }
                onChange={({ selectMap }) => {
                  const {
                    coordinates: { latitude, longitude },
                    fullAddress,
                  } = selectMap;
                  updatePositionData({
                    fullAddress,
                    latitude,
                    longitude,
                  });
                }}
              />
            );
          }}
        />
      )}
      {isSuccess && data && (
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
                  objectTypeName="хуй"
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
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  changeState={updateHotelGeneralInfo}
                />
              </EditForm>
            );
          }}
        />
      )}
      {isSuccess && data && (
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
            bgColor={"blackAlpha.100"}
          >
            <Center w="full" h="full">
              <Loader />
            </Center>
          </Box>
        ))}
    </Stack>
  );
};
