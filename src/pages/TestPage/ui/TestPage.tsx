import { RangeDatepicker } from "@shared/ui/Calendar";
import { useState } from "react";

export const TestPage = () => {
  const [selectedDates, setSelectedDates] = useState<Date[]>([
    new Date(),
    new Date(),
  ]);

  return (
    <div>
      <RangeDatepicker
        selectedDates={selectedDates}
        onDateChange={setSelectedDates}
      />
    </div>
  );
};
