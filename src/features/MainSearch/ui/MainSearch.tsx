import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { DubleCalendar } from "./Calendar";
import { useState } from "react";
import { format } from "date-fns";
export const MainSearch = () => {
  const [dates, setDates] = useState<CalendarValues>({});

  const handleSelectDate = (dates: CalendarValues) => {
    // console.log(format(new Date(dates.start), "yyyy-mm-dd"));
    // console.log(format(new Date(dates.end), "yyyy-mm-dd"));
    setDates(dates);
  };

  return (
    <Stack direction="row" gap={0} maxW="3xl" w="100%" minH={14} mt={10}>
      <Input
        boxShadow="xs"
        h={"auto"}
        borderLeft={"0"}
        borderLeftRadius={"full"}
      />
      <Input boxShadow="xs" h={"auto"} borderRadius={"none"} />
      <Input boxShadow="xs" h={"auto"} borderRadius={"none"} />

      <Popover>
        <InputGroup>
          <PopoverTrigger>
            <Input h={"auto"} borderRightRadius={"full"} />
            
          </PopoverTrigger>
          <InputLeftElement w={14} height={"100%"}>
            <Button colorScheme="red" w={12} h={12} borderRadius={"full"}>
              <SearchIcon />
            </Button>
          </InputLeftElement>
        </InputGroup>

        <PopoverContent w={"100%"}>
          <DubleCalendar dates={dates} handleSelectDate={handleSelectDate} />
        </PopoverContent>
      </Popover>
    </Stack>
  );
};
