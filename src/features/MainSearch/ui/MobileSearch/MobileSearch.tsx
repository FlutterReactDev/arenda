import { VStack } from "@chakra-ui/react";
import { CalendarDate, CalendarValues } from "@uselessdev/datepicker";

import { useState } from "react";
import { MobileSearchInput } from "./MobileSearchInput";
import { MobileSearchGuests } from "./MobileSearchGuests";
import { MobileSearchDatePicker } from "./MobileSearchDatePicker";

export const MobileSearch = () => {
  const [calendarDates, setCalendarDates] = useState<CalendarValues | CalendarDate>({});

  const handleSelectDate = (dates: CalendarValues | CalendarDate) => {
    setCalendarDates(dates);
  };

  return (
    <VStack w={"full"} gap={"2"}>
      <MobileSearchInput />
      <MobileSearchDatePicker
        dates={calendarDates as CalendarValues}
        handleSelectDate={handleSelectDate}
      />
      <MobileSearchGuests />
    </VStack>
  );
};
