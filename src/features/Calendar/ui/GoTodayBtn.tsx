import { Button } from "@chakra-ui/react";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { memo, useTransition } from "react";
import { calendarActions } from "..";
import { toDay } from "../utils/toDay";

export const GoTodayBtn = memo(() => {
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();
  const onClickToday = () => {
    startTransition(() => {
      dispatch(calendarActions.setBeginDate(toDay(new Date())));
    });
  };

  return (
    <Button
      isLoading={isPending}
      bgColor={"white"}
      rounded={"full"}
      onClick={onClickToday}
    >
      Сегодня
    </Button>
  );
});
