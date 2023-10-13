import { Button, Divider, HStack, StackProps } from "@chakra-ui/react";
import { ResultSearchInput } from "./ResultSearchInput";
import { ResultSearchDatepicker } from "./ResultSearchDatepicker";
import { ResultSearchGuest } from "./ResultSearchGuest";
import { useRef, LegacyRef, FC } from "react";
import { SearchIcon } from "@chakra-ui/icons";
interface ResultSearch extends StackProps {}
export const ResultSearch: FC<ResultSearch> = (props) => {
  const containerRef = useRef() as LegacyRef<HTMLDivElement>;
  return (
    <HStack
      ref={containerRef}
      {...props}
      bgColor="blackAlpha.100"
      rounded={"full"}
      py={2}
      position={"relative"}
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
