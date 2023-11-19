import { eachDayOfInterval } from "date-fns";
import { CalendarAvailability } from "../model/types";

export const createTestEvents = (objectId: number): CalendarAvailability[] => {
  const minDate = new Date(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 6,
      new Date().getDate()
    )
  );

  const maxDate = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 12,
    new Date().getDate()
  );

  return eachDayOfInterval({
    start: minDate,
    end: maxDate,
  }).map((date, idx) => {
    return {
      color: "red",
      comment: "Тестовая хуйня",
      createdDate: new Date(),
      id: idx,
      maxDate: date,
      minDate: date,
      objectId,
      totalSum: 0,
    };
  });
};
