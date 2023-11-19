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
import {
  addDays,
  addYears,
  differenceInDays,
  isEqual,
  isSameDay,
  subDays,
} from "date-fns";

interface RangeCalendarPanelProps {
  dayzedHookProps: DayzedHookProps;
  configs: CalendarConfigs;
  propsConfigs?: PropsConfigs;
  selected?: Date[];
  showTooltipOnHover: boolean;
  showTooltipOnSelect: boolean;
  showNavigationButton: boolean;
}

export const RangeCalendarPanel: React.FC<RangeCalendarPanelProps> = memo(
  ({
    dayzedHookProps,
    configs,
    selected,
    showTooltipOnHover,
    showNavigationButton,
    showTooltipOnSelect,
  }) => {
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
        if (
          showTooltipOnHover &&
          hoveredDate &&
          Array.isArray(selected) &&
          selected.length == 1
        ) {
          if (isEqual(date, hoveredDate) && Array.isArray(selected)) {
            return Math.abs(differenceInDays(date, selected[0]));
          }
        }

        if (
          showTooltipOnSelect &&
          Array.isArray(selected) &&
          selected.length == 2
        ) {
          return Math.abs(differenceInDays(selected[1], selected[0]));
        }

        return null;
      },
      [hoveredDate, selected, showTooltipOnHover, showTooltipOnSelect]
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
          showTooltipOnSelect={showTooltipOnSelect}
          showTooltipOnHover={showTooltipOnHover}
          showNavigationButton={showNavigationButton}
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
  showTooltipOnHover: boolean;
  showTooltipOnSelect: boolean;
  isMobile?: boolean;
}

const DefaultConfigs: CalendarConfigs = {
  dateFormat: "MM/dd/yyyy",
  monthNames: Month_Names_Full,
  dayNames: Weekday_Names_Short,
  firstDayOfWeek: 0,
};

export const RangeDatepicker: React.FC<RangeDatepickerProps> = memo(
  ({
    monthsToDisplay = 2,
    selectedDates,
    onDateChange,
    onClose,
    showTooltipOnHover = true,
    showTooltipOnSelect = false,
    isMobile = false,
  }) => {
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
              if (isSameDay(newDates[0], date)) {
                onClose && onClose();
                return [newDates[0], addDays(date, 1)];
              }
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
              return [date];
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
          maxDate: addYears(new Date(), 1),
          firstDayOfWeek: 1,
        }}
        configs={DefaultConfigs}
        showTooltipOnHover={showTooltipOnHover}
        showTooltipOnSelect={showTooltipOnSelect}
        selected={selectedDates}
        showNavigationButton={!isMobile}
      />
    );
  }
);
