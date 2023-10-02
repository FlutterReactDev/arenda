import {
  HStack,
  VStack,
  Heading,
  Divider,
  SimpleGrid,
  Box,
  Stack,
} from "@chakra-ui/react";
import { useDayzed, Props as DayzedHookProps } from "dayzed";

import React, { useMemo } from "react";
import { CalendarConfigs, DatepickerProps } from "../utils/commonTypes";
import { DatepickerBackBtns, DatepickerForwardBtns } from "./DateNavBtns";
import { DayOfMonth } from "./DayOfMonth";

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
  propsConfigs,
  disabledDates,
  onMouseEnterHighlight,
  isInRange,
  hoveredDate,
}) => {
  const renderProps = useDayzed(dayzedHookProps);
  const { calendars, getBackProps, getForwardProps } = renderProps;

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

  // looking for a useRef() approach to replace it

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
            <HStack w="full" justifyContent={"center"}>
              <DatepickerBackBtns
                calendars={calendars}
                getBackProps={getBackProps}
                propsConfigs={propsConfigs}
              />
              <Heading
                size="sm"
                minWidth={"5rem"}
                textAlign="center"
                {...propsConfigs?.dateHeadingProps}
              >
                {configs.monthNames[calendar.month]} {calendar.year}
              </Heading>
              <DatepickerForwardBtns
                calendars={calendars}
                getForwardProps={getForwardProps}
                propsConfigs={propsConfigs}
              />
            </HStack>
            <Divider />
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
              {weekdayNames.map((day, dayIdx) => (
                <Box
                  fontSize="sm"
                  fontWeight="semibold"
                  key={dayIdx}
                  {...propsConfigs?.weekdayLabelProps}
                >
                  {day}
                </Box>
              ))}
              {calendar.weeks.map((week, weekIdx) => {
                return week.map((dateObj, index) => {
                  const key = `${calendar.month}-${calendar.year}-${weekIdx}-${index}`;
                  if (!dateObj) return <Box key={key} />;

                  const { date } = dateObj;

                  return (
                    <DayOfMonth
                      key={key}
                      dateObj={dateObj}
                      propsConfigs={propsConfigs}
                      renderProps={renderProps}
                      isInRange={isInRange && isInRange(date)}
                      isLast={
                        hoveredDate &&
                        dayzedHookProps.selected.length == 1 &&
                        hoveredDate?.getTime() == date.getTime()
                      }
                      disabledDates={disabledDates}
                      onMouseEnter={() => {
                        if (onMouseEnterHighlight) onMouseEnterHighlight(date);
                      }}
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
