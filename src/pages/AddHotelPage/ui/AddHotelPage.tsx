import { Box } from "@chakra-ui/react";
import {
  HotelGeneralInformationForm,
  addHotelActions,
  getAddressData,
  getLocationMap,
  SelectLocationMapForm,
  AddressForm,
  ImageUploadForm,
} from "@entites/Object";
import { getImageFiles } from "@entites/Object/model/selectors";

import { FormStepper } from "@shared/ui/FormSteppter";
import { PageLoader } from "@shared/ui/PageLoader";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { Header } from "@widgets/Header";
import { Suspense } from "react";

export const AddHotelPage = () => {
  const onComlete = () => {};
  const dispatch = useAppDispatch();

  const { city, country, region } = useAppSelector(
    (state) => state.addObjectForm
  );
  const addressData = useAppSelector(getAddressData);
  const selectLocationData = useAppSelector(getLocationMap);

  const imageFiles = useAppSelector(getImageFiles);
  return (
    <Box>
      <Header />
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
                        city={city?.label}
                        house={addressData.house}
                        streetName={addressData.streetName}
                        country={country?.label}
                        region={region?.label}
                        stateValue={selectLocationData}
                        changeState={(data) => {
                          dispatch(addHotelActions.setLocationMap(data));
                        }}
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
                      <HotelGeneralInformationForm {...props} />
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
