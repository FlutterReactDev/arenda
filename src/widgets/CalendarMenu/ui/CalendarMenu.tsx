import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { HStack } from "@chakra-ui/react";
import { CalendarNavLink } from "./CalendarNavLink";

export const CalendarMenu = () => {
  return (
    <HStack
      as={"nav"}
      spacing={4}
      rounded={"lg"}
      bgColor={"white"}
      w="full"
      h={10}
      px={2}
    >
      <CalendarNavLink to={RouteName.CALENDAR_BOOKING.replace("/", "")}>
        Календарь
      </CalendarNavLink>
      <CalendarNavLink to={RouteName.CALENDAR_CASHBOX.replace("/", "")}>
        Касса
      </CalendarNavLink>
      <CalendarNavLink to={RouteName.CALENDAR_STAT.replace("/", "")}>
        Отчеты
      </CalendarNavLink>
    </HStack>
  );
};
