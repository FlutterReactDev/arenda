import { Grid, GridItem, HStack, useMediaQuery } from "@chakra-ui/react";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getColumnDays, getCommonSettings } from "../model/selectors";

import {
  addDays,
  getOverlappingDaysInIntervals,
  isBefore,
  isEqual,
  isSameDay,
  isWithinInterval,
  max,
  min,
} from "date-fns";
import { Availibility } from "./Availibility";
import { ObjectCell } from "./ObjectCell";

import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { FC, memo, useCallback, useEffect, useState } from "react";
import { calendarActions } from "..";
import { CalendarObject } from "../model/types";
import { useSidebar } from "../model/useSidebar";
import { isInRange } from "../utils/isInRange";
import { toDay } from "../utils/toDay";
import { ObjectInfo } from "./ObjectInfo";
interface ObjectItemProps extends CalendarObject {
  setRangeObjectId: (id: number) => void;
  rangeObjectId: number | null;
}
export const ObjectItem: FC<ObjectItemProps> = memo((props) => {
  const {
    availability,
    objectDefaultPerDayCost,
    seasonsPrice,
    id,
    rangeObjectId,
    address,
    name,
    setRangeObjectId,
    currency,
  } = props;
  const dispatch = useAppDispatch();
  const [isLessThan968] = useMediaQuery("(max-width: 968px)");
  const { onOpen, isOpen } = useSidebar();
  const days = useAppSelector(getColumnDays);

  const { sidebarWidth } = useAppSelector(getCommonSettings);

  const [range, setRange] = useState<{
    in: Date | null;
    out: Date | null;
  }>({
    in: null,
    out: null,
  });
  useEffect(() => {
    if (!isOpen) {
      setRange({
        in: null,
        out: null,
      });
    }
  }, [isOpen]);

  const onMoveHandler = (date: Date) => {
    setRange((prevRanges) => {
      let isCanSelect = true;

      if (prevRanges.in != null) {
        isCanSelect = !!availability.filter((a) => {
          return !!getOverlappingDaysInIntervals(
            {
              start: min([toDay(prevRanges.in as Date), toDay(date)]),
              end: max([toDay(prevRanges.in as Date), toDay(date)]),
            },
            {
              start: min([toDay(a.minDate), toDay(a.maxDate)]),
              end: max([toDay(a.minDate), toDay(a.maxDate)]),
            }
          );
        }).length;

        if (!isCanSelect) {
          dispatch(calendarActions.setRangeOut(date));
          return { ...prevRanges, out: date };
        }
      }

      return prevRanges;
    });
  };
  const onDownHandler = (date: Date) => {
    setRangeObjectId(id);

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
      return { in: date, out: date };
    });
  };

  const onUpHandler = () => {
    setRange((prevState) => {
      if (prevState.in && prevState.out) {
        const minDate = min([prevState.in, prevState.out]);
        const maxDate = max([prevState.in, prevState.out]);
        dispatch(calendarActions.setRangeIn(minDate));
        dispatch(calendarActions.setRangeOut(addDays(maxDate, 1)));
        onOpen({
          objectId: id,
        });

        return {
          in: minDate,
          out: maxDate,
        };
      } else if (prevState.in && !prevState.out) {
        dispatch(calendarActions.setRangeOut(addDays(prevState.in, 1)));
        onOpen({
          objectId: id,
        });
        return {
          in: prevState.in,
          out: prevState.in,
        };
      }

      return prevState;
    });
  };

  const onMove = useCallback(
    (date: Date) => {
      onMoveHandler(date);
    },
    [availability]
  );

  const onDown = useCallback((date: Date) => {
    onDownHandler(date);
  }, []);

  const onUp = useCallback(() => {
    onUpHandler();
  }, []);

  return (
    <Grid
      gridTemplateColumns={`calc(${
        !isLessThan968 ? sidebarWidth - 10 : sidebarWidth
      }px ) 1fr`}
      gridTemplateRows={isLessThan968 ? "50px" : "80px"}
      gridTemplateAreas={`"info content"`}
      borderBottom={"1px solid"}
      borderColor={"#d8d8d8"}
      overflow={"hidden"}
    >
      <ObjectInfo address={address} name={name} objectId={id} />

      <GridItem area="content">
        <HStack
          spacing={0}
          h="full"
          alignItems={"center"}
          position={"relative"}
          onMouseLeave={() => {
            if (!isOpen) {
              setRange(() => {
                dispatch(calendarActions.setClearRange());
                return { in: null, out: null };
              });
            }
          }}
        >
          {days.map(({ date, isPastDay }, index) => {
            const isRangeBorderRight =
              (range.in != null &&
                range.out != null &&
                isEqual(
                  new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                  new Date(
                    range.out?.getFullYear(),
                    range.out?.getMonth(),
                    range.out?.getDate()
                  )
                ) &&
                isBefore(
                  new Date(
                    range.in?.getFullYear(),
                    range.in?.getMonth(),
                    range.in?.getDate()
                  ),
                  new Date(date.getFullYear(), date.getMonth(), date.getDate())
                )) ||
              (range.in != null &&
                range.out != null &&
                isEqual(
                  new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                  new Date(
                    range.out?.getFullYear(),
                    range.out?.getMonth(),
                    range.out?.getDate()
                  )
                ) &&
                isEqual(
                  new Date(
                    range.in?.getFullYear(),
                    range.in?.getMonth(),
                    range.in?.getDate()
                  ),
                  new Date(
                    range.out?.getFullYear(),
                    range.out?.getMonth(),
                    range.out?.getDate()
                  )
                ));
            const isRangeBorderLeft =
              range.in != null &&
              range.out != null &&
              isEqual(
                new Date(date.getFullYear(), date.getMonth(), date.getDate()),
                new Date(
                  range.in?.getFullYear(),
                  range.in?.getMonth(),
                  range.in?.getDate()
                )
              ) &&
              isBefore(
                new Date(
                  range.out?.getFullYear(),
                  range.out?.getMonth(),
                  range.out?.getDate()
                ),
                new Date(
                  range.in?.getFullYear(),
                  range.in?.getMonth(),
                  range.in?.getDate()
                )
              );

            return (
              <ObjectCell
                inRange={
                  rangeObjectId == id
                    ? isInRange(date, range.in, range.out)
                    : false
                }
                isBlocked={
                  !!availability.filter((a) => {
                    if (isSameDay(a.maxDate, date)) {
                      return false;
                    }

                    return isWithinInterval(date, {
                      start: toDay(a.minDate),
                      end: toDay(a.maxDate),
                    });
                  }).length
                }
                date={date}
                isRangeBorderRight={
                  rangeObjectId == id ? isRangeBorderRight : false
                }
                isRangeBorderLeft={
                  rangeObjectId == id ? isRangeBorderLeft : false
                }
                isPast={isPastDay}
                onMouseDown={onDown}
                onMouseMove={onMove}
                onMouseUp={onUp}
                cost={
                  seasonsPrice.filter((price) => isSameDay(price.date, date))[0]
                    ?.cost || objectDefaultPerDayCost
                }
                key={index}
                currency={currency}
              />
            );
          })}

          {availability.map((a) => {
            return <Availibility {...a} />;
          })}
        </HStack>
      </GridItem>
    </Grid>
  );
});
