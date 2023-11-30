import { Box, Stack } from "@chakra-ui/react";
import { CalendarMenu } from "@widgets/CalendarMenu";
import { Outlet } from "react-router-dom";

const CalendarPage = () => {
  return (
    <Stack spacing={4} bgColor={"blackAlpha.50"}>
      <Box mt={2} px={3}>
        <CalendarMenu />
      </Box>

      <Box>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default CalendarPage;
