import { Box } from "@chakra-ui/react";
import { format } from "date-fns";
import { FC } from "react";

interface DayProps {
  date: Date;
  isMonth: boolean;
}

export const Day: FC<DayProps> = (props) => {
  const { date, isMonth } = props;
  console.log(isMonth);

  return (
    <Box w="90px" h="full" border={"1px solid gray"}>
      <Box fontWeight={"bold"}>{isMonth && format(date, "LLLL")}</Box>

      {date.getDate()}
    </Box>
  );
};
