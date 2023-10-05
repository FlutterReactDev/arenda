import { FC, PropsWithChildren } from "react";
import { useFormStepper } from "./useFromStepper";
import { FormScreen } from "..";
interface FormStepProps {
  step: number;
  screen: number;
}
export const FormStep: FC<PropsWithChildren<FormStepProps>> = (props) => {
  const currentActiveForm = useFormStepper();
  const { children, screen, step } = props;

  if (currentActiveForm?.screen == screen && currentActiveForm.step == step) {
    return (
      <FormScreen
        isIn={
          currentActiveForm?.screen == screen && currentActiveForm.step == step
        }
      >
        {children}
      </FormScreen>
    );
  }
};
