import { RangeDatepicker } from "@shared/ui/Calendar";
import { FC, memo } from "react";

interface RangeDatepickerProps {
  dates: Date[];
  handleSelectDate: (date: Date[]) => void;
}

const MobileRangeDatepicker: FC<RangeDatepickerProps> = memo((props) => {
  const { dates, handleSelectDate } = props;
  return (
    <RangeDatepicker
      selectedDates={dates}
      onDateChange={handleSelectDate}
      monthsToDisplay={12}
      showTooltipOnHover={false}
      showTooltipOnSelect
      isMobile
    />
  );
});

export default MobileRangeDatepicker;
