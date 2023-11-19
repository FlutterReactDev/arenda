import { HStack, Text } from "@chakra-ui/react";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import {
  eachDayOfInterval,
  getOverlappingDaysInIntervals,
  isAfter,
  isBefore,
  isEqual,
  isWithinInterval,
} from "date-fns";
import { FC, memo } from "react";
import {
  getCalendarActions,
  getColumnDays,
  getCommonSettings,
} from "../model/selectors";
import { CalendarAvailability } from "../model/types";
import { EventPopover } from "./EventPopover";
export const Availibility: FC<CalendarAvailability> = memo(
  (props) => {
    const { currentWidth } = useAppSelector(getCommonSettings);
    const { countDay } = useAppSelector(getCalendarActions);
    const days = useAppSelector(getColumnDays);
    const { maxDate, minDate, comment, color, id, objectId } = props;

    const isVisible =
      isWithinInterval(
        new Date(minDate.getFullYear(), minDate.getMonth(), minDate.getDate()),
        {
          start: new Date(
            days[0].date.getFullYear(),
            days[0].date.getMonth(),
            days[0].date.getDate()
          ),
          end: new Date(
            days[days.length - 1].date.getFullYear(),
            days[days.length - 1].date.getMonth(),
            days[days.length - 1].date.getDate()
          ),
        }
      ) ||
      isWithinInterval(
        new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDate()),
        {
          start: new Date(
            days[0].date.getFullYear(),
            days[0].date.getMonth(),
            days[0].date.getDate()
          ),
          end: new Date(
            days[days.length - 1].date.getFullYear(),
            days[days.length - 1].date.getMonth(),
            days[days.length - 1].date.getDate()
          ),
        }
      );

    const timeOverlaps = getOverlappingDaysInIntervals(
      {
        start: new Date(
          days[0].date.getFullYear(),
          days[0].date.getMonth(),
          days[0].date.getDate()
        ),
        end: new Date(
          days[days.length - 1].date.getFullYear(),
          days[days.length - 1].date.getMonth(),
          days[days.length - 1].date.getDate()
        ),
      },
      {
        start: new Date(
          minDate.getFullYear(),
          minDate.getMonth(),
          minDate.getDate()
        ),
        end: new Date(
          maxDate.getFullYear(),
          maxDate.getMonth(),
          maxDate.getDate()
        ),
      }
    );

    const isLeftRounded =
      isBefore(days[0].date, minDate) || isEqual(days[0].date, minDate);
    const isRightRounded =
      isAfter(days[days.length - 1].date, maxDate) ||
      isEqual(days[days.length - 1].date, maxDate);

    const leftDays = isBefore(days[0].date, minDate)
      ? eachDayOfInterval({
          start: days[0].date,
          end: minDate,
        }).length - 1
      : 0;

    const rightDays =
      isVisible || !!timeOverlaps
        ? Math.min(
            eachDayOfInterval({
              start: isBefore(days[0].date, minDate) ? minDate : days[0].date,
              end: maxDate,
            }).length,
            countDay - leftDays + 2
          )
        : 0;

    const left = leftDays * currentWidth;
    const width = rightDays * currentWidth;

    if (width == 0) {
      return <></>;
    }
    return (
      <>
        <EventPopover id={id} objectId={objectId}>
          <HStack
            pos={"absolute"}
            h={"20px"}
            {...(isLeftRounded && { roundedLeft: "full" })}
            {...(isRightRounded && { roundedRight: "full" })}
            left={`${left}px`}
            w={`${width}px`}
            bgColor={color}
            alignItems={"center"}
            p={2}
            overflow={"hidden"}
            cursor={"pointer"}
            transition={"0.1s transform"}
            _hover={{
              boxShadow: "xl",
              transform: "scale(1.01)",
            }}
          >
            <Text
              fontSize={"sm"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              whiteSpace={"nowrap"}
              fontWeight={"medium"}
              color={"white"}
            >
              {comment}
            </Text>
          </HStack>
        </EventPopover>
      </>
    );
  },
  (oldProps, newProps) => {
    return (
      oldProps.comment === newProps.comment &&
      isEqual(oldProps.minDate, newProps.minDate) &&
      isEqual(oldProps.maxDate, newProps.maxDate) &&
      oldProps.id == newProps.id &&
      oldProps.color == newProps.color &&
      oldProps.objectId == newProps.objectId &&
      isEqual(oldProps.createdDate, newProps.createdDate) &&
      oldProps.totalSum == newProps.totalSum
    );
  }
);
