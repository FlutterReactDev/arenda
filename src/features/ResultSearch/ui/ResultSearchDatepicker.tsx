import {
  useDisclosure,
  Box,
  HStack,
  SlideFade,
  Portal,
} from "@chakra-ui/react";
import { RangeDatepicker } from "@shared/ui/Calendar";
import { useState, useEffect, FC, LegacyRef, RefObject, memo } from "react";
import { ResultSearchDatepickerInput } from "./ResultSearchDatepickerInput";
import { DatePickerInput } from "../model/types";
interface DesktopDatepickerProps {
  containerRef: LegacyRef<HTMLDivElement>;
}
export const ResultSearchDatepicker: FC<DesktopDatepickerProps> = memo(
  (props) => {
    const { containerRef } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [isHidden, setIsHidden] = useState(false);
    const [dates, setDates] = useState<Date[]>([]);
    const [selectedInput, setSelectedInput] = useState<DatePickerInput | null>(
      null
    );

    useEffect(() => {
      if (!isOpen) {
        setSelectedInput(null);
      }
    }, [isOpen]);
    useEffect(() => {
      if (isOpen) {
        if (!dates[0]) {
          setSelectedInput(DatePickerInput.CheckIn);
        } else if (!dates[1]) {
          setSelectedInput(DatePickerInput.Departure);
        }
      }
    }, [dates]);

    const onCheckIn = () => {
      setSelectedInput(DatePickerInput.CheckIn);
    };

    const onDeparture = () => {
      console.log("1");

      setSelectedInput(DatePickerInput.Departure);
    };

    return (
      <Box
        position="relative"
        w="full"
        onFocus={() => {
          onOpen();
          setIsHidden(true);
        }}
        onBlur={onClose}
        tabIndex={2}
        _focus={{
          outline: "none",
          border: "none",
          boxShadow: "none",
        }}
      >
        <HStack>
          <ResultSearchDatepickerInput
            isSelected={selectedInput == DatePickerInput.CheckIn}
            label="Заезд"
            date={dates[0]}
            onClick={onCheckIn}
          />
          <ResultSearchDatepickerInput
            isSelected={selectedInput == DatePickerInput.Departure}
            label="Выезд"
            date={dates[1]}
            onClick={onDeparture}
          />
        </HStack>
        <Portal containerRef={containerRef as RefObject<HTMLElement>}>
          <Box
            position="absolute"
            bottom={"-10px"}
            left={"50%"}
            transform={"translate(-50%,100%)"}
            zIndex={!isHidden ? "hide" : "popover"}
            w="80%"
            display={!isHidden ? "none" : "block"}
          >
            <SlideFade
              onAnimationComplete={() => {
                if (!isOpen) {
                  setIsHidden(false);
                }
              }}
              offsetY={"60px"}
              in={isOpen}
            >
              <Box
                maxW="full"
                w={"full"}
                p={"2"}
                background="white"
                border="1px solid"
                borderColor="gray.400"
                rounded={"lg"}
              >
                <RangeDatepicker
                  onClose={onClose}
                  selectedDates={dates}
                  onDateChange={setDates}
                  showTooltipOnHover
                  showTooltipOnSelect={false}
                />
              </Box>
            </SlideFade>
          </Box>
        </Portal>
      </Box>
    );
  }
);
