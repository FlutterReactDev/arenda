import { Box, UseRadioProps, useRadio } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
export const PhoneRadioButton: FC<PropsWithChildren<UseRadioProps>> = (
  props
) => {
  const { getInputProps, getRadioProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          borderColor: "red.600",
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
};
