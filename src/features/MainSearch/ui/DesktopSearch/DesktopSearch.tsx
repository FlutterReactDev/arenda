import {
  Text,
  Stack,
  HStack,
  Tag,
  Box,
  Center,
  useDisclosure,
} from "@chakra-ui/react";

import { DesktopSearchInput } from "./DesktopSearchInput";
import { DesktopGuests } from "./DesktopGuests";
import { DesktopDatepicker } from "./DesktopDatepicker";
import { LegacyRef, useRef } from "react";

export const DesktopSearch = () => {
  const containerRef = useRef() as LegacyRef<HTMLDivElement>;
  const { onOpen, isOpen, onClose } = useDisclosure();
  return (
    <Box>
      <Stack
        ref={containerRef}
        direction="row"
        gap={0}
        w={isOpen ? "870px" : "700px"}
        transition={"0.3s"}
        minH={14}
        mt={10}
        position={"relative"}
        boxShadow={"xl"}
        rounded={"full"}
        onFocus={onOpen}
        onBlur={onClose}
      >
        <DesktopSearchInput />
        <DesktopDatepicker containerRef={containerRef} />
        <DesktopGuests />
      </Stack>
      <Center>
        <HStack gap={"2"} mt={10}>
          <Text>Например:</Text>
          <Tag rounded={"full"}>Санкт-Петербург</Tag>
          <Tag rounded={"full"}>Санкт-Петербург</Tag>
          <Tag rounded={"full"}>Санкт-Петербург</Tag>
          <Tag rounded={"full"}>Санкт-Петербург</Tag>
        </HStack>
      </Center>
    </Box>
  );
};
