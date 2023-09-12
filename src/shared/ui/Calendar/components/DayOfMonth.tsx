import { Button, Tooltip, useMediaQuery } from "@chakra-ui/react";
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
  showTooltipOnHover: boolean;
  showTooltipOnSelect: boolean;
  getDateProps: (date: DateObj, event: SyntheticEvent<Element, Event>) => void;
  distance: number | null | undefined;
  isSelectedLast: boolean;
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
    showTooltipOnHover,
    showTooltipOnSelect,
    isSelectedLast,
  }) => {
    const { date, selected, selectable, today } = dateObj;
    const [isLessThan880] = useMediaQuery("(max-width: 880px)");
    const disabled = !selectable || disabledDates?.has(date.getTime());
    const styleBtnProps: DayOfMonthBtnStyleProps = useMemo(
      () => ({
        defaultBtnProps: {
          variant: "outline",
          w: "100%",
          h: "12",

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

          _active: {
            bg: "none",
            color: "gray.800",
          },
        },
        isInRangeBtnProps: {
          background: "red.200",
          color: "white",
        },
        selectedBtnProps: {
          background: "red.500",
          color: "white",
          _hover: {
            background: "red.500",
            color: "white",
          },
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

    const isOpen = () => {
      if (showTooltipOnHover) {
        return !!isLast;
      }

      if (showTooltipOnSelect) {
        return isSelectedLast;
      }
      return false;
    };

    return (
      <Tooltip
        hasArrow
        isOpen={isOpen()}
        placement="top"
        label={`${distance} суток`}
      >
        <Button
          onClick={onClick}
          onMouseEnter={onMouseHover}
          isDisabled={disabled}
          {...(!isLessThan880 && {
            _hover: {
              bg: "red.500",
              color: "white",
            },
          })}
          {...styleBtnProps.defaultBtnProps}
          {...(selected && !disabled && styleBtnProps.selectedBtnProps)}
          {...(isInRange && styleBtnProps.isInRangeBtnProps)}
          {...(today && styleBtnProps.todayBtnProps)}
        >
          {date.getDate()}
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
      oldProps.isSelectedLast == newProps.isSelectedLast &&
      oldProps.showTooltipOnHover == newProps.showTooltipOnHover &&
      oldProps.showTooltipOnSelect == newProps.showTooltipOnSelect
    );
  }
);
