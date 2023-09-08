import { VStack, SimpleGrid, Box, Stack, Button } from "@chakra-ui/react";
import { useDayzed, Props as DayzedHookProps, DateObj } from "dayzed";

import React, { useMemo, useCallback, SyntheticEvent, memo } from "react";
import { CalendarConfigs, DatepickerProps } from "../utils/commonTypes";

import { DayOfMonth } from "./DayOfMonth";
import { Weekday } from "./Weekday";
import { MonthName } from "./MonthName";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { isEqual } from "date-fns";

export interface CalendarPanelProps extends DatepickerProps {
  dayzedHookProps: Omit<DayzedHookProps, "children" | "render">;
  configs: CalendarConfigs;
  disabledDates?: Set<number>;
  onMouseEnterHighlight?: (date: Date) => void;
  isInRange?: (date: Date) => boolean | null;
  getDistanceDay: (date: Date) => number | null;
  hoveredDate: Date | null;
  showTooltipOnHover: boolean;
  showTooltipOnSelect: boolean;
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
  }) => {
    const renderProps = useDayzed(dayzedHookProps);
    const { calendars, getBackProps, getForwardProps } = renderProps;

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

    return (
      <Stack
        className="datepicker-calendar"
        direction={["column", "column", "row"]}
        w="full"
        h="full"
        position={"relative"}
      >
        <Button
          {...getBackProps({ calendars })}
          position={"absolute"}
          top={"20px"}
          left={"20px"}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          {...getForwardProps({ calendars })}
          position={"absolute"}
          top={"20px"}
          right={"20px"}
        >
          <ChevronRightIcon />
        </Button>
        {calendars.map((calendar, calendarIdx) => {
          return (
            <VStack
              key={calendarIdx}
              height="100%"
              padding="0.5rem 0.75rem"
              w="full"
            >
              <MonthName
                key={`${calendar.month}-${calendar.year}-${calendarIdx}`}
                monthName={configs.monthNames[calendar.month]}
              />
              {/* <Button {...getForwardProps({ calendars })}>{">"}</Button> */}

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
                        distance={getDistanceDay(date)}
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
