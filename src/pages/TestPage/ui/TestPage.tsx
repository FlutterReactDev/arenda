import { getCalendars } from "@shared/ui/Calendar/createCalendar";
import { useCallback, useMemo, useState } from "react";
import { Box } from "@chakra-ui/react";
import { CalendarDay } from "./CalendarDay";
export const TestPage = () => {
  const [selected, setSelected] = useState<Date>(new Date());
  const currentDate = useMemo(() => new Date(), []);
  const calendars = useMemo(
    () =>
      getCalendars({
        date: currentDate,
        maxDate: undefined,
        minDate: undefined,
        selected,
        showOutsideDays: false,
        firstDayOfWeek: 0,
        monthsToDisplay: 12,
        offset: 1,
      }),
    [selected]
  );

  const onDateSelect = useCallback((date: Date) => {
    setSelected(date);
  }, []);

  return (
    <div>
      {calendars.map((calendar, calendarIdx) => {
        const key = `${calendar.year}${calendar.month}${calendarIdx}`;
        return (
          <Box key={key}>
            {calendar.weeks.map((weeks, weeksIdx) => {
              return weeks.map((week, weekIdx) => {
                return (
                  <CalendarDay
                    onDateSelect={onDateSelect}
                    date={week.date}
                    selected={week.selected}
                    key={`${calendar.year}${calendar.month}${calendarIdx}${weeksIdx}${weekIdx}`}
                  />
                );
              });
            })}
          </Box>
        );
      })}
    </div>
  );
};
