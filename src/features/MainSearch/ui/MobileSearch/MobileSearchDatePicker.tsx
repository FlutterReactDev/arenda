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

import { FC, Suspense, useState } from "react";
import { MobileCalendar } from "../MobileCalendar";
import { RangeDatepicker } from "@shared/ui/Calendar";
interface MobileSearchDatePickerProps {
  dates: Date[];
  handleSelectDate: (date: Date[]) => void;
}

export const MobileSearchDatePicker: FC<MobileSearchDatePickerProps> = (
  props
) => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  // const { dates, handleSelectDate } = props;
  const [dates, setDates] = useState<Date[]>([new Date(), new Date()]);
  console.log(dates);

  return (
    <>
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
      </Box>
      <Drawer size="full" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Выбрать дату</DrawerHeader>
          <Button
            borderRadius={"none"}
            size={"lg"}
            onClick={() => setDates([])}
          >
            Очистить дату
          </Button>
          <DrawerBody>
            {/* <MobileCalendar
                dates={dates}
                handleSelectDate={setDates}
              /> */}
            <RangeDatepicker
              selectedDates={dates}
              onDateChange={setDates}
              monthsToDisplay={12}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
