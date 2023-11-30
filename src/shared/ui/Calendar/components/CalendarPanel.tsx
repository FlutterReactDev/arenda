import {
  Box,
  IconButton,
  SimpleGrid,
  Stack,
  VStack,
  useMediaQuery,
} from "@chakra-ui/react";
import { DateObj, Props as DayzedHookProps, useDayzed } from "dayzed";

import React, { SyntheticEvent, memo, useCallback, useMemo } from "react";
import { CalendarConfigs, DatepickerProps } from "../utils/commonTypes";

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { isEqual } from "date-fns";
import { CalendarHeader } from "./CalendarHeader";
import { DayOfMonth } from "./DayOfMonth";
import { Weekday } from "./Weekday";

export interface CalendarPanelProps extends DatepickerProps {
  dayzedHookProps: Omit<DayzedHookProps, "children" | "render">;
  configs: CalendarConfigs;
  disabledDates?: Set<number>;
  onMouseEnterHighlight?: (date: Date) => void;
  isInRange?: (date: Date) => boolean | null;
  getDistanceDay?: (date: Date) => number | null;
  hoveredDate: Date | null;
  showTooltipOnHover: boolean;
  showTooltipOnSelect: boolean;
  showNavigationButton: boolean;
}

export const CalendarPanel: React.FC<CalendarPanelProps> = memo(
  ({
    dayzedHookProps,
    configs,
    disabledDates,
    onMouseEnterHighlight,
    isInRange,
    hoveredDate,
    getDistanceDay,
    showTooltipOnHover,
    showTooltipOnSelect,
    showNavigationButton,
  }) => {
    const renderProps = useDayzed(dayzedHookProps);
    const { calendars, getBackProps, getForwardProps } = renderProps;
    const [isLessThan880] = useMediaQuery("(max-width: 900px)");
    const [isLarger880] = useMediaQuery("(min-width: 900px)");
    const { onDateSelected } = dayzedHookProps;

    const weekdayNames = useMemo(() => {
      const firstDayOfWeek = configs.firstDayOfWeek;
      const dayNames = configs.dayNames;
      if (firstDayOfWeek && firstDayOfWeek > 0) {
        return configs.dayNames
          .slice(firstDayOfWeek, dayNames.length)
          .concat(dayNames.slice(0, firstDayOfWeek));
      }
      return dayNames;
    }, [configs.firstDayOfWeek, configs.dayNames]);

    const onMouseEnter = useCallback(
      (date: Date) => {
        onMouseEnterHighlight && onMouseEnterHighlight(date);
      },
      [onMouseEnterHighlight]
    );
    const onSelect = useCallback(
      (dateObj: DateObj, event: SyntheticEvent<Element, Event>) => {
        onDateSelected(dateObj, event);
      },
      [onDateSelected]
    );

    if (calendars.length <= 0) {
      return null;
    }
    const adaptive = () => {
      if (isLarger880) {
        return "row";
      }
      if (isLessThan880) {
        return "column";
      }
    };

    return (
      <Stack
        direction={adaptive()}
        position={"relative"}
        alignItems={"center"}
        justifyContent={"center"}
        pt={10}
        w="full"
      >
        {showNavigationButton && (
          <>
            <IconButton
              aria-label="left arrow"
              colorScheme="red"
              {...getBackProps({ calendars })}
              position={"absolute"}
              top={"8px"}
              left={"8px"}
              isRound
              fontSize={"lg"}
            >
              <ChevronLeftIcon />
            </IconButton>

            <IconButton
              aria-label="right arrow"
              isRound
              colorScheme="red"
              {...getForwardProps({ calendars })}
              position={"absolute"}
              top={"8px"}
              right={"8px"}
              fontSize={"lg"}
            >
              <ChevronRightIcon />
            </IconButton>
          </>
        )}

        {calendars.map((calendar, calendarIdx) => {
          return (
            <VStack
              key={calendarIdx}
              height="100%"
              padding="0.5rem 0.75rem"
              w="full"
              alignItems={"center"}
            >
              <CalendarHeader
                key={`${calendar.month}-${calendar.year}-${calendarIdx}`}
                monthName={configs.monthNames[calendar.month]}
                year={calendar.year}
              />
              <SimpleGrid
                h="full"
                w="full"
                columns={7}
                textAlign="center"
                alignItems={"center"}
                justifyItems={"center"}
                alignSelf={"center"}
                justifySelf={"center"}
                spacing={1}
              >
                <Weekday
                  weekdayNames={weekdayNames}
                  key={`${calendar.month}-${calendar.year}-${calendarIdx}`}
                />
                {calendar.weeks.map((week, weekIdx) => {
                  return week.map((dateObj, index) => {
                    const key = `${calendar.month}-${calendar.year}-${weekIdx}-${index}`;
                    if (!dateObj) return <Box key={key} />;

                    const { date } = dateObj;

                    return (
                      <DayOfMonth
                        key={key}
                        dateObj={dateObj}
                        renderProps={renderProps}
                        isInRange={(isInRange && isInRange(date)) || false}
                        isLast={
                          hoveredDate != null &&
                          Array.isArray(dayzedHookProps?.selected) &&
                          dayzedHookProps?.selected.length == 1 &&
                          hoveredDate?.getTime() == date.getTime()
                        }
                        isSelectedLast={
                          Array.isArray(dayzedHookProps?.selected) &&
                          dayzedHookProps?.selected.length == 2 &&
                          isEqual(date, dayzedHookProps.selected[1])
                        }
                        getDateProps={onSelect}
                        disabledDates={disabledDates}
                        onMouseEnter={onMouseEnter}
                        distance={getDistanceDay && getDistanceDay(date)}
                        showTooltipOnHover={showTooltipOnHover}
                        showTooltipOnSelect={showTooltipOnSelect}
                      />
                    );
                  });
                })}
              </SimpleGrid>
            </VStack>
          );
        })}
      </Stack>
    );
  }
);
