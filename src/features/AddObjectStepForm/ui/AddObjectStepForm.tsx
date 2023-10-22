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
import { FormStepper } from "@shared/ui/FormSteppter";
import { PageLoader } from "@shared/ui/PageLoader";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { Suspense } from "react";
import { InferType } from "yup";
export const AddObjectStepForm = () => {
  const dispatch = useAppDispatch();
  const addressData = useAppSelector(getForm(0, 0)) as InferType<
    typeof addressFormSchema
  >;
  const selectMapData = useAppSelector(getForm(1, 0)) as InferType<
    typeof selectMapSchema
  >;
  const files = useAppSelector(getForm(4, 0)) as InferType<typeof fileSchema>;

  const { city, country, region } = useAppSelector(
    (state) => state.addObjectForm
  );

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
                      stateValue={selectMapData}
                      changeState={(data) => {
                        dispatch(
                          addObjectStepActions.setForm({
                            screen: 1,
                            step: 0,
                            data,
                          })
                        );
                      }}
                      city={city?.name}
                      country={country?.name}
                      region={region?.name}
                      house={addressData.house}
                      streetName={addressData.streetName}
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
                  <Suspense fallback={<PageLoader />}>
                    <GeneralInformationForm {...props} />
                  </Suspense>
                );
              },
            },
            {
              id: "FacilitiesForm",
              render(props) {
                return (
                  <Suspense fallback={<PageLoader />}>
                    <FacilitiesForm {...props} />
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
                  <Suspense fallback={<PageLoader />}>
                    <PriceForm {...props} />
                  </Suspense>
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
