import {
  Box,
  Button,
  Center,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import { toDay } from "@features/Calendar/utils/toDay";
import { getWordByNum } from "@shared/utils/getWordByNum";
import { differenceInDays, format, isSameYear } from "date-fns";
import { ru } from "date-fns/locale";
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
          <DrawerCloseButton zIndex={"popover"} />
          <DrawerHeader p={0}>
            <Button
              borderRadius={"none"}
              size={"lg"}
              onClick={() => handleSelectDate([])}
              w="full"
            >
              Очистить дату
            </Button>
            <Box
              p={"4"}
              borderBottom={"1px solid"}
              borderColor={"gray.300"}
              bgColor={"white"}
            >
              <HStack alignItems={"center"}>
                <Heading size={"md"}>
                  {value?.checkIn ? toDay(value?.checkIn).getDate() : "Заезд"}{" "}
                  {value?.checkIn &&
                    format(toDay(value?.checkIn), "MMM", {
                      locale: ru,
                    })}
                </Heading>
                <Box h={"3px"} w={6} bgColor={"black"} />
                <Heading size={"md"}>
                  {value?.checkOut ? value?.checkOut.getDate() : "отъезд"}{" "}
                  {value?.checkOut &&
                    format(toDay(value?.checkOut), "MMM", {
                      locale: ru,
                    })}
                </Heading>
                {value?.checkOut &&
                  !isSameYear(value?.checkIn, value?.checkOut) && (
                    <Heading size={"md"}>
                      {format(value?.checkOut, "Y")}
                    </Heading>
                  )}
              </HStack>
              {value?.checkOut && value?.checkIn && (
                <Text mt={4} fontWeight={"medium"} color={"gray.500"}>
                  {Math.abs(differenceInDays(value.checkOut, value.checkIn))}{" "}
                  {getWordByNum(
                    Math.abs(differenceInDays(value.checkOut, value.checkIn)),
                    ["cутки", "сутки", "суток"]
                  )}
                </Text>
              )}
              {!value?.checkIn && (
                <Text mt={4} fontWeight={"medium"} color={"gray.500"}>
                  Выберите дату заезда
                </Text>
              )}
              {value?.checkIn && !value?.checkOut && (
                <Text mt={4} fontWeight={"medium"} color={"gray.500"}>
                  Выберите дату отъезда
                </Text>
              )}
            </Box>
          </DrawerHeader>

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
