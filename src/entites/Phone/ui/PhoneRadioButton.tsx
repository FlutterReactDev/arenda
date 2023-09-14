import { Box, HStack, UseRadioProps, useRadio } from "@chakra-ui/react";
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
      <HStack
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          borderColor: "red.600",
        }}
        px={4}
        py={2}
        w={"full"}
        justifyContent={"space-between"}
      >
        {props.children}
      </HStack>
    </Box>
  );
};
