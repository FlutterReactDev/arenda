import { Button, Divider, HStack } from "@chakra-ui/react";
import { ResultSearchInput } from "./ResultSearchInput";
import { ResultSearchDatepicker } from "./ResultSearchDatepicker";
import { ResultSearchGuest } from "./ResultSearchGuest";
import { useRef, LegacyRef } from "react";
import { SearchIcon } from "@chakra-ui/icons";

export const ResultSearch = () => {
  const containerRef = useRef() as LegacyRef<HTMLDivElement>;
  return (
    <HStack
      ref={containerRef}
      bgColor="blackAlpha.100"
      rounded={"full"}
      py={2}
      position={"relative"}
      maxWidth={"70%"}
      margin={"0 auto"}
      tabIndex={2}
    >
      <ResultSearchInput />
      <Divider orientation="vertical" borderColor={"gray.400"} h={"10"} />
      <ResultSearchDatepicker containerRef={containerRef} />
      <Divider orientation="vertical" borderColor={"gray.400"} h={"10"} />
      <ResultSearchGuest />
      <Button
        colorScheme="red"
        minW={12}
        h={12}
        borderRadius={"full"}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <SearchIcon />
      </Button>
    </HStack>
  );
};
