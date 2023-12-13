import {
  addDays,
  addMonths,
  eachDayOfInterval,
  eachHourOfInterval,
  eachMonthOfInterval,
  endOfDay,
  getHours,
  isSameDay,
  isSameHour,
  isSameMonth,
  isSameWeek,
  isSunday,
  lastDayOfMonth,
  max,
  setHours,
  startOfDay,
  subDays,
} from "date-fns";

import { toDay } from "../utils/toDay";

import { SearchIcon } from "@chakra-ui/icons";
import {
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { DragPopover } from "@shared/ui/DragPopover";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { ru } from "date-fns/locale";
import { useDayzed } from "dayzed";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { calendarActions } from "..";
import {
  getObjectAvailibility,
  getObjectsBySearchAvailibility,
} from "../model/selectors";
import {
  CalendarAvailability,
  CalendarDetailAvailability,
} from "../model/types";
import { useSearchObjects } from "../model/useSearchObjects";
import { useSearchPopover } from "../model/useSearchPopover";
import { useSidebar } from "../model/useSidebar";
import { createCalendarMap } from "../utils/createCalendarMap";
import { getCoords } from "../utils/getCoords";
import { CalendarDetailHeader } from "./CalendarDetailHeader";
import { CalendarDetailItem } from "./CalendarDetailItem";
import { EventItem } from "./EventItem";
import { ModalDeleteAvailibility } from "./ModalDeleteAvailibility";
import { Sidebar } from "./Sidebar";

export const CalendarDetail = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { calendars } = useDayzed({
    minDate: toDay(new Date()),
    maxDate: addMonths(toDay(new Date()), 12),
    offset: -6,
    monthsToDisplay: 19,
    onDateSelected() {},
    firstDayOfWeek: 1,

    date: new Date(),
  });
  const { onChangeQuery, query } = useSearchObjects();
  const events = useAppSelector(getObjectsBySearchAvailibility);
  const { isOpen } = useSidebar();

  const { isOpen: isSearchPopoverOpen, onClose } = useSearchPopover();
  const availability = useAppSelector(getObjectAvailibility(Number(id)));
  const [range, setRange] = useState<{
    in: Date | null;
    out: Date | null;
  }>({
    in: null,
    out: null,
  });
  const lockScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const unlockScroll = () => {
    document.body.style.overflow = "";
  };

  useEffect(() => {
    if (isSearchPopoverOpen) {
      lockScroll();
    } else {
      unlockScroll();
    }
  }, [isSearchPopoverOpen]);

  useEffect(() => {
    if (!isOpen) {
      setRange({
        in: null,
        out: null,
      });
    }
  }, [availability, isOpen]);

  useEffect(() => {
    const calendarIdx = calendars
      .map((calendar, idx) => {
        if (isSameMonth(calendar.firstDayOfMonth, toDay(new Date()))) {
          return idx;
        }
      })
      .filter((monthId) => monthId != undefined)[0] as number;

    const calnedar = document.querySelector(`#calendar${calendarIdx}`);
    calnedar?.scrollIntoView({
      block: "center",
      inline: "center",
    });

    return () => unlockScroll();
  }, []);

  const createAvailability = useMemo(() => {
    const calendarMap = createCalendarMap(calendars.length) as Record<
      number,
      CalendarDetailAvailability[]
    >;
    const createCoordsOnSpittedDate = (
      minDate: Date,
      maxDate: Date,
      getIntervalDays: Date[],
      availability: CalendarAvailability
    ) => {
      const splitedDays = getIntervalDays.filter((date) => {
        return isSunday(date);
      });
      let leftDate = toDay(minDate);
      const result = splitedDays.map((date) => {
        const leftMin =
          eachDayOfInterval({
            start: leftDate,
            end: toDay(date),
          }).length - 1;

        const coords = {
          ...getCoords(subDays(date, leftMin), date, calendars),
          ...availability,
          comment: "",
        };
        leftDate = addDays(date, 1);
        return coords;
      });
      if (!isSameDay(splitedDays[splitedDays.length - 1], maxDate)) {
        result.push({
          ...getCoords(
            addDays(splitedDays[splitedDays.length - 1], 1),
            maxDate,
            calendars
          ),
          ...availability,
          comment: "",
        });

        return result;
      }

      return result;
    };
    const createMonthAvailability = (
      item: CalendarAvailability
    ): CalendarDetailAvailability[] => {
      const getIntervalDays = eachDayOfInterval({
        start: toDay(item.minDate),
        end: toDay(item.maxDate),
      });

      if (
        getIntervalDays.length > 7 ||
        !isSameWeek(item.minDate, item.maxDate, { locale: ru })
      ) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        return createCoordsOnSpittedDate(
          toDay(item.minDate),
          toDay(item.maxDate),
          getIntervalDays,
          item
        );
      }

      return [
        {
          ...getCoords(item.minDate, item.maxDate, calendars),
          ...item,
          isLeftRounded: false,
          isRightRounded: false,
        },
      ];
    };
    availability.map((item) => {
      if (isSameMonth(item.minDate, item.maxDate)) {
        const calendarIdx = calendars
          .map((calendar, idx) => {
            if (isSameMonth(calendar.firstDayOfMonth, item.minDate)) {
              return idx;
            }
          })
          .filter((monthId) => monthId != undefined)[0] as number;
        const monthAvailability = createMonthAvailability(item);
        const hours = eachHourOfInterval({
          start: startOfDay(new Date()),
          end: endOfDay(new Date()),
        });
        if (monthAvailability.length == 1) {
          const findLeftIndexHour = hours.findIndex((hour) =>
            isSameHour(
              hour,
              setHours(new Date(), getHours(monthAvailability[0].minDate))
            )
          );

          const findRightIndexHour = hours.findIndex((hour) =>
            isSameHour(
              hour,
              setHours(new Date(), getHours(monthAvailability[0].maxDate))
            )
          );
          const leftHourPercent = (findLeftIndexHour / hours.length) * 100;
          const rightHourPercent = (findRightIndexHour / hours.length) * 100;
          const rightPadding = rightHourPercent / 100;
          const leftPadding = leftHourPercent / 100;
          monthAvailability[0].isLeftRounded = true;
          monthAvailability[0].isRightRounded = true;
          monthAvailability[0].comment = item.comment;
          monthAvailability[0].left =
            monthAvailability[0].left + leftHourPercent / 100;
          monthAvailability[0].width =
            monthAvailability[0].width - 1 - leftPadding + rightPadding;
        }
        if (monthAvailability.length > 1) {
          const findLeftIndexHour = hours.findIndex((hour) =>
            isSameHour(
              hour,
              setHours(new Date(), getHours(monthAvailability[0].minDate))
            )
          );

          const findRightIndexHour = hours.findIndex((hour) =>
            isSameHour(
              hour,
              setHours(
                new Date(),
                getHours(
                  monthAvailability[monthAvailability.length - 1].maxDate
                )
              )
            )
          );
          const leftHourPercent = (findLeftIndexHour / hours.length) * 100;
          const rightHourPercent = (findRightIndexHour / hours.length) * 100;
          monthAvailability[0].isLeftRounded = true;
          monthAvailability[0].comment = item.comment;
          monthAvailability[monthAvailability.length - 1].isRightRounded = true;
          monthAvailability[0].left =
            monthAvailability[0].left + leftHourPercent / 100;
          monthAvailability[0].width =
            monthAvailability[0].width - leftHourPercent / 100;

          monthAvailability[monthAvailability.length - 1].width =
            monthAvailability[monthAvailability.length - 1].width -
            1 +
            rightHourPercent / 100;
        }
        calendarMap[calendarIdx] = [
          ...calendarMap[calendarIdx],
          monthAvailability,
        ].flat();
      }
      if (!isSameMonth(item.minDate, item.maxDate)) {
        const hours = eachHourOfInterval({
          start: startOfDay(new Date()),
          end: endOfDay(new Date()),
        });

        eachMonthOfInterval({
          start: item.minDate,
          end: item.maxDate,
        }).map((date, idx, arr) => {
          const calendarIdx = calendars
            .map((calendar, idx) => {
              if (isSameMonth(calendar.firstDayOfMonth, date)) {
                return idx;
              }
            })
            .filter((monthId) => monthId != undefined)[0] as number;
          const monthAvailability = createMonthAvailability({
            ...item,
            comment: item.comment,
            id: item.id,
            minDate: idx == 0 ? max([date, item.minDate]) : date,
            maxDate: isSameMonth(arr[arr.length - 1], date)
              ? item.maxDate
              : lastDayOfMonth(date),
            color: item.color,
          });
          const findLeftIndexHour = hours.findIndex((hour) =>
            isSameHour(
              hour,
              setHours(new Date(), getHours(monthAvailability[0].minDate))
            )
          );

          const findRightIndexHour = hours.findIndex((hour) =>
            isSameHour(
              hour,
              setHours(
                new Date(),
                getHours(
                  monthAvailability[monthAvailability.length - 1].maxDate
                )
              )
            )
          );
          const leftHourPercent = (findLeftIndexHour / hours.length) * 100;
          const rightHourPercent = (findRightIndexHour / hours.length) * 100;
          if (idx == 0) {
            monthAvailability[0].isLeftRounded = true;
            monthAvailability[0].comment = item.comment;
            monthAvailability[0].left =
              monthAvailability[0].left + leftHourPercent / 100;
            monthAvailability[0].width =
              monthAvailability[0].width - leftHourPercent / 100;
          }
          if (idx == arr.length - 1) {
            monthAvailability[monthAvailability.length - 1].isRightRounded =
              true;
            monthAvailability[monthAvailability.length - 1].width =
              monthAvailability[monthAvailability.length - 1].width -
              1 +
              rightHourPercent / 100;
          }
          calendarMap[calendarIdx] = [
            ...calendarMap[calendarIdx],
            monthAvailability,
          ].flat();
        });
      }
    });
    return calendarMap;
  }, [availability, calendars]);

  return (
    <>
      <CalendarDetailHeader objectId={Number(id)} />
      <Stack
        alignItems={"center"}
        w={"max-content"}
        {...(isSearchPopoverOpen && {
          overflow: "hidden",
        })}
        onMouseLeave={() => {
          if (!isOpen) {
            setRange(() => {
              dispatch(calendarActions.setClearRange());
              return { in: null, out: null };
            });
          }
        }}
        margin={"0 auto"}
        spacing={8}
      >
        {calendars.map((calendar, calendarIdx) => {
          return (
            <CalendarDetailItem
              key={`${calendar.month}-${calendar.year}-${calendarIdx}`}
              calendar={calendar}
              range={range}
              setRange={setRange}
              availabilities={createAvailability[calendarIdx]}
              id={calendarIdx}
              objectId={Number(id)}
            />
          );
        })}
        <Sidebar />
        <ModalDeleteAvailibility />
      </Stack>
      {isSearchPopoverOpen && (
        <DragPopover isOpen={isSearchPopoverOpen} onClose={onClose}>
          <InputGroup maxW="xl" pos={"sticky"}>
            <Input
              value={query}
              onChange={(e) => onChangeQuery(e.target.value)}
              w="full"
              bgColor={"white"}
              placeholder="Поиск коментария"
            />

            <InputLeftElement>
              <SearchIcon />
            </InputLeftElement>
          </InputGroup>

          {events.map(({ id, objectId }) => (
            <EventItem onEventClick={() => {}} id={id} objectId={objectId} />
          ))}
          {!events.length && <Text>Нет броней</Text>}
        </DragPopover>
      )}
    </>
  );
};

/*  */
