import { HStack, Heading } from "@chakra-ui/react";
import { FC, memo } from "react";
interface CalendarHeaderProps {
  year: number;
  monthName: string;
}
export const CalendarHeader: FC<CalendarHeaderProps> = memo((props) => {
  const { monthName, year } = props;
  return (
    <HStack spacing={0}>
      <Heading size="sm" minWidth={"5rem"} textAlign="center">
        {monthName}
      </Heading>

      <Heading size="sm" minWidth={"5rem"} textAlign="center">
        {year}
      </Heading>
    </HStack>
  );
});
