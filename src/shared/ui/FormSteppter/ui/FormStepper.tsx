import {
  Box,
  Container,
  Stack,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
} from "@chakra-ui/react";
import { FC, PropsWithChildren, ReactNode, useEffect } from "react";
import { FormNavigation, FormStep } from "..";
import { useSearchParams } from "react-router-dom";
import { FormStepperProvider } from "./FormStepperContext";
import { FormCard } from "@shared/ui/FormCard";

export interface FormStepRenderProps {
  onNext?: () => void;
  onPrev?: () => void;
  navigation?: ReactNode;
}
export interface FormStepperProps {
  forms?: {
    stepTitle: string;
    stepScreens: {
      id: number | string;
      render?: (props: FormStepRenderProps) => ReactNode;
    }[];
  }[];
  onComplete?: () => void;
  finalView?: ReactNode;
}

export interface FormStepValue {
  step: number;
  screen: number;
}

export const FormStepper: FC<PropsWithChildren<FormStepperProps>> = (props) => {
  const { forms, onComplete, finalView } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    console.log(searchParams.get("step"));

    if (searchParams.get("step") == undefined) {
      searchParams.set("step", "0");
    }

    if (searchParams.get("screen") == undefined) {
      searchParams.set("screen", "0");
    }

    // setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const onNext = () => {
    if (forms) {
      const queryStep = Number(searchParams.get("step"));
      const queryScreen = Number(searchParams.get("screen"));

      const step = forms[queryStep];

      const nextScreen = step.stepScreens[queryScreen + 1] || undefined;

      if (nextScreen != undefined) {
        searchParams.set("screen", `${queryScreen + 1}`);
        setSearchParams(searchParams);
        // setCurrentActiveForm((prevState) => {
        //   return { ...prevState, screen: prevState.screen + 1 };
        // });
      }

      if (nextScreen == undefined && forms[queryStep + 1] != undefined) {
        searchParams.set("step", `${Number(searchParams.get("step")) + 1}`);
        searchParams.set("screen", `0`);
        setSearchParams(searchParams);
        // setCurrentActiveForm((prevState) => {
        //   return { ...prevState, step: prevState.step + 1, screen: 0 };
        // });
      }

      if (
        forms.length - 1 == Number(searchParams.get("step")) &&
        forms[forms.length - 1].stepScreens.length - 1 ==
          Number(searchParams.get("step"))
      ) {
        onComplete && onComplete();
      }

      if (
        finalView &&
        forms.length - 1 == Number(searchParams.get("step")) &&
        forms[forms.length - 1].stepScreens.length - 1 ==
          Number(searchParams.get("screen"))
      ) {
        searchParams.set("step", `${Number(forms.length)}`);
        searchParams.set("screen", `0`);
        setSearchParams(searchParams);
        // setCurrentActiveForm({ screen: 0, step: forms.length });
      }
    }
  };

  const onPrev = () => {
    if (forms) {
      const queryStep = Number(searchParams.get("step"));
      const queryScreen = Number(searchParams.get("screen"));
      const step = forms[queryStep];
      const nextScreen = step?.stepScreens[queryScreen - 1];

      if (nextScreen != undefined) {
        // setCurrentActiveForm((prevState) => {
        //   return { ...prevState, screen: prevState.screen - 1 };
        // });
        searchParams.set("screen", `${Number(searchParams.get("screen")) - 1}`);
        setSearchParams(searchParams);
      }

      if (
        nextScreen == undefined &&
        forms[Number(searchParams.get("step")) - 1] != undefined
      ) {
        searchParams.set(
          "screen",
          `${forms[queryStep - 1].stepScreens.length - 1}`
        );
        searchParams.set("step", `${queryStep - 1}`);
        setSearchParams(searchParams);

        // setCurrentActiveForm((prevState) => {
        //   return {
        //     ...prevState,
        //     step: prevState.step - 1,
        //     screen: forms[currentActiveForm.step - 1].stepScreens.length - 1,
        //   };
        // });
      }
    }
  };

  return (
    <Box minH="100vh" pt={4} pb={"24"} bgColor={"blackAlpha.100"}>
      <FormStepperProvider
        screen={Number(searchParams.get("screen"))}
        step={Number(searchParams.get("step"))}
      >
        <Stepper
          margin="0 auto"
          maxW={"5xl"}
          px={4}
          size="lg"
          colorScheme="red"
          index={Number(searchParams.get("step"))}
          mb={6}
        >
          {forms?.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>

              <Stack direction={["column", "row"]} flexShrink="0">
                <StepTitle>{step.stepTitle}</StepTitle>
              </Stack>

              <StepSeparator />
            </Step>
          ))}
        </Stepper>
        <Container maxW={"2xl"}>
          {forms &&
            forms.map((form, step) => {
              const { stepScreens } = form;

              return stepScreens.map(({ render, id }, screen) => {
                return (
                  <FormStep key={id} step={step} screen={screen}>
                    {render &&
                      render({
                        onNext,
                        onPrev,
                        navigation: (
                          <FormNavigation onPrev={onPrev} onNext={onNext} />
                        ),
                      })}
                  </FormStep>
                );
              });
            })}

          {finalView && forms && (
            <FormStep screen={0} step={forms.length}>
              <Stack spacing={2}>
                <FormCard title="Ваше объявление почти готово! Проверьте главное:">
                  {finalView}
                </FormCard>

                <FormNavigation onPrev={onPrev} onNext={onNext} />
              </Stack>
            </FormStep>
          )}
        </Container>
      </FormStepperProvider>
    </Box>
  );
};
