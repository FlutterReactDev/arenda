import { CalendarIcon, Search2Icon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";

export const DragObjectHeader = () => {
  return (
    <Box position={"absolute"} top={1} w="full" p={2} zIndex={"popover"}>
      <HStack
        bgColor={"white"}
        w="full"
        rounded={"xl"}
        alignItems={"center"}
        boxShadow={"lg"}
        p={4}
      >
        <InputGroup>
          <Input placeholder="Поиск" />
          <InputLeftElement>
            <Search2Icon />
          </InputLeftElement>
        </InputGroup>
        <IconButton aria-label="calendar button">
          <CalendarIcon />
        </IconButton>
      </HStack>
    </Box>
  );
};
