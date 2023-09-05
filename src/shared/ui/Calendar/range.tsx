import React, { useState, useCallback, memo } from "react";
import { Props as DayzedHookProps } from "dayzed";
import { Month_Names_Full, Weekday_Names_Short } from "./utils/calendarUtils";
import { Flex } from "@chakra-ui/react";
import { CalendarPanel } from "./components/CalendarPanel";
import {
  CalendarConfigs,
  DatepickerConfigs,
  DatepickerProps,
  OnDateSelected,
  PropsConfigs,
} from "./utils/commonTypes";
import { differenceInDays, isEqual, subDays } from "date-fns";

interface RangeCalendarPanelProps {
  dayzedHookProps: DayzedHookProps;
  configs: CalendarConfigs;
  propsConfigs?: PropsConfigs;
  selected?: Date[];
}

export const RangeCalendarPanel: React.FC<RangeCalendarPanelProps> = memo(
  ({ dayzedHookProps, configs, selected }) => {
    const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

    // Calendar level
    const onMouseLeave = useCallback(() => {
      setHoveredDate(null);
    }, []);

    // Date level
    const onMouseEnterHighlight = useCallback((date: Date) => {
      setHoveredDate(date);
    }, []);

    const isInRange = useCallback(
      (date: Date) => {
        if (selected) {
          const firstSelected = selected[0];

          if (selected.length === 2) {
            const secondSelected = selected[1];
            return firstSelected < date && secondSelected > date;
          } else {
            return (
              hoveredDate &&
              ((firstSelected < date && hoveredDate >= date) ||
                (date < firstSelected && date >= hoveredDate))
            );
          }
        }
        return null;
      },
      [hoveredDate, selected]
    );

    const getDistanceDay = useCallback(
      (date: Date) => {
        if (hoveredDate) {
          if (isEqual(date, hoveredDate) && Array.isArray(selected)) {
            return Math.abs(differenceInDays(date, selected[0]));
          }
        }

        return null;
      },
      [hoveredDate, selected]
    );

    return (
      <Flex h="full" onMouseLeave={onMouseLeave}>
        <CalendarPanel
          dayzedHookProps={dayzedHookProps}
          configs={configs}
          isInRange={isInRange}
          hoveredDate={hoveredDate}
          getDistanceDay={getDistanceDay}
          onMouseEnterHighlight={onMouseEnterHighlight}
        />
      </Flex>
    );
  }
);

export interface RangeDatepickerProps extends DatepickerProps {
  selectedDates: Date[];
  configs?: DatepickerConfigs;
  disabled?: boolean;
  defaultIsOpen?: boolean;
  closeOnSelect?: boolean;
  onClose?: () => void;
  onDateChange: (date: Date[]) => void;
  id?: string;
  name?: string;
  usePortal?: boolean;
  monthsToDisplay?: number;
}

const DefaultConfigs: CalendarConfigs = {
  dateFormat: "MM/dd/yyyy",
  monthNames: Month_Names_Full,
  dayNames: Weekday_Names_Short,
  firstDayOfWeek: 0,
};

export const RangeDatepicker: React.FC<RangeDatepickerProps> = memo(
  ({ monthsToDisplay = 2, selectedDates, onDateChange, onClose }) => {
    // chakra popover utils

    const handleOnDateSelected: OnDateSelected = useCallback(
      ({ selectable, date }) => {
        if (!selectable) {
          return;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onDateChange((selectedDates: Date[]) => {
          const newDates = [...selectedDates];
          if (selectedDates.length) {
            if (selectedDates.length === 1) {
              const firstTime = selectedDates[0];
              if (firstTime < date) {
                newDates.push(date);
              } else {
                newDates.unshift(date);
              }

              onClose && onClose();
              return newDates;
            }

            if (newDates.length === 2) {
              onDateChange([date]);
              return newDates;
            }
          }
          newDates.push(date);
          return newDates;
        });
      },
      []
    );

    // eventually we want to allow user to freely type their own input and parse the input

    return (
      <RangeCalendarPanel
        dayzedHookProps={{
          onDateSelected: handleOnDateSelected,
          selected: selectedDates,
          monthsToDisplay,
          date: new Date(),
          minDate: subDays(new Date(), 1),
          firstDayOfWeek: 0,
        }}
        configs={DefaultConfigs}
        selected={selectedDates}
      />
    );
  }
);
