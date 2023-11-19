import { memo, useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
export const CalendarClock = memo(() => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const formattedTime = currentTime.toLocaleTimeString();
  return (
    <Text fontWeight={"medium"}>
      Сегодня,{" "}
      {format(currentTime, "dd MMMM", {
        locale: ru,
      })}
      , {formattedTime}
    </Text>
  );
});
