import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { GuestsModal } from "@entites/Object/ui/GuestsModal";
import { toDay } from "@features/Calendar/utils/toDay";
import { useSearchObjects } from "@features/SearchObjects";
import { yupResolver } from "@hookform/resolvers/yup";
import { CalendarPanel, DefaultConfigs } from "@shared/ui/Calendar";
import { differenceInDays, format, isAfter, isBefore, subDays } from "date-fns";
import { ru } from "date-fns/locale";
import { RefObject, useRef } from "react";
import { Controller, useForm } from "react-hook-form";
import { BookingFormType, bookignFormSchema } from "../model/schema";
import { getWordByNum } from "@shared/utils/getWordByNum";

export const BookingForm = () => {
  const { dates, guests } = useSearchObjects();

  const { control, handleSubmit, setValue, watch, getValues } =
    useForm<BookingFormType>({
      resolver: yupResolver(bookignFormSchema),
      defaultValues: {
        dates,
        guests,
      },
    });

  const { adultsCount, childrenAges } = watch("guests");

  const onSubmit = (data: BookingFormType) => {
    console.log(data);
  };

  const {
    isOpen: guestsIsOpen,
    onOpen: guestsOnOpen,
    onClose: guestsOnClose,
  } = useDisclosure();

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
  const startRef = useRef() as RefObject<HTMLDivElement>;
  const endRef = useRef() as RefObject<HTMLDivElement>;

  return (
    <Box rounded={"lg"} as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <HStack>
          <Controller
            name="dates.checkIn"
            control={control}
            render={({ field: { value, onChange } }) => {
              return (
                <Popover isOpen={startIsOpen} onClose={startOnClose}>
                  <PopoverTrigger>
                    <Button
                      onClick={startOnOpen}
                      w="full"
                      variant={"outline"}
                      h={12}
                    >
                      {(value &&
                        format(value, "d LLLL yyyy", {
                          locale: ru,
                        })) ||
                        ""}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent w="full" ref={startRef}>
                    <Flex h="full">
                      <CalendarPanel
                        dayzedHookProps={{
                          selected: value,
                          onDateSelected: ({ date }) => {
                            if (isAfter(date, value)) {
                              setValue("dates.checkOut", date);
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
                      />
                    </Flex>
                  </PopoverContent>
                </Popover>
              );
            }}
          />

          <Controller
            control={control}
            name="dates.checkOut"
            render={({ field: { value, onChange } }) => {
              return (
                <Popover isOpen={endIsOpen} onClose={endOnClose}>
                  <PopoverTrigger>
                    <Button
                      onClick={endOnOpen}
                      w="full"
                      variant={"outline"}
                      h={12}
                    >
                      {(value &&
                        format(value, "d LLLL yyyy", {
                          locale: ru,
                        })) ||
                        ""}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent ref={endRef} w="full">
                    <Flex h="full" w="full">
                      <CalendarPanel
                        dayzedHookProps={{
                          selected: value,
                          onDateSelected: ({ date }) => {
                            if (isBefore(date, value)) {
                              setValue("dates.checkIn", date);
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
                      />
                    </Flex>
                  </PopoverContent>
                </Popover>
              );
            }}
          />
        </HStack>

        <Button onClick={guestsOnOpen} variant={"outline"}>
          <HStack w={"full"} justifyContent={"space-between"}>
            <HStack>
              <Text
                fontWeight="medium"
                fontSize={{
                  "2xl": "16px",
                  md: "16px",
                  base: "16px",
                }}
              >
                {`${
                  adultsCount || getValues("guests.adultsCount")
                } ${getWordByNum(
                  adultsCount || getValues("guests.adultsCount"),
                  ["Взрослый", "Взрослых", "Взрослых"]
                )}`}
                ,{" "}
                <Text color={"gray.500"} display={"inline-block"}>
                  {childrenAges?.length != undefined &&
                    childrenAges?.length != 0 &&
                    `${childrenAges?.length} ${getWordByNum(
                      childrenAges?.length,
                      ["ребёнок", "ребёнка", "детей"]
                    )}`}
                </Text>
                {childrenAges?.length == 0 && (
                  <Text color={"gray.500"} display={"inline-block"}>
                    без детей
                  </Text>
                )}
              </Text>
            </HStack>
            <ChevronDownIcon w={6} h={6} />
          </HStack>
        </Button>
      </Stack>
      <Stack mt={4}>
        <HStack w="full" justifyContent={"space-between"}>
          <Text>
            Итого за{" "}
            {differenceInDays(
              getValues("dates.checkOut"),
              getValues("dates.checkIn")
            )}{" "}
            {getWordByNum(
              differenceInDays(
                getValues("dates.checkOut"),
                getValues("dates.checkIn")
              ),
              ["сутки", "сутки", "суток"]
            )}
          </Text>
          <Text fontWeight={"medium"} fontSize={"lg"} color="blue.600">
            510 750 ₽
          </Text>
        </HStack>
        <HStack
          p={3}
          w="full"
          justifyContent={"space-between"}
          bgColor={"blackAlpha.50"}
        >
          <Text>Внести предоплату сегодня</Text>
          <Text fontWeight={"medium"} fontSize={"lg"} color="blue.600">
            51 750 ₽
          </Text>
        </HStack>
        <HStack
          p={3}
          w="full"
          justifyContent={"space-between"}
          bgColor={"blackAlpha.50"}
        >
          <Text>Оплата при заселении</Text>
          <Text fontWeight={"medium"} fontSize={"lg"} color="blue.600">
            501 750 ₽
          </Text>
        </HStack>
      </Stack>

      <FormControl mt={4}>
        <FormLabel>Ваш телефон для бронирования</FormLabel>

        <Select>
          <option>+996 222 999 338</option>
          <option>Другой номер телефона</option>
        </Select>
      </FormControl>
      <Button colorScheme="green" w="full" mt={4} type="submit">
        Забронировать
      </Button>
      <Controller
        control={control}
        name="guests"
        render={({ field: { value, onChange } }) => {
          return (
            <GuestsModal
              value={value}
              onGuestsChange={onChange}
              isOpen={guestsIsOpen}
              onClose={guestsOnClose}
            />
          );
        }}
      />
    </Box>
  );
};
