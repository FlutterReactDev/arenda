import { DesktopView } from "@shared/ui/DesktopView";
import { DesktopSearch } from "./DesktopSearch/DesktopSearch";
import { Box, Center } from "@chakra-ui/react";
import { MobileView } from "@shared/ui/MobileView";
import { MobileSearch } from "./MobileSearch/MobileSearch";
export const MainSearch = () => {
  return (
    <Box>
      <DesktopView>
        <Center>
          <DesktopSearch />
        </Center>
      </DesktopView>
      <MobileView>
        <Box p={"2"}>
          <MobileSearch />
        </Box>
      </MobileView>
    </Box>
  );
};
