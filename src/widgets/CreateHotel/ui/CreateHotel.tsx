import {
  Box,
  Button,
  Center,
  CircularProgress,
  HStack,
} from "@chakra-ui/react";
import {
  AddressForm,
  HotelGeneralInformationForm,
  SelectLocationMapForm,
  useCreateObjectMutation,
} from "@entites/Object";
import { HotelGeneralInformationType } from "@entites/Object/model/schemas/hotelGeneralInformationSchema";
import { useCreateObject } from "@entites/Object/model/useCreateObject";
import { useAddObject } from "@features/SelectLocationForm";
import { FormStepper } from "@shared/ui/FormSteppter";
import { PageLoader } from "@shared/ui/PageLoader";
import { Suspense, useEffect } from "react";

export const CreateHotel = () => {
  const {
    objectFormData: { city, country, objectType, objectTypeProperty, region },
  } = useAddObject();

  const {
    formData,
    setAddressData,
    setAnObjectAdditionalComfort,
    setAnObjectDetail,
    setAnObjectFeeAdditionalService,
    setAnObjectMeal,
    setAnObjectPropertyTypeId,
    setAnObjectTypeId,
    setCityId,
    setCountryId,
    setInternetAccess,
    setLocationMap,
    setName,
    setParking,
    setRating,
    setRegionId,
    setInternetAccessSumm,
    setParkingSumm,
    clearForm,
  } = useCreateObject();

  useEffect(() => {
    return () => clearForm();
  }, []);

  const {
    addressData,
    anObjectAdditionalComfort,
    anObjectDetail,
    anObjectFeeAdditionalService,
    anObjectMeal,
    fullAddress,
    internetAccess,
    longitude,
    latitude,
    name,
    parking,
    rating,
    parkingSumm,
    internetAccessSumm,
  } = formData;

  useEffect(() => {
    setAnObjectTypeId(objectType);
    setAnObjectPropertyTypeId(objectTypeProperty.id);
    setCityId(city.id);
    setRegionId(region.id);
    setCountryId(country.id);
  }, []);

  const [createObject, { isLoading }] = useCreateObjectMutation();

  const onSave = (data: HotelGeneralInformationType) => {
    createObject({ ...formData, ...data });
  };

  return (
    <>
      <FormStepper
        forms={[
          {
            stepTitle: "Основная информация",
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
                id: "SelectLocationMapForm",
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
                id: "HotelGeneralInformationForm",

                render(props) {
                  return (
                    <Suspense fallback={<PageLoader />}>
                      <HotelGeneralInformationForm
                        {...props}
                        stateValue={{
                          anObjectDetail,
                          anObjectFeeAdditionalService,
                          anObjectMeal,
                          internetAccess,
                          anObjectAdditionalComfort,
                          name,
                          parking,
                          internetAccessSumm,
                          parkingSumm,
                          rating,
                        }}
                        changeState={(data) => {
                          const {
                            anObjectAdditionalComfort,
                            anObjectDetail,
                            anObjectFeeAdditionalService,
                            anObjectMeal,
                            internetAccess,
                            name,
                            parking,
                            rating,
                            internetAccessSumm,
                            parkingSumm,
                          } = data;

                          setName(name);
                          setRating(rating);
                          setAnObjectAdditionalComfort(
                            anObjectAdditionalComfort
                          );
                          setAnObjectDetail(anObjectDetail);
                          setAnObjectFeeAdditionalService(
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            //@ts-ignore
                            anObjectFeeAdditionalService
                          );
                          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                          //@ts-ignore
                          setAnObjectMeal(anObjectMeal);
                          setParking(parking);
                          setInternetAccess(internetAccess);
                          setInternetAccessSumm(internetAccessSumm || 0);
                          setParkingSumm(parkingSumm || 0);
                          onSave(data);
                        }}
                        objectTypeName={objectTypeProperty.name}
                      />
                    </Suspense>
                  );
                },
              },
            ],
          },
          // {
          //   stepTitle: "Фотографии",
          //   stepScreens: [
          //     {
          //       id: "ImageUploadForm",
          //       render(props) {
          //         return (
          //           <Suspense fallback={<PageLoader />}>
          //             <ImageUploadForm
          //               changeState={(data) => {
          //                 dispatch(addHotelActions.setFile(data));
          //               }}
          //               stateValue={imageFiles}
          //               {...props}
          //             />
          //           </Suspense>
          //         );
          //       },
          //     },
          //   ],
          // },
        ]}
      />

      {isLoading && (
        <Box
          pos="fixed"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bgColor={"blackAlpha.300"}
        >
          <Center w={"full"} h="full">
            <CircularProgress isIndeterminate color="red.500" />
          </Center>
        </Box>
      )}
    </>
  );
};
