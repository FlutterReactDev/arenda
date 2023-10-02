import React, { useState } from "react";
import { Props as DayzedHookProps } from "dayzed";
import { Month_Names_Short, Weekday_Names_Short } from "./utils/calendarUtils";
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
  propsConfigs,
  selected,
}) => {
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);

  // Calendar level
  const onMouseLeave = () => {
    setHoveredDate(null);
  };

  // Date level
  const onMouseEnterHighlight = (date: Date) => {
    setHoveredDate(date);
  };

  const isInRange = (date: Date) => {
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
  };

  return (
    <Flex h="full" onMouseLeave={onMouseLeave}>
      <CalendarPanel
        dayzedHookProps={dayzedHookProps}
        configs={configs}
        propsConfigs={propsConfigs}
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
  monthNames: Month_Names_Short,
  dayNames: Weekday_Names_Short,
  firstDayOfWeek: 0,
};

export const RangeDatepicker: React.FC<RangeDatepickerProps> = ({
  configs,
  propsConfigs = {},
  monthsToDisplay = 2,
  ...props
}) => {
  const { selectedDates, minDate, maxDate, onDateChange, onClose } = props;

  // chakra popover utils
  const [offset, setOffset] = useState(0);

  const calendarConfigs: CalendarConfigs = {
    ...DefaultConfigs,
    ...configs,
  };

  const handleOnDateSelected: OnDateSelected = ({ selectable, date }) => {
    if (!selectable) {
      return;
    }
    const newDates = [...selectedDates];

    if (selectedDates.length) {
      if (selectedDates.length === 1) {
        const firstTime = selectedDates[0];
        if (firstTime < date) {
          newDates.push(date);
        } else {
          newDates.unshift(date);
        }
        onDateChange(newDates);
        onClose && onClose();
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
        minDate: minDate,
        maxDate: maxDate,
        offset: offset,
        onOffsetChanged: setOffset,
        firstDayOfWeek: calendarConfigs.firstDayOfWeek,
      }}
      configs={calendarConfigs}
      propsConfigs={propsConfigs}
      selected={selectedDates}
    />
  );
};
