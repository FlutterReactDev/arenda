import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import {
  addDays,
  differenceInDays,
  eachHourOfInterval,
  endOfDay,
  getHours,
  getOverlappingDaysInIntervals,
  isBefore,
  isEqual,
  isSameHour,
  setHours,
  startOfDay,
  subDays,
} from "date-fns";
import { toDay } from "../utils/toDay";
import {
  getColumnDays,
  getCommonSettings,
  getObjectAvailibilityById,
} from "./selectors";

export const useAvailibility = (id: number, objectId: number) => {
  const days = useAppSelector(getColumnDays);
  const { currentWidth } = useAppSelector(getCommonSettings);

  const hours = eachHourOfInterval({
    start: startOfDay(new Date()),
    end: endOfDay(new Date()),
  });
  const availability = useAppSelector(getObjectAvailibilityById(objectId, id));

  const { minDate, maxDate } = availability;

  const findLeftIndexHour = hours.findIndex((hour) =>
    isSameHour(hour, setHours(new Date(), getHours(minDate)))
  );
  const findRightIndexHour = hours.findIndex((hour) =>
    isSameHour(hour, setHours(new Date(), getHours(maxDate)))
  );

  const leftHourPercent = (findLeftIndexHour / hours.length) * 100;
  const rightHourPercent = (findRightIndexHour / hours.length) * 100;
  const leftIsVisible: boolean =
    isBefore(toDay(days[0].date), toDay(minDate)) ||
    isEqual(toDay(days[0].date), toDay(minDate));
  const rightIsVisible: boolean =
    isBefore(toDay(maxDate), toDay(days[days.length - 1].date)) ||
    isEqual(toDay(maxDate), toDay(days[days.length - 1].date));

  const leftHourPadding = leftIsVisible
    ? (leftHourPercent * currentWidth) / 100
    : 0;

  const rightPadding = rightIsVisible
    ? (rightHourPercent * currentWidth) / 100
    : currentWidth;

  const availabilityIsVisible = !!getOverlappingDaysInIntervals(
    {
      start: toDay(subDays(days[0].date, 1)),
      end: toDay(addDays(days[days.length - 1].date, 1)),
    },
    {
      start: toDay(minDate),
      end: toDay(maxDate),
    }
  );

  const getWidth = (minDate: Date, maxDate: Date) => {
    const daysOverlap = getOverlappingDaysInIntervals(
      {
        start: toDay(days[0].date),
        end: toDay(days[days.length - 1].date),
      },
      {
        start: toDay(minDate),
        end: toDay(maxDate),
      }
    );
    const width = daysOverlap * currentWidth - leftHourPadding + rightPadding;

    return width;
  };

  const getLeftPaddding = (minDate: Date) => {
    const daysCount = leftIsVisible
      ? differenceInDays(toDay(minDate), toDay(days[0].date))
      : 0;
    return daysCount * currentWidth + leftHourPadding;
  };

  return {
    width: getWidth(minDate, maxDate),
    leftPadding: getLeftPaddding(minDate),
    isLeftRounded: leftIsVisible,
    isRightRounded: rightIsVisible,
    isVisible: availabilityIsVisible,
    availability,
    leftHourPadding,
    rightPadding,
    leftHourPercent,
    rightHourPercent,
  };
};
