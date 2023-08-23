import {
  Calendar,
  CalendarValues,
  CalendarControls,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonths,
  CalendarMonth,
  CalendarMonthName,
  CalendarWeek,
  CalendarDays,
  CalendarDate,
} from "@uselessdev/datepicker";
import { ru } from "date-fns/locale";
import { FC } from "react";

interface MobileCalendar {
  dates: CalendarValues;
  handleSelectDate: (value: CalendarValues | CalendarDate) => void;
}

const CalendarMobile: FC<MobileCalendar> = (props) => {
  const { dates, handleSelectDate } = props;
  const MONTHS = 12;
  return (
    <Calendar
      locale={ru}
      value={dates as CalendarValues}
      onSelectDate={handleSelectDate}
      months={MONTHS}
      highlightToday
    >
      <CalendarControls>
        <CalendarPrevButton />
        <CalendarNextButton />
      </CalendarControls>

      <CalendarMonths display={"flex"} flexDirection={"column"} gap={6}>
        {[...Array(MONTHS).keys()].map((month) => (
          <CalendarMonth month={month} key={month}>
            <CalendarMonthName />
            <CalendarWeek />
            <CalendarDays />
          </CalendarMonth>
        ))}
      </CalendarMonths>
    </Calendar>
  );
};


export default CalendarMobile