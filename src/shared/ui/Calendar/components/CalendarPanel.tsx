import { VStack, SimpleGrid, Box, Stack } from "@chakra-ui/react";
import { useDayzed, Props as DayzedHookProps, DateObj } from "dayzed";

import React, { useMemo, useCallback, SyntheticEvent } from "react";
import { CalendarConfigs, DatepickerProps } from "../utils/commonTypes";

import { DayOfMonth } from "./DayOfMonth";
import { Weekday } from "./Weekday";
import { MonthName } from "./MonthName";

export interface CalendarPanelProps extends DatepickerProps {
  dayzedHookProps: Omit<DayzedHookProps, "children" | "render">;
  configs: CalendarConfigs;
  disabledDates?: Set<number>;
  onMouseEnterHighlight?: (date: Date) => void;
  isInRange?: (date: Date) => boolean | null;

  hoveredDate: Date | null;
}

export const CalendarPanel: React.FC<CalendarPanelProps> = ({
  dayzedHookProps,
  configs,

  disabledDates,
  onMouseEnterHighlight,
  isInRange,
  hoveredDate,
}) => {
  const renderProps = useDayzed(dayzedHookProps);
  const { calendars } = renderProps;

  const { onDateSelected } = dayzedHookProps;
  const onSelect = (
    dateObj: DateObj,
    event: SyntheticEvent<Element, Event>
  ) => {
    onDateSelected(dateObj, event);
  };

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
  if (calendars.length <= 0) {
    return null;
  }

  return (
    <Stack
      className="datepicker-calendar"
      direction={["column", "column", "row"]}
      w="full"
      h="full"
    >
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

            <SimpleGrid
              h="full"
              w="full"
              columns={7}
              textAlign="center"
              alignItems={"center"}
              justifyItems={"center"}
              alignSelf={"center"}
              justifySelf={"center"}
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
                      getDateProps={onSelect}
                      disabledDates={disabledDates}
                      onMouseEnter={onMouseEnter}
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
};
