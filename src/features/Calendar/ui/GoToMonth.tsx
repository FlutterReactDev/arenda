import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getCalendarActions } from "../model/selectors";
import {
  addMonths,
  eachMonthOfInterval,
  format,
  isSameMonth,
  startOfMonth,
  subMonths,
} from "date-fns";
import { ru } from "date-fns/locale";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { toDay } from "../utils/toDay";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { calendarActions } from "..";
import { memo } from "react";

export const GoToMonth = memo(() => {
  const dispatch = useAppDispatch();
  const { beginDate } = useAppSelector(getCalendarActions);
  const onDateClick = (date: Date) => {
    dispatch(calendarActions.setBeginDate(startOfMonth(date)));
  };
  return (
    <Menu isLazy>
      <MenuButton
        as={Button}
        textTransform={"capitalize"}
        rounded={"full"}
        colorScheme="purple"
        rightIcon={<ChevronDownIcon />}
      >
        {format(beginDate, "MMMM yyyy ", { locale: ru })}
      </MenuButton>
      <MenuList
        onTouchStart={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
        zIndex={"popover"}
      >
        {eachMonthOfInterval({
          start: subMonths(toDay(new Date()), 6),
          end: addMonths(toDay(new Date()), 12),
        }).map((date) => {
          return (
            <MenuItem
              textTransform={"capitalize"}
              onClick={() => onDateClick(date)}
              {...(isSameMonth(date, beginDate) && {
                bgColor: "gray.100",
              })}
              key={date.getMilliseconds()}
            >
              {format(date, "MMMM yyyy ", { locale: ru })}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
});
