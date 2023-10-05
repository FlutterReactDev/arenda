import { useContext } from "react";
import { FormStepperContext } from "./FormStepperContext";

export const useFormStepper = () => {
  return useContext(FormStepperContext);
};
