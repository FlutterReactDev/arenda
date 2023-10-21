import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
  useOutsideClick,
} from "@chakra-ui/react";
import { GuestsModal } from "@entites/Object/ui/GuestsModal";
import { RangeDatepicker } from "@shared/ui/Calendar";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { RefObject, useCallback, useRef, useState } from "react";

export const BookingForm = () => {
  const [calendarDates, setCalendarDates] = useState<Date[]>([]);

  const handleSelectDate = useCallback((dates: Date[]) => {
    setCalendarDates(dates);
  }, []);

  const {
    isOpen: startIsOpen,
    onClose: startOnClose,
    onOpen: startOnOpen,
  } = useDisclosure();
  const {
    isOpen: endIsOpen,
    onClose: endOnClose,
    onOpen: endOnOpen,
  } = useDisclosure();

  const {
    isOpen: guestsIsOpen,
    onOpen: guestsOnOpen,
    onClose: guestsOnClose,
  } = useDisclosure();

  const startRef = useRef() as RefObject<HTMLDivElement>;
  const endRef = useRef() as RefObject<HTMLDivElement>;

  function isStartSelected() {
    if (startIsOpen || endIsOpen) {
      if (!calendarDates[0]) {
        return true;
      }
      if (calendarDates[0] && calendarDates[1]) {
        return true;
      }
    }
  }
  function isEndSelected() {
    if (startIsOpen || endIsOpen) {
      if (!calendarDates[0]) {
        return false;
      }
      if (!calendarDates[1]) {
        return true;
      }
    }
  }
  useOutsideClick({
    ref: startRef,
    handler: startOnClose,
    enabled: startIsOpen,
  });

  useOutsideClick({
    ref: endRef,
    handler: endOnClose,
    enabled: endIsOpen,
  });
  return (
    <Box rounded={"lg"}>
      <Stack>
        <HStack>
          <Popover isOpen={startIsOpen} onClose={startOnClose}>
            <PopoverTrigger>
              <Input
                value={
                  (calendarDates[0] &&
                    format(calendarDates[0], "d LLLL, ccc", { locale: ru })) ||
                  ""
                }
                _focusVisible={{
                  border: "gray.500",
                }}
                _hover={{
                  border: "gray.500",
                }}
                h={"12"}
                {...(isStartSelected() && {
                  borderColor: "red.600",
                })}
                onClick={startOnOpen}
                readOnly
              />
            </PopoverTrigger>
            <PopoverContent w={"3xl"} ref={startRef}>
              <RangeDatepicker
                onClose={startOnClose}
                selectedDates={calendarDates}
                onDateChange={handleSelectDate}
                showTooltipOnHover
                showTooltipOnSelect={false}
              />
            </PopoverContent>
          </Popover>
          <Popover isOpen={endIsOpen} onClose={endOnClose}>
            <PopoverTrigger>
              <Input
                value={
                  (calendarDates[1] &&
                    format(calendarDates[1], "d LLLL, ccc", { locale: ru })) ||
                  ""
                }
                readOnly
                h={"12"}
                onClick={endOnOpen}
                _focusVisible={{
                  border: "gray.500",
                }}
                _hover={{
                  border: "gray.500",
                }}
                {...(isEndSelected() && {
                  borderColor: "red.600",
                })}
              />
            </PopoverTrigger>
            <PopoverContent ref={endRef} w={"3xl"}>
              <RangeDatepicker
                onClose={endOnClose}
                selectedDates={calendarDates}
                onDateChange={handleSelectDate}
                showTooltipOnHover
                showTooltipOnSelect={false}
              />
            </PopoverContent>
          </Popover>
        </HStack>
        <Button onClick={guestsOnOpen} variant={"outline"}>
          <HStack w={"full"} justifyContent={"space-between"}>
            <HStack>
              <Text>1 взрослый,</Text>
              <Text color={"gray.500"}>без детей</Text>
            </HStack>
            <ChevronDownIcon w={6} h={6} />
          </HStack>
        </Button>
      </Stack>
      <Button colorScheme="green" w="full" mt={4}>
        Забронировать
      </Button>
      <GuestsModal
        value={{
          adultsCount: 1,
          childrenAges: [
            {
              age: "1",
            },
          ],
        }}
        onGuestsChange={() => {}}
        isOpen={guestsIsOpen}
        onClose={guestsOnClose}
      />
    </Box>
  );
};
