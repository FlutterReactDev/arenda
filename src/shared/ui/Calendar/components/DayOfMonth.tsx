import { Box, Button } from "@chakra-ui/react";
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
  }) => {
    const { date, selected, selectable, today } = dateObj;

    const disabled = !selectable || disabledDates?.has(date.getTime());
    const styleBtnProps: DayOfMonthBtnStyleProps = useMemo(
      () => ({
        defaultBtnProps: {
          variant: "ghost",

          borderRadius: "none",
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
          _hover: {
            bg: "purple.400",

            _disabled: {
              bg: "gray.100",
              // temperory hack to persist the typescript checking
            },
          },
        },
        isInRangeBtnProps: {
          background: "purple.200",
        },
        selectedBtnProps: {
          background: "red.500",
        },
        todayBtnProps: {
          borderColor: "blue.400",
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
      <Button
        onClick={onClick}
        onMouseEnter={onMouseHover}
        isDisabled={disabled}
        {...styleBtnProps.defaultBtnProps}
        {...(isInRange && styleBtnProps.isInRangeBtnProps)}
        {...(today && styleBtnProps.todayBtnProps)}
      >
        <Box
          display="flex"
          alignItems={"center"}
          justifyContent={"center"}
          as="span"
          w={12}
          h={12}
          borderRadius={"full"}
          {...(selected && !disabled && styleBtnProps.selectedBtnProps)}
        >
          {date.getDate()}
          {isLast && "Последний"}
        </Box>
      </Button>
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
      oldProps.getDateProps == newProps.getDateProps
    );
  }
);
