import { DesktopView } from "@shared/ui/DesktopView";
import { DesktopSearch } from "./DesktopSearch";
import { Box } from "@chakra-ui/react";
import { MobileView } from "@shared/ui/MobileView";
export const MainSearch = () => {
  return (
    <Box>
      <DesktopView>
        <DesktopSearch />
      </DesktopView>
      <MobileView>MobileSearch</MobileView>
    </Box>
  );
};
