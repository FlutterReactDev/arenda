import { Box, Button, Tooltip } from "@chakra-ui/react";
import { DateObj, RenderProps } from "dayzed";
import React, { useMemo, memo, SyntheticEvent } from "react";
import { DatepickerProps, DayOfMonthBtnStyleProps } from "../utils/commonTypes";
import { isEqual } from "date-fns";

interface DayOfMonthProps extends DatepickerProps {
  renderProps: RenderProps;
  isInRange?: boolean | null;
  disabledDates?: Set<number>;
  dateObj: DateObj;
  onMouseEnter?: (date: Date) => void;
  isLast?: boolean | null;
  getDateProps: (date: DateObj, event: SyntheticEvent<Element, Event>) => void;
  distance: number | null;
}

const halfGap = 0.125; //default Chakra-gap-space-1 is 0.25rem

export const DayOfMonth: React.FC<DayOfMonthProps> = memo(
  ({
    dateObj,
    isInRange,
    disabledDates,
    onMouseEnter,
    isLast,
    getDateProps,
    distance,
  }) => {
    const { date, selected, selectable, today } = dateObj;
    console.log(today);

    const disabled = !selectable || disabledDates?.has(date.getTime());
    const styleBtnProps: DayOfMonthBtnStyleProps = useMemo(
      () => ({
        defaultBtnProps: {
          variant: "ghost",

          borderRadius: "xl",
          p: 0,
          h: "full",
          w: "full",
          // this intends to fill the visual gap from Grid to improve the UX
          // so the button active area is actually larger than what it's seen

          _after: {
            content: "''",
            position: "absolute",
            top: `-${halfGap}rem`,
            left: `-${halfGap}rem`,
            bottom: `-${halfGap}rem`,
            right: `-${halfGap}rem`,
            borderWidth: `${halfGap}rem`,
            borderColor: "transparent",
          },
          // _hover: {
          //   bg: "",
          // },
        },
        isInRangeBtnProps: {
          background: "red.200",
          color: "white",
        },
        selectedBtnProps: {
          background: "red.500",
          color: "white",
        },
        todayBtnProps: {
          border: "1px solid",
          borderColor: "red.500",
        },
      }),
      []
    );

    const onMouseHover = () => {
      onMouseEnter && onMouseEnter(date);
    };
    const onClick = (e: SyntheticEvent<Element, Event>) => {
      getDateProps(dateObj, e);
    };

    return (
      <Tooltip
        hasArrow
        isOpen={!!isLast}
        placement="top"
        label={`${distance} суток`}
      >
        <Button
          onClick={onClick}
          onMouseEnter={onMouseHover}
          isDisabled={disabled}
          {...styleBtnProps.defaultBtnProps}
        >
          <Box
            display="flex"
            alignItems={"center"}
            justifyContent={"center"}
            as="span"
            w={14}
            h={14}
            borderRadius={"xl"}
            {...(selected && !disabled && styleBtnProps.selectedBtnProps)}
            {...(isInRange && styleBtnProps.isInRangeBtnProps)}
            {...(today && styleBtnProps.todayBtnProps)}
            _hover={{
              bg: "black",
            }}
          >
            {date.getDate()}
          </Box>
        </Button>
      </Tooltip>
    );
  },
  function arePropsEqual(oldProps, newProps) {
    return (
      isEqual(oldProps.dateObj.date, newProps.dateObj.date) &&
      oldProps.dateObj.selected == newProps.dateObj.selected &&
      oldProps.dateObj.today == newProps.dateObj.today &&
      oldProps.dateObj.nextMonth == newProps.dateObj.nextMonth &&
      oldProps.dateObj.prevMonth == newProps.dateObj.prevMonth &&
      oldProps.dateObj.selectable == newProps.dateObj.selectable &&
      oldProps.isInRange == newProps.isInRange &&
      oldProps.onMouseEnter == newProps.onMouseEnter &&
      oldProps.isLast == newProps.isLast &&
      oldProps.getDateProps == newProps.getDateProps &&
      oldProps.distance == newProps.distance
    );
  }
);
