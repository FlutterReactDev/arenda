import {
  Box,
  Button,
  HStack,
  Portal,
  SlideFade,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  LegacyRef,
  MutableRefObject,
  RefObject,
  forwardRef,
  useEffect,
  useState,
} from "react";

import { toDay } from "@features/Calendar/utils/toDay";
import { RangeDatepicker } from "@shared/ui/Calendar";
import { addDays, format, nextSaturday, nextSunday } from "date-fns";
import { ru } from "date-fns/locale";
interface DesktopDatepickerProps {
  containerRef: LegacyRef<HTMLDivElement>;
  onChange: (value: { checkIn: Date; checkOut: Date }) => void;
  value: {
    checkIn: Date;
    checkOut: Date;
  };
}

export const DesktopDatepicker = forwardRef<
  MutableRefObject<HTMLDivElement>,
  DesktopDatepickerProps
>((props, ref) => {
  const { containerRef, onChange, value } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [dates, setDates] = useState<Date[]>([value?.checkIn, value?.checkOut]);
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    onChange({
      checkIn: dates[0],
      checkOut: dates[1],
    });
  }, [dates, onChange]);
  return (
    <Box
      onFocus={() => {
        onOpen();
        setIsHidden(true);
      }}
      onBlur={onClose}
      tabIndex={2}
      position="relative"
      minW="225px"
      ref={ref as LegacyRef<HTMLDivElement>}
    >
      <HStack gap={0} h={"full"} w="full" cursor={"pointer"} onClick={onOpen}>
        <Box
          p={"2"}
          w={"100%"}
          h={"full"}
          borderLeft={"1px solid"}
          borderColor="gray.200"
        >
          <Text
            fontWeight="medium"
            fontSize="14px"
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
          p={"2"}
          w={"100%"}
          h={"full"}
          borderLeft={"1px solid"}
          borderColor="gray.200"
        >
          <Text
            fontWeight="medium"
            fontSize="14px"
            lineHeight="20px"
            color={"gray.300"}
          >
            Выезд
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
      <Portal containerRef={containerRef as RefObject<HTMLElement>}>
        <Box
          position="absolute"
          bottom={"-10px"}
          left={0}
          transform={"translateY(100%)"}
          zIndex={!isHidden ? "hide" : "popover"}
          w="full"
          tabIndex={2}
        >
          <SlideFade
            onAnimationComplete={() => {
              if (!isOpen) {
                setIsHidden(false);
              }
            }}
            in={isOpen}
            offsetY="80px"
          >
            <Box
              maxW="full"
              w={"full"}
              h="full"
              background="white"
              boxShadow={"lg"}
              rounded={"lg"}
            >
              <RangeDatepicker
                onClose={onClose}
                selectedDates={dates}
                onDateChange={setDates}
                showTooltipOnHover
                showTooltipOnSelect={false}
              />
              <HStack
                p={2}
                borderTop={"1px solid"}
                borderColor={"gray.200"}
                justifyContent={"space-between"}
              >
                <HStack>
                  <Button
                    size={"sm"}
                    rounded={"full"}
                    onClick={() => {
                      setDates(() => {
                        return [
                          toDay(new Date()),
                          addDays(toDay(new Date()), 1),
                        ];
                      });
                      onClose();
                    }}
                  >
                    <Text mr={2}>Сегодня:</Text>
                    <Text mr={1}>{toDay(new Date()).getDate()}</Text>
                    <Box>-</Box>
                    <Text ml={1}>
                      {addDays(toDay(new Date()), 1).getDate()}{" "}
                      {format(toDay(new Date()), "MMM", {
                        locale: ru,
                      })}
                    </Text>
                  </Button>
                  <Button
                    size={"sm"}
                    rounded={"full"}
                    onClick={() => {
                      setDates(() => {
                        return [
                          addDays(toDay(new Date()), 1),
                          addDays(toDay(new Date()), 2),
                        ];
                      });
                      onClose();
                    }}
                  >
                    <Text mr={2}>Завтра:</Text>
                    <Text mr={1}>
                      {" "}
                      {addDays(toDay(new Date()), 1).getDate()}
                    </Text>
                    <Box>-</Box>
                    <Text ml={1}>
                      {addDays(toDay(new Date()), 2).getDate()}{" "}
                      {format(toDay(new Date()), "MMM", {
                        locale: ru,
                      })}
                    </Text>
                  </Button>
                  <Button
                    size={"sm"}
                    rounded={"full"}
                    onClick={() => {
                      setDates(() => {
                        return [
                          nextSaturday(toDay(new Date())),
                          nextSunday(toDay(new Date())),
                        ];
                      });
                      onClose();
                    }}
                  >
                    <Text mr={2}>Выходные:</Text>
                    <Text mr={1}>
                      {" "}
                      {nextSaturday(toDay(new Date())).getDate()}
                    </Text>
                    <Box>-</Box>
                    <Text ml={1}>
                      {nextSunday(toDay(new Date())).getDate()}{" "}
                      {format(toDay(new Date()), "MMM", {
                        locale: ru,
                      })}
                    </Text>
                  </Button>
                </HStack>
                <Button
                  size={"sm"}
                  rounded={"full"}
                  onClick={() => {
                    setDates([]);
                  }}
                >
                  Сбросить даты
                </Button>
              </HStack>
            </Box>
          </SlideFade>
        </Box>
      </Portal>
    </Box>
  );
});
