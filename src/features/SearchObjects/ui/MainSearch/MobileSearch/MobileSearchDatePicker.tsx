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

import {
  LegacyRef,
  MutableRefObject,
  Suspense,
  forwardRef,
  useCallback,
  useEffect,
  useState,
} from "react";
import { MobileCalendar } from "../MobileCalendar";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
interface MobileSearchDatePickerProps {
  onChange: (value: { checkIn: Date; checkOut: Date }) => void;
  value: {
    checkIn: Date;
    checkOut: Date;
  };
  hasError: boolean;
}

export const MobileSearchDatePicker = forwardRef<
  MutableRefObject<HTMLDivElement>,
  MobileSearchDatePickerProps
>((props, ref) => {
  const { onChange, value, hasError } = props;
  const { onClose, onOpen, isOpen } = useDisclosure({
    defaultIsOpen: hasError,
  });

  const [calendarDates, setCalendarDates] = useState<Date[]>([
    value?.checkIn,
    value?.checkOut,
  ]);

  const handleSelectDate = useCallback((dates: Date[]) => {
    setCalendarDates(dates);
  }, []);
  useEffect(() => {
    onChange({
      checkIn: calendarDates[0],
      checkOut: calendarDates[1],
    });
  }, [calendarDates, onChange]);
  useEffect(() => {
    if (hasError) {
      onOpen();
    }
  }, [hasError, onOpen]);
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
            onFocus={() => {
              if (!isOpen) {
                onOpen();
              }
            }}
            ref={ref as LegacyRef<HTMLDivElement>}
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
            <Text fontWeight="medium" fontSize="16px">
              {value?.checkIn
                ? format(value.checkIn, "d LLL EEE", {
                    locale: ru,
                  })
                : "Когда"}
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

            <Text fontWeight="medium" fontSize="16px">
              {value?.checkOut
                ? format(value.checkOut, "d LLL EEE", {
                    locale: ru,
                  })
                : "Когда"}
            </Text>
          </Box>
        </HStack>
      </Box>
      <Drawer size="full" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent p="0">
          <DrawerCloseButton />
          <DrawerHeader>Выбрать дату</DrawerHeader>
          <Button
            borderRadius={"none"}
            size={"lg"}
            onClick={() => handleSelectDate([])}
          >
            Очистить дату
          </Button>
          <DrawerBody p="0">
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
                dates={calendarDates}
                handleSelectDate={handleSelectDate}
              />
            </Suspense>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
});
