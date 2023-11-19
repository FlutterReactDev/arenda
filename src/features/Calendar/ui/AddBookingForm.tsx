import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  ModalBody,
  ModalFooter,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Select,
  Stack,
  useDisclosure,
  useMediaQuery
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarPanel, DefaultConfigs } from "@shared/ui/Calendar";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { format, isAfter, isBefore, subDays } from "date-fns";
import { ru } from "date-fns/locale";
import { FC, memo } from "react";
import { Controller, useForm } from "react-hook-form";
import { calendarActions } from "..";
import { AddBookingType, addBookingSchema } from "../model/addBookingSchema";
import { getObjects } from "../model/selectors";
import { SidebarType } from "../model/types";
import { useSidebar } from "../model/useSidebar";
import { toDay } from "../utils/toDay";
interface AddBookingFormProps {
  onClose: () => void;
}

export const AddBookingForm: FC<AddBookingFormProps> = memo((props) => {
  const { onClose } = props;
  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    watch,
  } = useForm<AddBookingType>({
    resolver: yupResolver(addBookingSchema),
  });
  const dispatch = useAppDispatch();

  const { onOpen: sidebarOnOpen } = useSidebar();
  const objects = useAppSelector(getObjects);
  const [isSm] = useMediaQuery("(max-width:30em)");

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
  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const onCreate = ({ checkIn, checkOut, objectId }: AddBookingType) => {
    dispatch(calendarActions.setRangeIn(checkIn));
    dispatch(calendarActions.setRangeOut(checkOut));

    sidebarOnOpen({
      objectId,
      type: SidebarType.BOOK,
    });
    onClose();
  };

  return (
    <>
      <ModalBody>
        <Stack>
          <FormControl isInvalid={!!errors.objectId?.message}>
            <FormLabel>Выберите объект</FormLabel>
            <Select {...register("objectId")} placeholder="Выберите объект">
              {objects.map(({ name, id }) => {
                return (
                  <option key={id} value={id}>
                    {name}
                  </option>
                );
              })}
            </Select>
            <FormErrorMessage>{errors.objectId?.message}</FormErrorMessage>
          </FormControl>
          <FormControl
            isInvalid={!!errors.checkIn?.message || !!errors.checkOut?.message}
          >
            <FormLabel>Выберите даты</FormLabel>
            <HStack
              justifyContent={"flex-start"}
              alignItems={"flex-start"}
              w="full"
              flexDirection={["column", "row", "row"]}
            >
              <Stack w="full" spacing={0}>
                <Controller
                  control={control}
                  name="checkIn"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Popover
                        isLazy
                        isOpen={startIsOpen}
                        onClose={startOnClose}
                        strategy="fixed"
                        {...(isSm && {
                          matchWidth: true,
                        })}
                      >
                        <PopoverTrigger>
                          <Button
                            onClick={startOnOpen}
                            w="full"
                            variant={"outline"}
                            {...(!!errors.checkIn?.message && {
                              borderColor: "red",
                            })}
                          >
                            {(value &&
                              format(value, "d LLLL yyyy", {
                                locale: ru,
                              })) ||
                              "Выберите дату заезда"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent w="full">
                          <PopoverArrow />
                          <Flex h="full" w="full">
                            <CalendarPanel
                              dayzedHookProps={{
                                selected: value,
                                onDateSelected: ({ date }) => {
                                  if (isAfter(date, checkOut)) {
                                    setValue("checkOut", date);
                                  }
                                  onChange(date);
                                  startOnClose();
                                },
                                monthsToDisplay: 1,
                                date: value,
                                firstDayOfWeek: 1,
                                minDate: toDay(new Date()),
                                maxDate: new Date(
                                  new Date().getFullYear(),
                                  new Date().getMonth() + 12,
                                  new Date().getDate()
                                ),
                              }}
                              configs={DefaultConfigs}
                              showTooltipOnHover={false}
                              showTooltipOnSelect={false}
                              hoveredDate={null}
                              showNavigationButton
                              //   disabledDates={new Set(disabledDays?.flat())}
                            />
                          </Flex>
                        </PopoverContent>
                      </Popover>
                    );
                  }}
                />
                <FormErrorMessage>{errors.checkIn?.message}</FormErrorMessage>
              </Stack>
              <Stack w="full" spacing={0}>
                <Controller
                  control={control}
                  name="checkOut"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Popover isLazy isOpen={endIsOpen} onClose={endOnClose}>
                        <PopoverTrigger>
                          <Button
                            onClick={endOnOpen}
                            w="full"
                            variant={"outline"}
                            {...(!!errors.checkOut?.message && {
                              borderColor: "red",
                            })}
                          >
                            {(value &&
                              format(value, "d LLLL yyyy", {
                                locale: ru,
                              })) ||
                              "Выберите дату отъезда"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent w="full">
                          <PopoverArrow />
                          <Flex h="full" w="full">
                            <CalendarPanel
                              dayzedHookProps={{
                                selected: value,
                                onDateSelected: ({ date }) => {
                                  if (isBefore(date, checkIn)) {
                                    setValue("checkIn", date);
                                  }
                                  onChange(date);
                                  endOnClose();
                                },
                                monthsToDisplay: 1,
                                date: value,
                                firstDayOfWeek: 1,
                                minDate: subDays(new Date(), 1),
                                maxDate: new Date(
                                  new Date().getFullYear(),
                                  new Date().getMonth() + 12,
                                  new Date().getDate()
                                ),
                              }}
                              configs={DefaultConfigs}
                              showTooltipOnHover={false}
                              showTooltipOnSelect={false}
                              hoveredDate={null}
                              showNavigationButton
                              //   disabledDates={new Set(disabledDays?.flat())}
                            />
                          </Flex>
                        </PopoverContent>
                      </Popover>
                    );
                  }}
                />
                <FormErrorMessage>{errors.checkOut?.message}</FormErrorMessage>
              </Stack>
            </HStack>
          </FormControl>
        </Stack>
      </ModalBody>

      <ModalFooter>
        <Button variant="ghost" mr={3} onClick={onClose}>
          Закрыть
        </Button>
        <Button colorScheme="blue" onClick={handleSubmit(onCreate)}>
          Далее
        </Button>
      </ModalFooter>
    </>
  );
});
