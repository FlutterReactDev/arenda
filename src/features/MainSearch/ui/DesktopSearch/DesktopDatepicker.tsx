import { HStack, Box, Text } from "@chakra-ui/react";
import { FC } from "react";
interface DesktopDatepickerProps {
  onOpen: () => void;
}

export const DesktopDatepicker: FC<DesktopDatepickerProps> = ({ onOpen }) => {
  return (
    <HStack maxW="215px" w="full" cursor={"pointer"} onClick={onOpen}>
      <Box h={"full"}>
        <Text>Заезд</Text>
        <Text>14 сент, чт</Text>
      </Box>
      <Box h={"full"}>
        <Text>Заезд</Text>
        <Text>20 сент, чт</Text>
      </Box>
    </HStack>
  );
};
