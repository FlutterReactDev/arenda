import { createContext, FC, PropsWithChildren } from "react";
import { FormStepValue } from "./FormStepper";

export const FormStepperContext = createContext<FormStepValue | null>(null);

export const FormStepperProvider: FC<PropsWithChildren<FormStepValue>> = (
  props
) => {
  const { children, screen, step } = props;
  return (
    <FormStepperContext.Provider
      value={{
        screen,
        step,
      }}
    >
      {children}
    </FormStepperContext.Provider>
  );
};
