import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { FC, RefObject, memo, useRef } from "react";
import { CollapseSelectItem } from "./ui/CollapseSelectItem";

interface CollapseSelectProps {
  onChange: (value: number | string) => void;
  options: {
    value: number | string;
    label: string;
  }[];
  value: (number | string) | undefined;
  onDelete: () => void;
  errors: string | undefined;
}

export const CollapseSelect: FC<CollapseSelectProps> = memo((props) => {
  const { onChange, options, value: propsValue, onDelete, errors } = props;
  const { isOpen, onToggle, onClose } = useDisclosure();
  const selectRef = useRef() as RefObject<HTMLDivElement>;
  useOutsideClick({
    ref: selectRef,
    handler: onClose,
  });
  return (
    <Box ref={selectRef} pos={"relative"}>
      <FormControl isInvalid={!!errors}>
        <HStack spacing={0} bgColor={"gray.200"} rounded={"lg"}>
          <Button
            bgColor={"white !important"}
            border="1px solid"
            borderColor={"gray.300"}
            onClick={onToggle}
            w="full"
            _active={{
              bgColor: "white",
            }}
            _focusVisible={{
              bgColor: "white",
            }}
            _focus={{
              bgColor: "white",
            }}
          >
            <HStack w="full" justifyContent={"space-between"}>
              <Text>
                {options?.filter((option) => option.value == propsValue)[0]
                  ?.label || "Выберите возраст"}
              </Text>
              <ChevronDownIcon w={"6"} h={"6"} />
            </HStack>
          </Button>
          <IconButton
            onClick={onDelete}
            bgColor={"transparent"}
            aria-label="delete button"
          >
            <CloseIcon />
          </IconButton>
        </HStack>
        <FormErrorMessage>{errors}</FormErrorMessage>
      </FormControl>
      <Box
        position={"absolute"}
        left={0}
        top={"100%"}
        zIndex={"popover"}
        w="full"
      >
        <Collapse in={isOpen} animateOpacity={false}>
          <Box p={1} py={2} bgColor={"gray.100"} mt={1} rounded={"lg"}>
            <Stack maxHeight={"200px"} overflowY={"auto"}>
              {options?.map(({ label, value }) => {
                return (
                  <CollapseSelectItem
                    label={label}
                    value={value}
                    key={`${label} + ${value}`}
                    onClose={onClose}
                    onChange={onChange}
                    selected={value == propsValue}
                  />
                );
              })}
            </Stack>
          </Box>
        </Collapse>
      </Box>
    </Box>
  );
});
