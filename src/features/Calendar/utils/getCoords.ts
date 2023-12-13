import { eachDayOfInterval, isSameDay, isSameMonth } from "date-fns";
import { Calendar } from "dayzed";
import { getWeekIndex } from "./getWeekIndex";
import { toDay } from "./toDay";

export const getCoords = (
  minDate: Date,
  maxDate: Date,
  calendars: Calendar[]
) => {
  const MAX_DAY = 7;

  const width = eachDayOfInterval({
    start: toDay(minDate),
    end: toDay(maxDate),
  }).length;

  const left = MAX_DAY - (MAX_DAY - getWeekIndex(minDate));
  const top = calendars
    .filter((calendar) => {
      return isSameMonth(calendar.firstDayOfMonth, minDate);
    })[0]
    .weeks.map((week, weekIdx) => {
      const day = week.filter((day) => day && isSameDay(day.date, minDate))[0];

      if (day) {
        return weekIdx;
      }
    })
    .filter((i) => i != undefined)[0] as number;

  return {
    width,
    left,
    top,
  };
};
