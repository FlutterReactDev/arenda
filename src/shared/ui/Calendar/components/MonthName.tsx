import { Heading } from "@chakra-ui/react";
import { FC, memo } from "react";
interface MonthNameProps {
  monthName: string;
}
export const MonthName: FC<MonthNameProps> = memo(({ monthName }) => {
  return (
    <Heading size="sm" minWidth={"5rem"} textAlign="center">
      {monthName}
    </Heading>
  );
});
