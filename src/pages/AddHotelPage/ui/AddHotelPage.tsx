import { Box } from "@chakra-ui/react";
import {
  AddressForm,
  HotelGeneralInformationForm,
  ImageUploadForm,
  SelectLocationMapForm,
  addHotelActions,
  getAddressData,
  getLocationMap,
  useCreateObjectMutation,
} from "@entites/Object";
import { hotelGeneralInformationSchema } from "@entites/Object/model/schemas/hotelGeneralInformationSchema";

import {
  getHotelGeneralInformation,
  getImageFiles,
} from "@entites/Object/model/selectors";
import { useSelectLocationData } from "@features/SelectLocationForm";

import { FormStepper } from "@shared/ui/FormSteppter";
import { PageLoader } from "@shared/ui/PageLoader";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { Suspense, useEffect } from "react";
import { InferType } from "yup";
const AddHotelPage = () => {
  const { city, country, region, objectTypeProperty, objectType } =
    useSelectLocationData();
  useEffect(() => {}, []);
  const onComlete = () => {};
  const dispatch = useAppDispatch();

  const addressData = useAppSelector(getAddressData);
  const selectLocationData = useAppSelector(getLocationMap);
  const imageFiles = useAppSelector(getImageFiles);
  const hotelGeneralInformation = useAppSelector(getHotelGeneralInformation);

  const [createObject] = useCreateObjectMutation();

  const onSaveHotel = async (
    data: InferType<typeof hotelGeneralInformationSchema>
  ) => {
    await createObject({
      anObjectTypeId: objectType,
      anObjectPropertyTypeId: objectTypeProperty.id,
      fullAddress: selectLocationData.fullAddress,
      latitude: selectLocationData.coordinates[1],
      longitude: selectLocationData.coordinates[0],
      cityId: city.id,
      countryId: country.id,
      regionId: region.id,
      building: "string",
      ...data,
    });
  };
  return (
    <Box>
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
                        changeState={(data) => {
                          dispatch(addHotelActions.setAddressData(data));
                        }}
                        {...props}
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
                        stateValue={selectLocationData}
                        changeState={(data) => {
                          dispatch(addHotelActions.setLocationMap(data));
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
                        stateValue={hotelGeneralInformation}
                        changeState={(data) => {
                          dispatch(
                            addHotelActions.setHotelGeneralInformation(data)
                          );
                          onSaveHotel(data);
                        }}
                        objectTypeName={objectTypeProperty.name}
                      />
                    </Suspense>
                  );
                },
              },
            ],
          },
          {
            stepTitle: "Фотографии",
            stepScreens: [
              {
                id: "ImageUploadForm",
                render(props) {
                  return (
                    <Suspense fallback={<PageLoader />}>
                      <ImageUploadForm
                        changeState={(data) => {
                          dispatch(addHotelActions.setFile(data));
                        }}
                        stateValue={imageFiles}
                        {...props}
                      />
                    </Suspense>
                  );
                },
              },
            ],
          },
        ]}
        onComplete={onComlete}
      />
    </Box>
  );
};

export default AddHotelPage;
