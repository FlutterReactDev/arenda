import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import { toDay } from "@features/Calendar/utils/toDay";
import { PageLoader } from "@shared/ui/PageLoader";
import { getWordByNum } from "@shared/utils/getWordByNum";
import { differenceInDays, format, isSameYear } from "date-fns";
import { ru } from "date-fns/locale";

import { FC, lazy, memo, Suspense } from "react";

export interface MobileCalendarDrawerProps {
  dates: Date[];
  handleSelectDate: (date: Date[]) => void;
  onClose: () => void;
  isOpen: boolean;
}
const MobileRangeDatepicker = lazy(() => import("./MobileRangeDatepicker"));
export const MobileCalendarDrawer: FC<MobileCalendarDrawerProps> = memo(
  (props) => {
    const { dates, handleSelectDate, onClose, isOpen } = props;

    return (
      <Drawer size="full" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          p="0"
          h={"100dvh"}
          onTouchStart={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          onTouchEnd={(e) => e.stopPropagation()}
        >
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
                  {dates[0] ? toDay(dates[0]).getDate() : "Заезд"}{" "}
                  {dates[0] &&
                    format(toDay(dates[0]), "MMM", {
                      locale: ru,
                    })}
                </Heading>
                <Box h={"3px"} w={6} bgColor={"black"} />
                <Heading size={"md"}>
                  {dates[1] ? dates[1].getDate() : "отъезд"}{" "}
                  {dates[1] &&
                    format(toDay(dates[1]), "MMM", {
                      locale: ru,
                    })}
                </Heading>
                {dates[1] && !isSameYear(dates[0], dates[1]) && (
                  <Heading size={"md"}>{format(dates[1], "Y")}</Heading>
                )}
              </HStack>
              {dates[1] && dates[0] && (
                <Text mt={4} fontWeight={"medium"} color={"gray.500"}>
                  {Math.abs(differenceInDays(dates[1], dates[0]))}{" "}
                  {getWordByNum(
                    Math.abs(differenceInDays(dates[1], dates[0])),
                    ["cутки", "сутки", "суток"]
                  )}
                </Text>
              )}
              {!dates[0] && (
                <Text mt={4} fontWeight={"medium"} color={"gray.500"}>
                  Выберите дату заезда
                </Text>
              )}
              {dates[0] && !dates[1] && (
                <Text mt={4} fontWeight={"medium"} color={"gray.500"}>
                  Выберите дату отъезда
                </Text>
              )}
            </Box>
          </DrawerHeader>
          <DrawerBody p="0">
            <Suspense fallback={<PageLoader />}>
              <MobileRangeDatepicker
                dates={dates.filter((date) => Boolean(date))}
                handleSelectDate={handleSelectDate}
              />
            </Suspense>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }
);
