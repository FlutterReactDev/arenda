import { Text, Stack, HStack, Tag, Box, Center } from "@chakra-ui/react";

import { DesktopSearchInput } from "./DesktopSearchInput";
import { DesktopGuests } from "./DesktopGuests";
import { DesktopDatepicker } from "./DesktopDatepicker";
import { LegacyRef, useRef } from "react";

export const DesktopSearch = () => {
  const containerRef = useRef() as LegacyRef<HTMLDivElement>;
  return (
    <Box>
      <Stack
        ref={containerRef}
        direction="row"
        gap={0}
        w="870px"
        minH={14}
        mt={10}
        position={"relative"}
      >
        <DesktopSearchInput />
        <DesktopDatepicker containerRef={containerRef} />
        <DesktopGuests />
      </Stack>
      <Center>
        <HStack gap={"2"} mt={5}>
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
