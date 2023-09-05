import React, { useState, useCallback } from "react";
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

interface RangeCalendarPanelProps {
  dayzedHookProps: DayzedHookProps;
  configs: CalendarConfigs;
  propsConfigs?: PropsConfigs;
  selected?: Date[];
}

export const RangeCalendarPanel: React.FC<RangeCalendarPanelProps> = ({
  dayzedHookProps,
  configs,
  selected,
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

  return (
    <Flex h="full" onMouseLeave={onMouseLeave}>
      <CalendarPanel
        dayzedHookProps={dayzedHookProps}
        configs={configs}
        isInRange={isInRange}
        hoveredDate={hoveredDate}
        onMouseEnterHighlight={onMouseEnterHighlight}
      />
    </Flex>
  );
};

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

export const RangeDatepicker: React.FC<RangeDatepickerProps> = ({
  monthsToDisplay = 2,
  selectedDates,
  onDateChange,
  onClose,
}) => {
  // chakra popover utils
  console.log(selectedDates);
  
  const handleOnDateSelected: OnDateSelected = ({ selectable, date }) => {
    console.log(selectedDates);
    if (!selectable) {
      return;
    }
    const newDates = [...selectedDates];

    if (selectedDates.length) {
      if (selectedDates.length === 1) {
        console.log("asdasdasdasdasdasdasds");

        const firstTime = selectedDates[0];
        if (firstTime < date) {
          newDates.push(date);
        } else {
          newDates.unshift(date);
        }
        onDateChange(newDates);
        // onClose && onClose();
        return;
      }

      if (newDates.length === 2) {
       

        onDateChange([date]);
        return;
      }
    } else {
      newDates.push(date);
      onDateChange(newDates);
    }
  };

  // eventually we want to allow user to freely type their own input and parse the input

  return (
    <RangeCalendarPanel
      dayzedHookProps={{
        onDateSelected: handleOnDateSelected,
        selected: selectedDates,
        monthsToDisplay,
        date: new Date(),
        minDate: new Date(),
        firstDayOfWeek: 0,
      }}
      configs={DefaultConfigs}
      selected={selectedDates}
    />
  );
};
