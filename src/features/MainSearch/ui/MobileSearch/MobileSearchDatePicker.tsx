import {
  HStack,
  Box,
  useDisclosure,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  Button,
  Center,
  DrawerBody,
  Spinner,
} from "@chakra-ui/react";
import { CalendarValues, CalendarDate } from "@uselessdev/datepicker";

import { FC, Suspense } from "react";
import { MobileCalendar } from "../MobileCalendar";
interface MobileSearchDatePickerProps {
  dates: CalendarValues;
  handleSelectDate: (value: CalendarValues | CalendarDate) => void;
}

export const MobileSearchDatePicker: FC<MobileSearchDatePickerProps> = (
  props
) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  const { dates, handleSelectDate } = props;

  return (
    <Box w={"full"}>
      <HStack w="full" gap={"2"}>
        <Box
          rounded={"full"}
          h={"50px"}
          px={"4"}
          w={"full"}
          onClick={onOpen}
          border={"1px solid"}
          borderColor={"gray.200"}
          display={"flex"}
          flexDirection="column"
          justifyContent="center"
          cursor="pointer"
        >
          <Text
            fontWeight="medium"
            fontSize="12px"
            lineHeight="20px"
            color={"gray.300"}
          >
            Заезд
          </Text>
          <Text fontWeight="medium" fontSize="14px" lineHeight="20px">
            Когда
          </Text>
        </Box>
        <Box
          rounded={"full"}
          h={"50px"}
          px={"4"}
          onClick={onOpen}
          border={"1px solid"}
          w={"full"}
          borderColor={"gray.200"}
          display={"flex"}
          flexDirection="column"
          justifyContent="center"
          cursor="pointer"
        >
          <Text
            fontWeight="medium"
            fontSize="12px"
            lineHeight="20px"
            color={"gray.300"}
          >
            Заезд
          </Text>
          <Text fontWeight="medium" fontSize="14px" lineHeight="20px">
            Когда
          </Text>
        </Box>
      </HStack>
      <Drawer size="full" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent h="100dvh">
          <DrawerCloseButton />
          <DrawerHeader>Выбрать дату</DrawerHeader>
          <Button
            borderRadius={"none"}
            size={"lg"}
            onClick={() => handleSelectDate({})}
          >
            Очистить дату
          </Button>
          <DrawerBody>
            <Suspense
              fallback={
                <Box h="full">
                  <Center h={"full"}>
                    <Spinner size={"xl"} color="red.500" />
                  </Center>
                </Box>
              }
            >
              <MobileCalendar
                dates={dates}
                handleSelectDate={handleSelectDate}
              />
            </Suspense>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
