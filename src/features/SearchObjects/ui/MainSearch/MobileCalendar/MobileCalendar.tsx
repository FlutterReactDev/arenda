import { RangeDatepicker } from "@shared/ui/Calendar";
import { FC, memo } from "react";

interface MobileCalendar {
  dates: Date[];
  handleSelectDate: (date: Date[]) => void;
}

const CalendarMobile: FC<MobileCalendar> = memo((props) => {
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

export default CalendarMobile;
