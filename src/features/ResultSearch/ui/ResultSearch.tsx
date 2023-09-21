import { Divider, HStack } from "@chakra-ui/react";
import { ResultSearchInput } from "./ResultSearchInput";
import { ResultSearchCalendar } from "./ResultSearchCalendar";

export const ResultSearch = () => {
  return (
    <HStack bgColor="blackAlpha.50" rounded={"full"}>
      <ResultSearchInput />
      <Divider orientation="vertical" />
      <ResultSearchCalendar />
    </HStack>
  );
};
