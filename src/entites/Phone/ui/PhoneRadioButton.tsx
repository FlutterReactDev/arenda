import { Box, HStack, Tag, UseRadioProps, useRadio } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
export const PhoneRadioButton: FC<PropsWithChildren<UseRadioProps>> = (
  props
) => {
  const {
    getInputProps,
    getRadioProps,
    state: { isChecked },
  } = useRadio(props);

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
        position="relative"
        _checked={{
          borderColor: "red.600",
        }}
        px={4}
        py={2}
        w={"full"}
        justifyContent={"space-between"}
      >
        {isChecked && (
          <Tag
            position="absolute"
            top={0}
            left={0}
            transform={"translateY(-50%) translateX(10%)"}
            size={"sm"}
            colorScheme="red"
            rounded={"full"}
          >
            Основной
          </Tag>
        )}
        {!isChecked && (
          <Tag
            position="absolute"
            top={0}
            left={0}
            transform={"translateY(-50%) translateX(10%)"}
            size={"sm"}
            colorScheme="gray"
            rounded={"full"}
          >
            Дополнительный
          </Tag>
        )}

        {props.children}
      </HStack>
    </Box>
  );
};
