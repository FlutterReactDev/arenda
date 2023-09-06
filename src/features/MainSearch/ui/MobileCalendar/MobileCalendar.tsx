import { RangeDatepicker } from "@shared/ui/Calendar";
import { FC } from "react";

interface MobileCalendar {
  dates: Date[];
  handleSelectDate: (date: Date[]) => void;
}

const CalendarMobile: FC<MobileCalendar> = (props) => {
  const { dates, handleSelectDate } = props;

  return (
    <RangeDatepicker
      selectedDates={dates}
      onDateChange={handleSelectDate}
      monthsToDisplay={12}
    />
  );
};

export default CalendarMobile;
