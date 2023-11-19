import {
  addDays,
  eachDayOfInterval,
  eachMonthOfInterval,
  isPast,
  isSaturday,
  isSunday,
  isToday,
  lastDayOfMonth,
  startOfMonth,
} from "date-fns";

export const getAllDays = (start: Date, end: Date) => {
  const monts = eachMonthOfInterval({
    start,
    end,
  });

  return monts.map((date) => {
    return {
      monthDate: date,
      days: eachDayOfInterval({
        start: startOfMonth(date),
        end: lastDayOfMonth(date),
      }).map((date) => {
        const isWeekday = isSaturday(date) || isSunday(date);

        return {
          date,
          isToday: isToday(date),
          isPastDay: isPast(addDays(date, 1)),
          isWeekday,
        };
      }),
    };
  });
};
