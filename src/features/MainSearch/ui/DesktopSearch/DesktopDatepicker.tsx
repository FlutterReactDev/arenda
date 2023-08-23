import {
  HStack,
  Box,
  Text,
  useDisclosure,
  ScaleFade,
  Portal,
} from "@chakra-ui/react";
import { FC, LegacyRef, RefObject, useState } from "react";
import { DubleCalendar } from "../Calendar";
import { CalendarDate, CalendarValues } from "@uselessdev/datepicker";
interface DesktopDatepickerProps {
  containerRef: LegacyRef<HTMLDivElement>;
}

export const DesktopDatepicker: FC<DesktopDatepickerProps> = ({
  containerRef,
}) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [dates, setDates] = useState<CalendarValues | CalendarDate>({});
  const [isHidden, setIsHidden] = useState(false);
  const handleSelectDate = (dates: CalendarValues | CalendarDate) => {
    setDates(dates);
  };
  return (
    <Box
      onFocus={() => {
        onOpen();
        setIsHidden(true);
      }}
      onBlur={onClose}
      tabIndex={1}
      position="relative"
      maxW="215px"
      w="full"
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
          <Text fontWeight="medium" fontSize="17px">
            Когда
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
          <Text fontWeight="medium" fontSize="17px">
            Когда
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
        >
          <ScaleFade
            onAnimationComplete={() => {
              if (!isOpen) {
                setIsHidden(false);
              }
            }}
            initialScale={0.9}
            in={isOpen}
          >
            <Box
              maxW="full"
              w={"full"}
              background="white"
              border="1px solid"
              borderColor="gray.400"
              rounded={"lg"}
            >
              <DubleCalendar
                dates={dates as CalendarValues}
                handleSelectDate={handleSelectDate}
              />
            </Box>
          </ScaleFade>
        </Box>
      </Portal>
    </Box>
  );
};
