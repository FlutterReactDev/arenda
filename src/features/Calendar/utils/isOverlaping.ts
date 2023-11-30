import { isEqual } from "date-fns";

export const isOverlaping = (
  firstDate: {
    start: Date;
    end: Date;
  },
  secondDate: {
    start: Date;
    end: Date;
  }
) => {
  if (
    firstDate.end < secondDate.start ||
    isEqual(firstDate.end, secondDate.start) ||
    firstDate.start > secondDate.end ||
    isEqual(firstDate.start, secondDate.end)
  ) {
    return false;
  }

  return true;
};
