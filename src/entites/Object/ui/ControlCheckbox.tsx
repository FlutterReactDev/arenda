import { Checkbox } from "@chakra-ui/react";

import { ReactNode } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type ControlCheckboxProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  children: ReactNode;
};

export const ControlCheckbox = <T extends FieldValues>(
  props: ControlCheckboxProps<T>
) => {
  const { control, name, children } = props;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { name, onBlur, onChange, ref, value, disabled } }) => {
        return (
          <Checkbox
            onChange={onChange}
            isChecked={!!value}
            name={name}
            onBlur={onBlur}
            ref={ref}
            disabled={disabled}
            colorScheme="red"
            minW="49%"
          >
            {children}
          </Checkbox>
        );
      }}
    />
  );
};
