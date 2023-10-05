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
import { FC, PropsWithChildren, ReactNode, useEffect, useState } from "react";
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
  const [currentActiveForm, setCurrentActiveForm] = useState<FormStepValue>({
    step: 0,
    screen: 0,
  });

  useEffect(() => {
    searchParams.set("step", `${currentActiveForm.step}`);
    searchParams.set("screen", `${currentActiveForm.screen}`);
    setSearchParams(searchParams);
  }, [
    currentActiveForm.screen,
    currentActiveForm.step,
    searchParams,
    setSearchParams,
  ]);

  const onNext = () => {
    if (forms) {
      const step = forms[currentActiveForm.step];
      const nextScreen =
        step.stepScreens[currentActiveForm.screen + 1] || undefined;
      if (nextScreen != undefined) {
        setCurrentActiveForm((prevState) => {
          return { ...prevState, screen: prevState.screen + 1 };
        });
      }

      if (
        nextScreen == undefined &&
        forms[currentActiveForm.step + 1] != undefined
      ) {
        setCurrentActiveForm((prevState) => {
          return { ...prevState, step: prevState.step + 1, screen: 0 };
        });
      }

      if (
        forms.length - 1 == currentActiveForm.step &&
        forms[forms.length - 1].stepScreens.length - 1 ==
          currentActiveForm.screen
      ) {
        onComplete && onComplete();
      }

      if (
        finalView &&
        forms.length - 1 == currentActiveForm.step &&
        forms[forms.length - 1].stepScreens.length - 1 ==
          currentActiveForm.screen
      ) {
        setCurrentActiveForm({ screen: 0, step: forms.length });
      }
    }
  };

  const onPrev = () => {
    if (forms) {
      const step = forms[currentActiveForm.step];
      const nextScreen = step?.stepScreens[currentActiveForm.screen - 1];

      if (nextScreen != undefined) {
        setCurrentActiveForm((prevState) => {
          return { ...prevState, screen: prevState.screen - 1 };
        });
      }

      if (
        nextScreen == undefined &&
        forms[currentActiveForm.step - 1] != undefined
      ) {
        setCurrentActiveForm((prevState) => {
          return {
            ...prevState,
            step: prevState.step - 1,
            screen: forms[currentActiveForm.step - 1].stepScreens.length - 1,
          };
        });
      }
    }
  };

  return (
    <Box minH="100vh" pt={4} bgColor={"blackAlpha.100"}>
      <FormStepperProvider
        screen={currentActiveForm.screen}
        step={currentActiveForm.step}
      >
        <Stepper
          margin="0 auto"
          maxW={"5xl"}
          size="lg"
          colorScheme="red"
          index={currentActiveForm.step}
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
