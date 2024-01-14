import { TriangleDownIcon } from "@chakra-ui/icons";
import { Box, Button, SlideFade, useMediaQuery } from "@chakra-ui/react";
import { isEqual } from "date-fns";
import { DateObj, RenderProps } from "dayzed";
import React, { SyntheticEvent, memo, useMemo } from "react";
import { DatepickerProps, DayOfMonthBtnStyleProps } from "../utils/commonTypes";

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
      <Button
        onClick={onClick}
        onMouseEnter={onMouseHover}
        isDisabled={disabled}
        pos="relative"
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
        {isOpen() && (
          <Box
            pos="absolute"
            top={0}
            left={"50%"}
            transform={"translate(-50%,-130%)"}
            pointerEvents={"none"}
          >
            <SlideFade in offsetY={"20px"}>
              <Box
                rounded={"lg"}
                bgColor={"gray.500"}
                fontSize={"sm"}
                py={1}
                px={2}
              >
                <Box
                  pos="absolute"
                  left={"50%"}
                  bottom={"1px"}
                  transform={"translate(-50%,65%)"}
                  color={"gray.500"}
                >
                  <TriangleDownIcon />
                </Box>
                {distance} суток
              </Box>
            </SlideFade>
          </Box>
        )}
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
      oldProps.getDateProps == newProps.getDateProps &&
      oldProps.isSelectedLast == newProps.isSelectedLast &&
      oldProps.showTooltipOnHover == newProps.showTooltipOnHover &&
      oldProps.showTooltipOnSelect == newProps.showTooltipOnSelect
    );
  }
);
