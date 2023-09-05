import { differenceInDays } from "date-fns";

export const Month_Names_Full = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const Weekday_Names_Short = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
export const getDistanceDay = (a: Date | null, b: Date | undefined) => {
  if (a && b) {
    return differenceInDays(a, b);
  }
  return 0;
};
