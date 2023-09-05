import { FC, memo } from "react";
import { Box } from "@chakra-ui/react";
interface WeekdayProps {
  weekdayNames: string[];
}
export const Weekday: FC<WeekdayProps> = memo(({ weekdayNames }) => {
  return weekdayNames.map((day, dayIdx) => (
    <Box fontSize="sm" fontWeight="semibold" key={dayIdx}>
      {day}
    </Box>
  ));
});
