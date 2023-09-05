import { Button } from "@chakra-ui/react";
import { isEqual } from "date-fns";

import { memo, FC, useMemo } from "react";

interface CalendarDayProps {
  date: Date;
  onDateSelect: (date: Date) => void;
  selected: boolean;
}
export const CalendarDay: FC<CalendarDayProps> = memo((props) => {
  const { date, onDateSelect, selected } = props;
  console.log("render");

  const onClick = () => {
    onDateSelect(date);
  };
  return (
    <Button onClick={onClick} variant={selected ? "solid" : "outline"}>
      {date?.toDateString()}
    </Button>
  );
}, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return (
    isEqual(oldProps.date, newProps.date) &&
    oldProps.selected == newProps.selected &&
    oldProps.onDateSelect == newProps.onDateSelect
  );
}
