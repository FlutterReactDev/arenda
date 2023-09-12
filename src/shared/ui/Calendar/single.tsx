import {
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { FC } from "react";
import { CalendarPanel } from "./components/CalendarPanel";
import { CalendarConfigs, OnDateSelected } from "./utils/commonTypes";
import { Month_Names_Full, Weekday_Names_Short } from "./utils/calendarUtils";
interface SingleDatepickerProps {
  onChange: (date: Date) => void;
  value: Date;
  selected: Date;
  onClose: () => void;
}

const DefaultConfigs: CalendarConfigs = {
  dateFormat: "MM/dd/yyyy",
  monthNames: Month_Names_Full,
  dayNames: Weekday_Names_Short,
  firstDayOfWeek: 0,
};

export const SingleDatepicker: FC<SingleDatepickerProps> = (props) => {
  const { onChange, selected, value } = props;
  const { onOpen, onClose, isOpen } = useDisclosure();
  const handleOnDateSelected: OnDateSelected = ({ selectable, date }) => {
    if (!selectable) return;
    if (date instanceof Date && !isNaN(date.getTime())) {
      onChange(date);
      onClose();
      return;
    }
  };

  return (
    <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
      <PopoverTrigger>
        <Input value={selected && format(selected, "yyyy-mm-dd")} />
      </PopoverTrigger>
      <PopoverContent w="full">
        <CalendarPanel
          dayzedHookProps={{
            selected,
            onDateSelected: handleOnDateSelected,
            monthsToDisplay: 1,
            date: new Date(),
            firstDayOfWeek: 0,
          }}
          configs={DefaultConfigs}
          showTooltipOnHover={false}
          showTooltipOnSelect={false}
          hoveredDate={null}
        />
      </PopoverContent>
    </Popover>
  );
};
