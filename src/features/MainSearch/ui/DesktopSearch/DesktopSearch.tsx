import {
  Text,
  Stack,
  HStack,
  Tag,
  Box,
  Center,
  useDisclosure,
  useMergeRefs,
} from "@chakra-ui/react";

import { DesktopSearchInput } from "./DesktopSearchInput";
import { DesktopGuests } from "./DesktopGuests";
import { DesktopDatepicker } from "./DesktopDatepicker";
import { RefObject, useRef, LegacyRef } from "react";
import { useInView } from "react-intersection-observer";

export const DesktopSearch = () => {
  const containerRef = useRef() as LegacyRef<HTMLDivElement>;
  const scrollRef = useRef() as RefObject<HTMLDivElement>;
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { ref, inView } = useInView({
    threshold: 1,
  });
  const refs = useMergeRefs(scrollRef, ref);

  const onFocus = () => {
    onOpen();
    if (!inView) {
      scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
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
        onFocus={onFocus}
        onBlur={onClose}
      >
        <DesktopSearchInput />
        <DesktopDatepicker containerRef={containerRef} />
        <DesktopGuests />
        <Box
          position={"absolute"}
          top={"-100%"}
          left={0}
          w="full"
          h={"600px"}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          ref={refs}
          zIndex={"hide"}
        ></Box>
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
