import {
  Calendar,
  CalendarControls,
  CalendarPrevButton,
  CalendarNextButton,
  CalendarMonths,
  CalendarMonth,
  CalendarMonthName,
  CalendarWeek,
  CalendarDays,
  CalendarValues,
  CalendarDate,
} from "@uselessdev/datepicker";
import { FC } from "react";
import { ru } from "date-fns/locale";
const MONTHS = 2;

interface DubleCalendarProps {
  dates: CalendarValues;
  handleSelectDate: (dates: CalendarValues | CalendarDate) => void;
}
export const DubleCalendar: FC<DubleCalendarProps> = ({
  dates,
  handleSelectDate,
}) => {
  return (
    <Calendar
      locale={ru}
      value={dates}
      onSelectDate={handleSelectDate}
      months={MONTHS}
    >
      <CalendarControls>
        <CalendarPrevButton />
        <CalendarNextButton />
      </CalendarControls>

      <CalendarMonths gap={8}>
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
