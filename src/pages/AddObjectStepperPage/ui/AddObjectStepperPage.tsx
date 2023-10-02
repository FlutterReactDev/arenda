import {
  Box,
  SlideFade,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Stack,
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";

import React, { RefObject, useEffect } from "react";
import { FirstFormStep } from "./FirstFormStep";
import { SearchLocationMap } from "./SelectLocationMap";
import { ThirdFormStep } from "./ThirdFormStep";
import { useSearchParams } from "react-router-dom";
import { ForthFormStep } from "./ForthFormStep";
import { Header } from "@widgets/Header";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { ImageUpload } from "./ImageUpload";
import { HeadingForm } from "./HeadingForm";
import { PostingRulesForm } from "./PostingRulesForm";
import { CheckInCheckOutForm } from "./CheckInCheckOutForm";
import { HowGuestBookForm } from "./HowGuestBookForm";
import { BookingSettingForm } from "./BookingSettingForm";
import { CalendarInfoForm } from "./CalendarInfoForm";
import { PriceForm } from "./PriceForm";
// import { DiscountsForm } from "./DiscountsForm";
import { OptionalServiceForm } from "./OptionalServiceForm";

const steps = [
  { title: "1 Шаг", description: "Об объекте" },
  { title: "2 Шаг", description: "Date & Time" },
  { title: "3 Шаг", description: "Select Rooms" },
];
export const AddObjectStepperPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const forms = useAppSelector((state) => state.addOBject.forms);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const cancelRef = React.useRef() as RefObject<HTMLButtonElement>;
  const { activeStep, setActiveStep } = useSteps({
    index: Number(searchParams.get("step")),
    count: steps.length,
  });

  useEffect(() => {
    if (searchParams.get("step") === null) {
      searchParams.set("step", "0");
      setSearchParams(searchParams);
    }

    if (searchParams.get("screen") === null) {
      searchParams.set("screen", "1");
      setSearchParams(searchParams);
    }

    const { screen, step } = forms.filter(
      (form) =>
        form.screen == Number(searchParams.get("screen")) &&
        form.step == Number(searchParams.get("step"))
    )[0];

    const restForm = forms.slice(
      0,
      forms.findIndex((form) => form.screen == screen && form.step == step)
    );

    const emptyForm = restForm.filter((form) => {
      return Object.keys(form.data).length === 0;
    });

    if (emptyForm.length != 0) {
      searchParams.set("step", emptyForm[0].step.toString());
      searchParams.set("screen", emptyForm[0].screen.toString());
      setSearchParams(searchParams);
      onOpen();
    }
  }, [forms, onOpen, searchParams, setSearchParams]);

  useEffect(() => {
    // fetch(
    //   `https://catalog.api.2gis.com/3.0/items/geocode?lon=77.17568420280779&lat=42.644730660741175&fields=items.point,items.address,items.adm_div&type=adm_div.district_area&key=demo`
    // ).then((res) => {
    //   console.log(res.json());
    // });
    fetch(
      `https://catalog.api.2gis.com/3.0/suggests?q=Кыргызстан Бостери&fields=items.point,items.name_ex,items.rubrics,items.org,items.adm_div,items.routes,items.type,items.subtype,items.address,items.search_attributes.personal_priority,items.search_attributes.dgis_source_type,items.search_attributes.dgis_found_by_address,items.segment_id,items.region_id,items.locale,items.group,items.context,search_attributes,items.flags,items.has_exchange,items.ads.options&type=adm_div.region,adm_div.district_area,adm_div.city,adm_div.settlement,adm_div.district,adm_div.living_area,adm_div.division,adm_div.place,street,branch,building,road,attraction,crossroad,route,route_type,station,station.metro,user_queries,attribute,rubric,meta_rubric,org,special,coordinates,kilometer_road_sign&viewpoint1=77.17534951496107,42.64697794798821&viewpoint2=77.17686189669992,42.64364062175027&key=demo`
    ).then((res) => {
      console.log(res.json());
    });
  }, []);
  const onChangeScreen = (nextScreen: number) => {
    searchParams.set("screen", nextScreen.toString());
    setSearchParams(searchParams);
  };

  const onChangeStep = (nextStep: number) => {
    searchParams.set("step", nextStep.toString());
    setSearchParams(searchParams);
    setActiveStep(nextStep);
  };

  return (
    <>
      <Header />
      <Box minH="100vh" pt={4} bgColor={"blackAlpha.100"}>
        <Stepper
          margin="0 auto"
          maxW={"5xl"}
          size="lg"
          colorScheme="red"
          index={activeStep}
        >
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Stack direction={["column", "row"]} flexShrink="0">
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </Stack>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Box margin="0 auto" maxWidth={"2xl"} mt={10}>
          {Number(searchParams.get("step")) == 0 &&
            Number(searchParams.get("screen")) == 1 && (
              <SlideFade
                in={Number(searchParams.get("screen")) == 1}
                offsetY={0}
                offsetX={"60px"}
              >
                <FirstFormStep onChangeScreen={onChangeScreen} />
              </SlideFade>
            )}
          {Number(searchParams.get("step")) == 0 &&
            Number(searchParams.get("screen")) == 2 && (
              <SlideFade
                in={Number(searchParams.get("screen")) == 2}
                offsetY={0}
                offsetX={"60px"}
              >
                <SearchLocationMap onChangeScreen={onChangeScreen} />
              </SlideFade>
            )}
          {Number(searchParams.get("step")) == 0 &&
            Number(searchParams.get("screen")) == 3 && (
              <SlideFade
                in={Number(searchParams.get("screen")) == 3}
                offsetY={0}
                offsetX={"60px"}
              >
                <ThirdFormStep onChangeScreen={onChangeScreen} />
              </SlideFade>
            )}
          {Number(searchParams.get("step")) == 0 &&
            Number(searchParams.get("screen")) == 4 && (
              <SlideFade
                in={Number(searchParams.get("screen")) == 4}
                offsetY={0}
                offsetX={"60px"}
              >
                <ForthFormStep onChangeScreen={onChangeScreen} />
              </SlideFade>
            )}
          {Number(searchParams.get("step")) == 0 &&
            Number(searchParams.get("screen")) == 5 && (
              <SlideFade
                in={Number(searchParams.get("screen")) == 5}
                offsetY={0}
                offsetX={"60px"}
              >
                <ImageUpload onChangeScreen={onChangeScreen} />
              </SlideFade>
            )}
          {Number(searchParams.get("step")) == 0 &&
            Number(searchParams.get("screen")) == 6 && (
              <SlideFade
                in={Number(searchParams.get("screen")) == 6}
                offsetY={0}
                offsetX={"60px"}
              >
                <HeadingForm
                  onChangeStep={onChangeStep}
                  onChangeScreen={onChangeScreen}
                />
              </SlideFade>
            )}
          {Number(searchParams.get("step")) == 1 &&
            Number(searchParams.get("screen")) == 1 && (
              <SlideFade
                in={Number(searchParams.get("screen")) == 1}
                offsetY={0}
                offsetX={"60px"}
              >
                <PostingRulesForm
                  onChangeStep={onChangeStep}
                  onChangeScreen={onChangeScreen}
                />
              </SlideFade>
            )}
          {Number(searchParams.get("step")) == 1 &&
            Number(searchParams.get("screen")) == 2 && (
              <SlideFade
                in={Number(searchParams.get("screen")) == 2}
                offsetY={0}
                offsetX={"60px"}
              >
                <CheckInCheckOutForm onChangeScreen={onChangeScreen} />
              </SlideFade>
            )}
          {Number(searchParams.get("step")) == 1 &&
            Number(searchParams.get("screen")) == 3 && (
              <SlideFade
                in={Number(searchParams.get("screen")) == 3}
                offsetY={0}
                offsetX={"60px"}
              >
                <HowGuestBookForm onChangeScreen={onChangeScreen} />
              </SlideFade>
            )}
          {Number(searchParams.get("step")) == 1 &&
            Number(searchParams.get("screen")) == 4 && (
              <SlideFade
                in={Number(searchParams.get("screen")) == 4}
                offsetY={0}
                offsetX={"60px"}
              >
                <BookingSettingForm onChangeScreen={onChangeScreen} />
              </SlideFade>
            )}
          {Number(searchParams.get("step")) == 1 &&
            Number(searchParams.get("screen")) == 5 && (
              <SlideFade
                in={Number(searchParams.get("screen")) == 5}
                offsetY={0}
                offsetX={"60px"}
              >
                <CalendarInfoForm
                  onChangeStep={onChangeStep}
                  onChangeScreen={onChangeScreen}
                />
              </SlideFade>
            )}
          {Number(searchParams.get("step")) == 2 &&
            Number(searchParams.get("screen")) == 1 && (
              <SlideFade
                in={Number(searchParams.get("screen")) == 1}
                offsetY={0}
                offsetX={"60px"}
              >
                <PriceForm
                  onChangeStep={onChangeStep}
                  onChangeScreen={onChangeScreen}
                />
              </SlideFade>
            )}
          {/* {Number(searchParams.get("step")) == 2 &&
            Number(searchParams.get("screen")) == 2 && (
              <SlideFade
                in={Number(searchParams.get("screen")) == 2}
                offsetY={0}
                offsetX={"60px"}
              >
                <DiscountsForm onChangeScreen={onChangeScreen} />
              </SlideFade>
            )} */}
          {Number(searchParams.get("step")) == 2 &&
            Number(searchParams.get("screen")) == 2 && (
              <SlideFade
                in={Number(searchParams.get("screen")) == 2}
                offsetY={0}
                offsetX={"60px"}
              >
                <OptionalServiceForm
                  onChangeStep={onChangeStep}
                  onChangeScreen={onChangeScreen}
                />
              </SlideFade>
            )}
        </Box>
      </Box>

      <AlertDialog
        isOpen={isOpen}
        onClose={onClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              СТОП!
            </AlertDialogHeader>

            <AlertDialogBody>
              Вы пытаетесь перейти на другой этам формы, при это не заполнив
              текущий
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button colorScheme="red" ref={cancelRef} onClick={onClose}>
                Закрыть
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
