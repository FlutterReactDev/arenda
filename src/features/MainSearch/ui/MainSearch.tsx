import { DesktopView } from "@shared/ui/DesktopView";
import { DesktopSearch } from "./DesktopSearch/DesktopSearch";
import { Box } from "@chakra-ui/react";
import { MobileView } from "@shared/ui/MobileView";
import { MobileSearch } from "./MobileSearch/MobileSearch";
export const MainSearch = () => {
  return (
    <Box>
      <DesktopView>
        <DesktopSearch />
      </DesktopView>
      <MobileView>
        <MobileSearch />
      </MobileView>
    </Box>
  );
};
