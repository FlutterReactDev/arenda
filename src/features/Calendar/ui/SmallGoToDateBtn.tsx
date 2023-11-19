import { CalendarIcon } from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { CalendarPanel, DefaultConfigs } from "@shared/ui/Calendar";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { addDays, addMonths, subMonths } from "date-fns";

import { calendarActions } from "..";
import { getCalendarActions } from "../model/selectors";
import { toDay } from "../utils/toDay";

export const SmallGoToDateBtn = () => {
  const dispatch = useAppDispatch();

  const { onClose, isOpen, onOpen } = useDisclosure();

  const { beginDate } = useAppSelector(getCalendarActions);
  return (
    <Popover isLazy isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <IconButton colorScheme="twitter" aria-label="open calendar" isRound>
          <CalendarIcon />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent>
        <Flex h="full">
          <CalendarPanel
            dayzedHookProps={{
              selected: beginDate,
              onDateSelected: ({ date }) => {
                dispatch(calendarActions.setBeginDate(addDays(date, 1)));
                onClose();
              },
              monthsToDisplay: 1,
              date: beginDate,
            }}
            configs={DefaultConfigs}
            showTooltipOnHover={false}
            showTooltipOnSelect={false}
            hoveredDate={null}
            showNavigationButton
            minDate={subMonths(toDay(new Date()), 6)}
            maxDate={addMonths(toDay(new Date()), 12)}
          />
        </Flex>
      </PopoverContent>
    </Popover>
  );
};
