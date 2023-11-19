import {
  isFriday,
  isMonday,
  isSaturday,
  isSunday,
  isThursday,
  isTuesday,
  isWednesday,
} from "date-fns";

export const getWeekIndex = (date: Date) => {
  if (isMonday(date)) {
    return 0;
  }

  if (isTuesday(date)) {
    return 1;
  }

  if (isWednesday(date)) {
    return 2;
  }
  if (isThursday(date)) {
    return 3;
  }

  if (isFriday(date)) {
    return 4;
  }

  if (isSaturday(date)) {
    return 5;
  }
  if (isSunday(date)) {
    return 6;
  }
  return -1;
};
