import {
  Input,
  InputGroup,
  InputRightElement,
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
import { CalendarIcon } from "@chakra-ui/icons";
interface SingleDatepickerProps {
  onChange: (date: Date) => void;
  placeholder: string;
  selected: Date;
}

export const DefaultConfigs: CalendarConfigs = {
  dateFormat: "MM/dd/yyyy",
  monthNames: Month_Names_Full,
  dayNames: Weekday_Names_Short,
  firstDayOfWeek: 0,
};

export const SingleDatepicker: FC<SingleDatepickerProps> = (props) => {
  const { onChange, selected, placeholder } = props;
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
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom-start"
    >
      <PopoverTrigger>
        <InputGroup>
          <InputRightElement cursor="pointer">
            <CalendarIcon />
          </InputRightElement>
          <Input
            placeholder={placeholder}
            value={selected && format(selected, "yyyy-mm-dd")}
            type="date"
          />
        </InputGroup>
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
          showNavigationButton
        />
      </PopoverContent>
    </Popover>
  );
};
