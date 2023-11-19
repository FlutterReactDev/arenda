import { HStack, Heading } from "@chakra-ui/react";
import { FC, memo } from "react";
interface CalendarHeaderProps {
  year: number;
  monthName: string;
}
export const CalendarHeader: FC<CalendarHeaderProps> = memo((props) => {
  const { monthName, year } = props;
  return (
    <HStack>
      <Heading size="sm" textAlign="center">
        {monthName}
      </Heading>

      <Heading size="sm" textAlign="center">
        {year}
      </Heading>
    </HStack>
  );
});
