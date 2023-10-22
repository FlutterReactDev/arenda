import { RootState } from "@app/providers/StoreProvider";

import { addDays, eachDayOfInterval, isEqual } from "date-fns";

export const getColumnDays = (state: RootState) => {
  const start = state.calendar.common.beginDate;
  const end = addDays(
    state.calendar.common.beginDate,
    state.calendar.common.countDay
  );
  const result = eachDayOfInterval({
    start,
    end,
  }).map((date, index) => {
    return {
      date,
      isMonth:
        index == 0 && !isEqual(end, date) || date.getDate() == 1 ? true : false,
    };
  });

  return result;
};
