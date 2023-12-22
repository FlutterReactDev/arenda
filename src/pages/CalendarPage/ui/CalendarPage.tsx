import { Box, Stack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const CalendarPage = () => {
  return (
    <Stack spacing={4} bgColor={"blackAlpha.50"}>
      <Box pt={4}>
        <Outlet />
      </Box>
    </Stack>
  );
};

export default CalendarPage;
