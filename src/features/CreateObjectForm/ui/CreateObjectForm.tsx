import { Box, Heading } from "@chakra-ui/react";
import {
  AddressForm,
  GeneralInformationForm,
  SelectLocationMapForm,
  BookingSettingForm,
  CalendarInfoForm,
  CheckInCheckOutForm,
  FacilitiesForm,
  HeadingForm,
  HowGuestBookForm,
  ImageUploadForm,
  OptionalServiceForm,
  PostingRulesForm,
  PriceForm,
  addObjectStepActions,
} from "@entites/Object";
import { addressFormSchema } from "@entites/Object/model/schemas/addressFormSchema";
import { fileSchema } from "@entites/Object/model/schemas/fileSchema";
import { selectMapSchema } from "@entites/Object/model/schemas/selectMapSchema";
import { getForm } from "@entites/Object/model/selectors";
import { useAddObject } from "@features/SelectLocationForm";
import { FormStepper } from "@shared/ui/FormSteppter";
import { PageLoader } from "@shared/ui/PageLoader";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { Suspense } from "react";
import { InferType } from "yup";
import { useCreateObject } from "../model/useCreateObject";
import { GeneralInformationSchemaType } from "@entites/Object/model/schemas/generalInformationSchema";
import {
  useGetBedTypesQuery,
  useGetCurrenciesQuery,
} from "@entites/CommonReference";

export const CreateObjectForm = () => {
  const dispatch = useAppDispatch();
  const addressData = useAppSelector(getForm(0, 0)) as InferType<
    typeof addressFormSchema
  >;
  const selectMapData = useAppSelector(getForm(1, 0)) as InferType<
    typeof selectMapSchema
  >;
  const files = useAppSelector(getForm(4, 0)) as InferType<typeof fileSchema>;
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
    objectFormData: { city, country, region },
  } = useAddObject();
  const {
    createObjectForm: {
      anObjectRoomDescription: { area, count, floor, floorsInTheBuilding },
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
      
    },
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
  } = useCreateObject();

  const generalInformationData: GeneralInformationSchemaType = {
    area,
    count,
    floor,
    floorsInTheBuilding,
    ...anObjectRoomBathroom,
    beds,
    elevator: anObjectRoomAvailability.elevator,
    attic: anObjectRoomEquipment.attic,
  };

  const onComplete = () => {};

  return (
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
                      changeState={(data) =>
                        dispatch(
                          addObjectStepActions.setForm({
                            screen: 0,
                            step: 0,
                            data,
                          })
                        )
                      }
                      {...props}
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
                      stateValue={selectMapData}
                      changeState={(data) => {
                        dispatch(
                          addObjectStepActions.setForm({
                            step: 0,
                            screen: 1,
                            data,
                          })
                        );
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
                            numberOfIsolatedBedrooms,
                            repair,
                            kitchen,
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
                            console.log(beds);

                            setAnObjectRoomBed({
                              beds,
                              maximumGuests,
                            });
                            setAnObjectRoomDescription({
                              roomNameType: 1,
                              count,
                              area,
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
                        setAnObjectRoomOutsideRelaxation(roomOutsideRelaxation);
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
                    <ImageUploadForm
                      stateValue={files}
                      changeState={(data) => {
                        const files = data as { files: File[] };
                        dispatch(
                          addObjectStepActions.setForm({
                            step: 0,
                            screen: 4,
                            data: files,
                          })
                        );
                      }}
                      {...props}
                    />
                  </Suspense>
                );
              },
            },
            {
              id: "HeadingForm",
              render(props) {
                return (
                  <Suspense fallback={<PageLoader />}>
                    <HeadingForm {...props} />
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
                    <PostingRulesForm {...props} />
                  </Suspense>
                );
              },
            },
            {
              id: "CheckInCheckOutForm",
              render(props) {
                return (
                  <Suspense fallback={<PageLoader />}>
                    <CheckInCheckOutForm {...props} />
                  </Suspense>
                );
              },
            },
            {
              id: "HowGuestBookForm",
              render(props) {
                return (
                  <Suspense fallback={<PageLoader />}>
                    <HowGuestBookForm {...props} />
                  </Suspense>
                );
              },
            },
            {
              id: "BookingSettingForm",
              render(props) {
                return (
                  <Suspense fallback={<PageLoader />}>
                    <BookingSettingForm {...props} />
                  </Suspense>
                );
              },
            },
            {
              id: "CalendarInfoForm",
              render(props) {
                return (
                  <Suspense fallback={<PageLoader />}>
                    <CalendarInfoForm {...props} />
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
                return (
                  <Suspense fallback={<PageLoader />}>
                    <OptionalServiceForm {...props} />
                  </Suspense>
                );
              },
            },
          ],
        },
      ]}
      onComplete={onComplete}
      finalView={
        <Box>
          <Heading>Это конец кто дослушал молодец</Heading>
        </Box>
      }
    />
  );
};
