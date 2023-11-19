import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import {
  addDays,
  format,
  getOverlappingDaysInIntervals,
  isPast,
  isSameDay,
  isWithinInterval,
  max,
  min,
} from "date-fns";
import { ru } from "date-fns/locale";
import { Calendar } from "dayzed";
import { Dispatch, FC, SetStateAction, memo, useCallback } from "react";
import { CalendarDetailItemCell } from "./CalendarDetailItemCell";

import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { calendarActions } from "..";
import { getObject, getObjectAvailibility } from "../model/selectors";

import { useSidebar } from "../model/useSidebar";
import { isInRange } from "../utils/isInRange";
import { CalendarDetailAvailability } from "./CalendarDetailAvailibiliity";

interface CalendarDetailItemProps {
  calendar: Calendar;
  range: {
    in: null | Date;
    out: null | Date;
  };
  setRange: Dispatch<
    SetStateAction<{
      in: Date | null;
      out: Date | null;
    }>
  >;

  availabilities: CalendarDetailAvailability[];
  id: number;
  objectId: number;
}

export const Weekdays = memo(() => {
  return (
    <>
      <GridItem justifySelf={"center"}>
        <Text fontSize={"lg"}>пн</Text>
      </GridItem>
      <GridItem justifySelf={"center"}>
        <Text fontSize={"lg"}>вт</Text>
      </GridItem>
      <GridItem justifySelf={"center"}>
        <Text fontSize={"lg"}>ср</Text>
      </GridItem>
      <GridItem justifySelf={"center"}>
        <Text fontSize={"lg"}>чт</Text>
      </GridItem>
      <GridItem justifySelf={"center"}>
        <Text fontSize={"lg"}>пт</Text>
      </GridItem>
      <GridItem justifySelf={"center"}>
        <Text fontSize={"lg"} color={"red.600"}>
          сб
        </Text>
      </GridItem>
      <GridItem justifySelf={"center"}>
        <Text fontSize={"lg"} color={"red.600"}>
          вс
        </Text>
      </GridItem>
    </>
  );
});
export const CalendarDetailItem: FC<CalendarDetailItemProps> = memo((props) => {
  const {
    calendar,
    range,
    setRange,

    availabilities,
    id,
    objectId,
  } = props;
  const { objectDefaultPerDayCost, seasonsPrice } = useAppSelector(
    getObject(objectId)
  );
  const [isLessThan968] = useMediaQuery("(max-width: 968px)");
  const availability = useAppSelector(getObjectAvailibility(objectId));
  const dispatch = useAppDispatch();
  const { onOpen } = useSidebar();

  const onMoveHandler = (date: Date) => {
    setRange((prevRanges) => {
      let isCanSelect = true;

      if (prevRanges.in != null) {
        isCanSelect = !!availability.filter((a) => {
          return (
            isWithinInterval(date, {
              start: a.minDate,
              end: a.maxDate,
            }) ||
            isWithinInterval(a.minDate, {
              start: min([prevRanges.in as Date, date]),
              end: max([prevRanges.in as Date, date]),
            }) ||
            isWithinInterval(a.maxDate, {
              start: min([prevRanges.in as Date, date]),
              end: max([prevRanges.in as Date, date]),
            }) ||
            !!getOverlappingDaysInIntervals(
              {
                start: min([prevRanges.in as Date, date]),
                end: max([prevRanges.in as Date, date]),
              },
              {
                start: a.minDate,
                end: a.maxDate,
              }
            )
          );
        }).length;

        if (!isCanSelect) {
          dispatch(calendarActions.setRangeOut(date));
        }

        if (!isCanSelect) {
          return { ...prevRanges, out: date };
        }
      }

      return prevRanges;
    });
  };
  const onDownHandler = (date: Date) => {
    const isCanSelect = availability.filter((a) => {
      return isWithinInterval(date, {
        start: a.minDate,
        end: a.maxDate,
      });
    });
    setRange((prevRange) => {
      if (!prevRange.in && isCanSelect.length == 0) {
        dispatch(calendarActions.setRangeIn(date));
        dispatch(calendarActions.setRangeOut(date));
      }
      return { ...prevRange, in: date };
    });
  };
  const onUpHandler = () => {
    setRange((prevState) => {
      if (prevState.in && prevState.out) {
        const minDate = min([prevState.in, prevState.out]);
        const maxDate = max([prevState.in, prevState.out]);
        dispatch(calendarActions.setRangeIn(minDate));
        dispatch(calendarActions.setRangeOut(maxDate));
        onOpen({
          objectId,
        });

        return {
          in: minDate,
          out: maxDate,
        };
      } else if (prevState.in && !prevState.out) {
        dispatch(calendarActions.setRangeOut(prevState.in));
        onOpen({
          objectId,
        });
        return {
          in: prevState.in,
          out: prevState.in,
        };
      }

      return prevState;
    });
  };

  const onMove = useCallback((date: Date) => {
    onMoveHandler(date);
  }, []);

  const onDown = useCallback((date: Date) => {
    onDownHandler(date);
  }, []);

  const onUp = useCallback(() => {
    onUpHandler();
  }, []);

  return (
    <Box id={`calendar${id}`}>
      <Heading size={"lg"} textTransform={"capitalize"}>
        {format(calendar.firstDayOfMonth, "MMMM yyyy", { locale: ru })}
      </Heading>
      <Grid
        gridTemplateColumns={
          !isLessThan968 ? "repeat(7, 96px)" : "repeat(7, 67px)"
        }
        gridTemplateRows={
          !isLessThan968 ? "30px repeat(6, 96px)" : "30px repeat(6, 67px)"
        }
        gridGap={"1px"}
        pos={"relative"}
        mt={4}
      >
        <Weekdays />
        {calendar.weeks.map((week, weekIdx) => {
          return week.map((day, dayIdx) => {
            const key = `${calendar.month}-${calendar.year}-${weekIdx}-${dayIdx}`;
            if (day != "") {
              return (
                <CalendarDetailItemCell
                  key={key}
                  cost={
                    seasonsPrice.filter((price) =>
                      isSameDay(price.date, day.date)
                    )[0]?.cost || objectDefaultPerDayCost
                  }
                  date={day.date}
                  inRange={
                    isInRange(day.date, range.in, range.out) ||
                    !!(
                      range.in &&
                      isWithinInterval(day.date, {
                        start: range.in,
                        end: range.in,
                      })
                    )
                  }
                  isBlocked={
                    !!availability.filter((a) => {
                      return isWithinInterval(day.date, {
                        start: a.minDate,
                        end: a.maxDate,
                      });
                    }).length
                  }
                  onMouseDown={onDown}
                  onMouseMove={onMove}
                  onMouseUp={onUp}
                  isPast={isPast(addDays(day.date, 1))}
                />
              );
            }
            return <GridItem key={key} />;
          });
        })}
        {availabilities?.map((availability, idx) => {
          const key = `${availability.left}-${top}-${availability.comment}-${idx}`;
          return <CalendarDetailAvailability {...availability} key={key} />;
        })}
      </Grid>
    </Box>
  );
});
