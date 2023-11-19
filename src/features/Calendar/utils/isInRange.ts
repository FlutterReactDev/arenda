import { isWithinInterval, min, max } from "date-fns";
import { toDay } from "./toDay";

export const isInRange = (date: Date, start: Date | null, end: Date | null) => {
  if (start && end) {
    const minDate = min([toDay(start), toDay(end)]);
    const maxDate = max([toDay(start), toDay(end)]);

    return isWithinInterval(toDay(date), { start: minDate, end: maxDate });
  }

  return false;
};
