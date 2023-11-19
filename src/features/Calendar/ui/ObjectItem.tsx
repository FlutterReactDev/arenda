import { Grid, GridItem, HStack, useMediaQuery } from "@chakra-ui/react";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import {
  getCalendarActions,
  getColumnDays,
  getCommonSettings,
} from "../model/selectors";

import {
  addDays,
  getOverlappingDaysInIntervals,
  isBefore,
  isEqual,
  isPast,
  isSameDay,
  isWithinInterval,
  max,
  min,
  subDays,
} from "date-fns";
import { Availibility } from "./Availibility";
import { ObjectCell } from "./ObjectCell";

import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { FC, memo, useCallback, useEffect, useRef, useState } from "react";
import { calendarActions } from "..";
import { CalendarObject } from "../model/types";
import { useSidebar } from "../model/useSidebar";
import { isInRange } from "../utils/isInRange";
import { ObjectInfo } from "./ObjectInfo";
import { toDay } from "../utils/toDay";
import { useDebounce } from "@shared/hooks/useDebounce";
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
  } = props;
  const dispatch = useAppDispatch();
  const [isLessThan968] = useMediaQuery("(max-width: 968px)");
  const { onOpen, isOpen } = useSidebar();
  const days = useAppSelector(getColumnDays);
  const { beginDate, countDay } = useAppSelector(getCalendarActions);
  const cellRefs = useRef<HTMLElement[]>([]);
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
        dispatch(calendarActions.setRangeOut(maxDate));
        onOpen({
          objectId: id,
        });

        return {
          in: minDate,
          out: maxDate,
        };
      } else if (prevState.in && !prevState.out) {
        dispatch(calendarActions.setRangeOut(prevState.in));
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

  const debounceIncreaseDate = useDebounce((out: Date) => {
    dispatch(calendarActions.increaseDay());
    onMove(out);
  }, 50);

  const onTouchMove = useCallback(
    (pageX: number) => {
      const coords = cellRefs.current
        .map((el) => {
          return el?.getBoundingClientRect();
        })
        .filter(Boolean)

        .filter((value, index, arr) => {
          const _value = JSON.stringify(value);
          return (
            index ===
            arr.findIndex((obj) => {
              return JSON.stringify(obj) === _value;
            })
          );
        })
        .filter(
          (value) =>
            value.bottom &&
            value.height &&
            value.left &&
            value.right &&
            value.top &&
            value.width &&
            value.x &&
            value.y
        );

      const date = coords
        .map((coord, idx) => {
          if (coord.left <= pageX) {
            return idx;
          }
        })
        .filter((idx) => idx != undefined);

      const out = addDays(
        subDays(beginDate, 1),
        date.length ? (date[date.length - 1] as number) : 0
      );
      if (isEqual(addDays(beginDate, countDay), out)) {
        debounceIncreaseDate(out);
        return;
      }
      if (range.in) {
        if (isPast(addDays(out, 1))) {
          onMove(toDay(new Date()));
        } else {
          onMove(out);
        }
      }
    },
    [beginDate, onMove, range.in]
  );

  const onScroll = useCallback(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    (event) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if (event.deltaY > 1) {
        dispatch(calendarActions.increaseDay());
      } else {
        dispatch(calendarActions.decreaseDay());
      }
    },
    [dispatch]
  );

  const addToRef = useCallback((element: HTMLElement) => {
    return cellRefs.current.push(element);
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
          onWheel={onScroll}
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                //@ts-ignore

                ref={addToRef}
                isBlocked={
                  !!availability.filter((a) => {
                    return isWithinInterval(date, {
                      start: a.minDate,
                      end: a.maxDate,
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
                onTouchStart={onDown}
                onTouchMove={onTouchMove}
                onTouchEnd={onUp}
                cost={
                  seasonsPrice.filter((price) => isSameDay(price.date, date))[0]
                    ?.cost || objectDefaultPerDayCost
                }
                key={index}
              />
            );
          })}

          {availability.map(
            ({
              id,
              maxDate,
              minDate,
              comment,
              color,
              createdDate,
              objectId,
              totalSum,
            }) => {
              return (
                <Availibility
                  comment={comment}
                  key={id}
                  minDate={minDate}
                  maxDate={maxDate}
                  color={color}
                  createdDate={createdDate}
                  id={id}
                  objectId={objectId}
                  totalSum={totalSum}
                />
              );
            }
          )}
        </HStack>
      </GridItem>
    </Grid>
  );
});
