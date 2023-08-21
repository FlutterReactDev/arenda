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
} from "@uselessdev/datepicker";
const MONTHS = 2;
export const DubleCalendar = ({ dates, handleSelectDate }) => {
  return (
    <Calendar value={dates} onSelectDate={handleSelectDate} months={MONTHS}>
      <CalendarControls >
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
