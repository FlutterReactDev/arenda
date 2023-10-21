import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  Box,
  Collapse,
  FormControl,
  FormErrorMessage,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
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
    <Box ref={selectRef}>
      <FormControl isInvalid={!!errors}>
        <HStack spacing={0} bgColor={"gray.200"} rounded={"lg"}>
          <InputGroup onClick={onToggle}>
            <Input
              bgColor={"white"}
              placeholder="Выберите возраст"
              readOnly
              cursor={"pointer"}
              _focusVisible={{
                bgColor: "none",
              }}
              value={
                options?.filter((option) => option.value == propsValue)[0]
                  ?.label
              }
            />
            <InputRightElement cursor={"pointer"}>
              <ChevronDownIcon w={"6"} h={"6"} />
            </InputRightElement>
          </InputGroup>

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
  );
});
