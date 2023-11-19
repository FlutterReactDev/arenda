import { Box } from "@chakra-ui/react";
import { a, useSpring } from "@react-spring/web";
import { useDebounce } from "@shared/hooks/useDebounce";
import { clamp } from "@shared/utils/clamp";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { useDrag } from "@use-gesture/react";
import {
  addDays,
  addMonths,
  eachDayOfInterval,
  eachMonthOfInterval,
  isEqual,
  subDays,
  subMonths,
} from "date-fns";
import { MutableRefObject, memo, useEffect, useRef, useState } from "react";
import { calendarActions } from "..";
import {
  getCalendarActions,
  getCurrentObjectsAvailibility,
} from "../model/selectors";
import { toDay } from "../utils/toDay";

export const CalendarScroller = memo(() => {
  const dispatch = useAppDispatch();
  const [{ x }, api] = useSpring(() => ({ x: 0 }));
  const [coords, setCoords] = useState<DOMRect | null>(null);
  const [cursorDragging, setCursorDragging] = useState(false);
  const { beginDate, countDay } = useAppSelector(getCalendarActions);

  const availabilities = useAppSelector(getCurrentObjectsAvailibility);
  const scrollerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const daysInView = eachDayOfInterval({
    start: subDays(beginDate, 1),
    end: addDays(beginDate, countDay),
  });

  const allDays = eachDayOfInterval({
    start: subMonths(toDay(new Date()), 6),
    end: addMonths(toDay(new Date()), 12),
  });

  const changeCalendarBeginDate = useDebounce(
    (left: number) =>
      dispatch(
        calendarActions.setBeginDate(
          allDays[Math.floor((allDays.length * left) / 100)]
        )
      ),
    50
  );

  const allMonyhs = eachMonthOfInterval({
    start: subMonths(toDay(new Date()), 6),
    end: addMonths(toDay(new Date()), 12),
  });

  const scollerWidth = (daysInView.length / allDays.length) * 100;
  const pastDayIndex = allDays.findIndex((date) =>
    isEqual(toDay(date), toDay(new Date()))
  );
  const pastDaysWidth =
    (allDays.slice(0, pastDayIndex + 1).length / allDays.length) * 100;

  const bind = useDrag(
    ({ dragging, xy: [x] }) => {
      if (dragging != undefined) {
        setCursorDragging(dragging);
      }

      const coords = scrollerRef.current.getBoundingClientRect();
      const left =
        (clamp(
          x - (coords.width * scollerWidth) / 2 / 100,
          0,
          coords.width - (coords.width * scollerWidth) / 100
        ) /
          coords.width) *
        100;

      api.start({
        x: clamp(x - (coords.width * scollerWidth) / 2 / 100, 0, coords.width),
        immediate: true,
      });
      // dispatch(
      //   calendarActions.setBeginDate(
      //     allDays[Math.floor((allDays.length * left) / 100)]
      //   )
      // );
      changeCalendarBeginDate(left);
    },
    {
      from: () => [x.get(), 0],
      bounds: {
        left: 0,
        right:
          scrollerRef.current?.getBoundingClientRect().width -
            (scrollerRef.current?.getBoundingClientRect().width *
              scollerWidth) /
              100 || 0,
      },
    }
  );

  useEffect(() => {
    setCoords(scrollerRef.current?.getBoundingClientRect());

    window.addEventListener("resize", () => {
      setCoords(scrollerRef.current?.getBoundingClientRect());
    });

    return () =>
      window.removeEventListener("resize", () => {
        setCoords(scrollerRef.current?.getBoundingClientRect());
      });
  }, []);

  useEffect(() => {
    if (coords && !cursorDragging) {
      const beginDateIndex = allDays.findIndex((date) =>
        isEqual(toDay(date), toDay(subDays(beginDate, 1)))
      );

      const leftDays =
        (allDays.slice(0, beginDateIndex + 1).length / allDays.length) * 100;

      api.start({
        x: clamp((coords?.width * leftDays) / 100, 0, coords.width),
        immediate: true,
      });
    }
  }, [beginDate, coords, countDay]);

  return (
    <Box
      h={10}
      w="full"
      ref={scrollerRef}
      pos={"relative"}
      bgColor={"gray.300"}
      overflow={"hidden"}
      {...bind()}
      cursor={cursorDragging ? "grabbing" : "grab"}
      style={{
        touchAction: "pan-x",
      }}
    >
      <a.div
        style={{
          x,
          position: "absolute",
          transform: "translateY(-50%)",
          top: "50%",

          width: scollerWidth + "%",
          zIndex: 4,
        }}
      >
        <Box bgColor={"whiteAlpha.800"} h={10}></Box>
      </a.div>
      {availabilities.map((availability, idx) =>
        availability.map(({ color, maxDate, minDate }, aIdx) => {
          const beginDateIndex = allDays.findIndex((date) =>
            isEqual(toDay(date), toDay(minDate))
          );
          const daysInView = eachDayOfInterval({
            start: minDate,
            end: maxDate,
          });

          const width = (daysInView.length / allDays.length) * 100;
          const left =
            (allDays.slice(0, beginDateIndex + 1).length / allDays.length) *
            100;
          return (
            <Box
              key={`${idx}-${aIdx}`}
              pos={"absolute"}
              top={`calc(${idx * (100 / 6)}% )`}
              bgColor={color}
              w={width + "%"}
              left={left + "%"}
              rounded={"lg"}
              h={1}
              zIndex={"9"}
            />
          );
        })
      )}

      <Box
        h="full"
        pos="absolute"
        left={0}
        w={pastDaysWidth + "%"}
        bgColor={"#d8d8d8"}
      ></Box>

      {allMonyhs.map((month, idx) => {
        const beginDateIndex = allDays.findIndex((date) =>
          isEqual(toDay(date), toDay(month))
        );
        const left =
          (allDays.slice(0, beginDateIndex + 1).length / allDays.length) * 100;
        return (
          <Box
            pos={"absolute"}
            h="full"
            left={`${left}%`}
            w="1px"
            bgColor={"#A9A9A9"}
            zIndex={9}
            key={idx}
          />
        );
      })}
    </Box>
  );
});
