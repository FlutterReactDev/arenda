import {
  useDisclosure,
  Box,
  HStack,
  SlideFade,
  Portal,
} from "@chakra-ui/react";
import { RangeDatepicker } from "@shared/ui/Calendar";
import {
  useState,
  useEffect,
  LegacyRef,
  RefObject,
  memo,
  forwardRef,
  MutableRefObject,
} from "react";
import { ResultSearchDatepickerInput } from "./ResultSearchDatepickerInput";
import { DatePickerInput } from "@features/ResultSearch/model/types";

interface ResultSearchDatepickerProps {
  containerRef: LegacyRef<HTMLDivElement>;
  onChange: (value: { checkIn: Date; checkOut: Date }) => void;
  value: {
    checkIn: Date;
    checkOut: Date;
  };
}
export const ResultSearchDatepicker = memo(
  forwardRef<MutableRefObject<HTMLDivElement>, ResultSearchDatepickerProps>(
    (props, ref) => {
      const { containerRef, onChange, value } = props;
      const { isOpen, onOpen, onClose } = useDisclosure();

      const [isHidden, setIsHidden] = useState(false);
      const [dates, setDates] = useState<Date[]>([
        value?.checkIn,
        value.checkOut,
      ]);
      const [selectedInput, setSelectedInput] =
        useState<DatePickerInput | null>(null);

      useEffect(() => {
        if (isOpen && selectedInput == null) {
          setSelectedInput(DatePickerInput.CheckIn);
        }
      }, [isOpen]);

      useEffect(() => {
        if (!isOpen && !isHidden) {
          setSelectedInput(null);
        }
      }, [isOpen, isHidden]);

      useEffect(() => {
        if (isOpen) {
          if (!dates[0]) {
            setSelectedInput(DatePickerInput.CheckIn);
          } else if (!dates[1]) {
            setSelectedInput(DatePickerInput.Departure);
          }
        }
        onChange({
          checkIn: dates[0],
          checkOut: dates[1],
        });
      }, [dates]);

      return (
        <Box
          position="relative"
          w="full"
          onFocus={() => {
            onOpen();
            setIsHidden(true);
          }}
          onBlur={onClose}
          _focus={{
            outline: "none",
            border: "none",
            boxShadow: "none",
          }}
          tabIndex={2}
          minWidth={"275px"}
          ref={ref as LegacyRef<HTMLDivElement>}
        >
          <HStack>
            <ResultSearchDatepickerInput
              isSelected={selectedInput == DatePickerInput.CheckIn}
              label="Заезд"
              date={dates[0]}
            />

            <ResultSearchDatepickerInput
              isSelected={selectedInput == DatePickerInput.Departure}
              label="Выезд"
              date={dates[1]}
            />
          </HStack>
          <Portal containerRef={containerRef as RefObject<HTMLElement>}>
            <Box
              position="absolute"
              bottom={"-10px"}
              left={"50%"}
              transform={"translate(-50%,100%)"}
              zIndex={!isHidden ? "hide" : "popover"}
              w={{ base: "full", "2xl": "80%" }}
              tabIndex={2}
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
  )
);
