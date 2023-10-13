import { UseCheckboxProps, chakra, useCheckbox, Text } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

export const CheckboxCard: FC<PropsWithChildren<UseCheckboxProps>> = (
  props
) => {
  const { children, ...checkboxProps } = props;
  const { state, getCheckboxProps, getInputProps, getLabelProps, htmlProps } =
    useCheckbox(checkboxProps);

  return (
    <chakra.label
      maxW="40"
      boxShadow={"xl"}
      rounded="full"
      px={3}
      py={1}
      cursor="pointer"
      bgColor={"gray.100"}
      {...(state.isChecked && {
        bg: "red.600",
      })}
      {...getCheckboxProps()}
      {...htmlProps}
    >
      <input {...getInputProps()} hidden />

      <Text
        color="gray.700"
        {...(state.isChecked && { color: "white" })}
        {...getLabelProps()}
      >
        {children}
      </Text>
    </chakra.label>
  );
};
