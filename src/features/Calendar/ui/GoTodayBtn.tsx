import { Button } from "@chakra-ui/react";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { memo } from "react";
import { calendarActions } from "..";
import { toDay } from "../utils/toDay";

export const GoTodayBtn = memo(() => {
  const dispatch = useAppDispatch();
  const onClickToday = () => {
    dispatch(calendarActions.setBeginDate(toDay(new Date())));
  };
  return (
    <Button  colorScheme="telegram" rounded={"full"} onClick={onClickToday}>
      Сегодня
    </Button>
  );
});
