import { SearchIcon } from "@chakra-ui/icons";
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
  useMediaQuery,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarPanel, DefaultConfigs } from "@shared/ui/Calendar";
import {
  addDays,
  format,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  subDays,
} from "date-fns";
import { ru } from "date-fns/locale";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SearchAvailibilityRoomsSchema,
  SearchAvailibilityRoomsType,
} from "../model/searchAvailibilityRoomsSchema";
import { useSearchAvailibilityRoomsModal } from "../model/useSearchAvailibilityRoomsModal";
import { getHourList } from "../utils/getHoursList";
import { toDay } from "../utils/toDay";
interface SearchAvailibilityRoomsFormProps {
  onClose: () => void;
}
export const SearchAvailibilityRoomsForm: FC<
  SearchAvailibilityRoomsFormProps
> = (props) => {
  const [isSm] = useMediaQuery("(max-width:30em)");
  const { onOpen: onOpenSearchAvailibilityRoomsModal } =
    useSearchAvailibilityRoomsModal();
  const { onClose } = props;
  const {
    control,
    register,
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
  } = useForm<SearchAvailibilityRoomsType>({
    resolver: yupResolver(SearchAvailibilityRoomsSchema),
  });
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

  const onSearch = (data: SearchAvailibilityRoomsType) => {
    onOpenSearchAvailibilityRoomsModal(data);
    onClose();
  };

  const minDate = watch("minDate");
  const maxDate = watch("maxDate");
  return (
    <>
      <ModalBody>
        <Stack>
          <FormControl
            isInvalid={!!errors.minDate?.message || !!errors.maxDate?.message}
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
                  name="minDate"
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
                            {...(!!errors.minDate?.message && {
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
                                  if (isAfter(date, maxDate)) {
                                    setValue("maxDate", addDays(date, 1));
                                  }

                                  if (!maxDate) {
                                    setValue("maxDate", addDays(date, 1));
                                  }

                                  if (maxDate && isEqual(date, maxDate)) {
                                    setValue("maxDate", addDays(date, 1));
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
                <FormErrorMessage>{errors.minDate?.message}</FormErrorMessage>
              </Stack>
              <Stack w="full" spacing={0}>
                <Controller
                  control={control}
                  name="maxDate"
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Popover
                        isLazy
                        isOpen={endIsOpen}
                        onClose={endOnClose}
                        {...(isSm && {
                          matchWidth: true,
                        })}
                      >
                        <PopoverTrigger>
                          <Button
                            onClick={endOnOpen}
                            w="full"
                            variant={"outline"}
                            {...(!!errors.maxDate?.message && {
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
                                  if (isBefore(date, minDate)) {
                                    setValue("minDate", subDays(date, 1));
                                  }

                                  if (minDate && isSameDay(date, maxDate)) {
                                    setValue("minDate", subDays(date, 1));
                                  }

                                  onChange(date);
                                  endOnClose();
                                },
                                monthsToDisplay: 1,
                                date: value || minDate,
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
                            />
                          </Flex>
                        </PopoverContent>
                      </Popover>
                    );
                  }}
                />
                <FormErrorMessage>{errors.maxDate?.message}</FormErrorMessage>
              </Stack>
            </HStack>
          </FormControl>

          <FormControl
            isInvalid={!!errors.checkIn?.message || !!errors.checkOut?.message}
          >
            <FormLabel>Время</FormLabel>
            <HStack alignItems={"flex-start"}>
              <Stack w="full">
                <Select {...register("checkIn")} placeholder="выберите время">
                  {getHourList().map((hour) => (
                    <option value={hour} key={hour}>
                      c {hour}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>{errors.checkIn?.message}</FormErrorMessage>
              </Stack>
              <Stack w="full">
                <Select {...register("checkOut")} placeholder="выберите время">
                  {getHourList().map((hour) => (
                    <option value={hour} key={hour}>
                      до {hour}
                    </option>
                  ))}
                </Select>
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
        <Button
          colorScheme="blue"
          leftIcon={<SearchIcon />}
          onClick={handleSubmit(onSearch)}
        >
          Найти
        </Button>
      </ModalFooter>
    </>
  );
};
