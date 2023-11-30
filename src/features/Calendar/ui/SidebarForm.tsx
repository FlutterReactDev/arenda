import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  DrawerBody,
  DrawerFooter,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  Tooltip,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { CalendarPanel, DefaultConfigs } from "@shared/ui/Calendar";
import {
  eachDayOfInterval,
  format,
  getHours,
  isAfter,
  isBefore,
  max,
  min,
  setHours,
  subDays,
} from "date-fns";
import { ru } from "date-fns/locale";

import { PhoneInput } from "@entites/Phone";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import {
  LegacyRef,
  MutableRefObject,
  RefObject,
  memo,
  useCallback,
  useId,
  useMemo,
  useRef,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { calendarActions } from "..";
import { CalendarSchema, CalendarSchemaType } from "../model/schema";
import {
  getCalendar,
  getObject,
  getObjectAvailibility,
  getObjectAvailibilityById,
  getSeasonPriceByDate,
} from "../model/selectors";
import { SidebarType } from "../model/types";
import { useSidebar } from "../model/useSidebar";
import { converHourToString } from "../utils/converHourToString";
import { convertToHour } from "../utils/convertToHour";
import { getHourList } from "../utils/getHoursList";
import { isOverlaping } from "../utils/isOverlaping";
import { toDay } from "../utils/toDay";

export const SidebarForm = memo(() => {
  const dispatch = useAppDispatch();
  const availabilityIdx = useId();
  const [isLessThan968] = useMediaQuery("(max-width: 968px)");
  const availibleColors = useMemo(
    () => [
      "#d8d8d8",
      "red.700",
      "blue.500",
      "purple.500",
      "green.500",
      "gray.500",
      "facebook.500",
      "yellow.500",
      "linkedin.500",
      "pink.500",
      "black",
      "orange.500",
      "teal.500",
      "cyan.500",
    ],
    []
  );

  const {
    isOpen: alertModalIsOpen,
    onClose: alertModalOsClose,
    onOpen: alertModalOnOpen,
  } = useDisclosure();
  const cancelRef = useRef() as MutableRefObject<HTMLButtonElement>;
  const {
    onClose,
    objectId,
    type: sidebarType,
    availabilityId,
    checkIn,
    checkOut,
  } = useSidebar();

  const { rangeSelect } = useAppSelector(getCalendar);
  const availability = useAppSelector(
    getObjectAvailibility(objectId as number)
  );
  const availabilityInfo = useAppSelector(
    getObjectAvailibilityById(objectId, availabilityId)
  );
  const object = useAppSelector(getObject(objectId as number));

  const selectedDatesForCost = useAppSelector(
    getSeasonPriceByDate(
      objectId,
      rangeSelect.in != null && rangeSelect.out != null
        ? eachDayOfInterval({
            start: min([rangeSelect.in, rangeSelect.out]),
            end: max([rangeSelect.in, rangeSelect.out]),
          })
        : []
    )
  );

  const getCellPrice = useCallback(() => {
    if (
      selectedDatesForCost.length >= 1 &&
      Math.min(...selectedDatesForCost.map((s) => s.cost)) ==
        Math.max(...selectedDatesForCost.map((s) => s.cost))
    ) {
      return `${Math.max(...selectedDatesForCost.map((s) => s.cost))}`;
    }

    return "";
  }, [selectedDatesForCost]);

  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CalendarSchemaType>({
    resolver: yupResolver(CalendarSchema),
    defaultValues: {
      type: sidebarType
        ? sidebarType == SidebarType.BOOK
          ? "closeForBooking"
          : "closeForBooking"
        : "setThePrice",
      costPerDay: getCellPrice(),
      minDate:
        sidebarType == SidebarType.EDIT
          ? availabilityInfo.minDate
          : (rangeSelect.in as Date),
      maxDate:
        sidebarType == SidebarType.EDIT
          ? availabilityInfo.maxDate
          : (rangeSelect.out as Date),
      bookingColor:
        sidebarType == SidebarType.EDIT ? availabilityInfo.color : "#d8d8d8",
      ...(sidebarType == SidebarType.EDIT && {
        comment: availabilityInfo?.comment,
      }),
      checkIn:
        sidebarType == SidebarType.EDIT
          ? converHourToString(getHours(availabilityInfo.minDate))
          : object?.checkIn,
      checkOut:
        sidebarType == SidebarType.EDIT
          ? converHourToString(getHours(availabilityInfo.maxDate))
          : object?.checkOut,
      ...(sidebarType == SidebarType.BOOK &&
        checkIn &&
        checkOut && {
          checkIn,
          checkOut,
        }),

      ...(sidebarType == SidebarType.EDIT && {
        clientFullName: availabilityInfo.clientFullname,
      }),

      ...(sidebarType == SidebarType.EDIT && {
        phoneNumber: availabilityInfo.phoneNumber,
      }),
    },
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
  const startRef = useRef() as RefObject<HTMLDivElement>;
  const endRef = useRef() as RefObject<HTMLDivElement>;

  const type = watch("type");
  const maxDate = watch("maxDate");
  const minDate = watch("minDate");

  const onCreateAvailibility = ({
    id,
    maxDate,
    minDate,
    comment,
    color,
    phoneNumber,
    clientFullname,
    checkIn,
    checkOut,
  }: {
    minDate: Date;
    maxDate: Date;
    comment: string;
    id: number;
    color: string;
    phoneNumber?: string;
    clientFullname?: string;
    checkIn: string;
    checkOut: string;
  }) => {
    const isCanSelect = availability.filter((a) => {
      return isOverlaping(
        {
          start: setHours(minDate, convertToHour(checkIn) || 0),
          end: setHours(maxDate, convertToHour(checkOut) || 0),
        },
        {
          start: a.minDate,
          end: a.maxDate,
        }
      );
    });

    if (isCanSelect.length == 0) {
      objectId != undefined &&
        dispatch(
          calendarActions.createAvailability({
            id,
            minDate: setHours(minDate, convertToHour(checkIn) || 0),
            maxDate: setHours(maxDate, convertToHour(checkOut) || 0),
            objectId,
            comment,
            color,
            createdDate: new Date(),
            totalSum: selectedDatesForCost.reduce(
              (acc, cur) => acc + cur.cost,
              0
            ),
            phoneNumber: phoneNumber || "",
            clientFullname: clientFullname || "",
          })
        );
      reset();
      onClose();
      dispatch(calendarActions.setClearRange());
    } else {
      alertModalOnOpen();
    }
  };

  const onCreateSeasonPrice = ({
    cost,
    dates,
    objectId,
  }: {
    dates: Date[];
    cost: number;
    objectId: number;
  }) => {
    dispatch(
      calendarActions.createSeasonPrice({
        cost,
        objectId,
        dates,
      })
    );
    reset();
    onClose();
    dispatch(calendarActions.setClearRange());
  };

  const onEditAvailibility = ({
    maxDate,
    minDate,
    comment,
    color,
    id,
    objectId,
    phoneNumber,
    clientFullname,
    checkIn,
    checkOut,
  }: {
    minDate: Date;
    maxDate: Date;
    comment: string;
    id: number;
    color: string;
    objectId: number;
    phoneNumber?: string;
    clientFullname?: string;
    checkIn: string;
    checkOut: string;
  }) => {
    const isCanSelect = availability
      .filter((a) => {
        return isOverlaping(
          {
            start: setHours(minDate, convertToHour(checkIn) || 0),
            end: setHours(maxDate, convertToHour(checkOut) || 0),
          },
          {
            start: a.minDate,
            end: a.maxDate,
          }
        );
      })
      .filter((a) => a.id != id);

    if (isCanSelect.length == 0) {
      objectId != undefined &&
        dispatch(
          calendarActions.editAvailability({
            color,
            comment,
            minDate: setHours(minDate, convertToHour(checkIn) || 0),
            maxDate: setHours(maxDate, convertToHour(checkOut) || 0),
            id,
            objectId,
            phoneNumber: phoneNumber || "",
            clientFullname: clientFullname || "",
          })
        );
      reset();
      onClose();
      dispatch(calendarActions.setClearRange());
    } else {
      alertModalOnOpen();
    }
  };

  const onSave = (data: CalendarSchemaType) => {
    if (
      (data.type == "closeForBooking" && !sidebarType) ||
      sidebarType == SidebarType.BOOK
    ) {
      onCreateAvailibility({
        id: availabilityIdx as unknown as number,
        minDate: data.minDate,
        maxDate: data.maxDate,
        comment: data.comment as string,
        color: data.bookingColor,
        phoneNumber: data.phoneNumber,
        clientFullname: data.clientFullName,
        checkIn: data.checkIn,
        checkOut: data.checkOut,
      });
    }

    if (data.type == "setThePrice") {
      if (objectId != null) {
        onCreateSeasonPrice({
          cost: Number(data.costPerDay) as number,
          dates: eachDayOfInterval({
            start: data.minDate,
            end: data.maxDate,
          }),
          objectId,
        });
      }
    }

    if (sidebarType == SidebarType.EDIT) {
      if (availabilityId != undefined && objectId != undefined) {
        onEditAvailibility({
          id: availabilityId,
          minDate: data.minDate,
          maxDate: data.maxDate,
          comment: data.comment as string,
          color: data.bookingColor,
          objectId,
          clientFullname: data.clientFullName,
          phoneNumber: data.phoneNumber,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
        });
      }
    }
  };

  return (
    <>
      <DrawerBody>
        <Stack spacing={6}>
          <HStack>
            <Box w={"120px"} h={"120px"}>
              <Image
                w="full"
                h="full"
                rounded={"lg"}
                objectFit={"cover"}
                src="https://i.sutochno.ru/punx_8k4IWvahS61jB4zYKxq8Q949HNdirT3YZH9SQo/fit/400/300/no/1/czM6Ly9zdGF0aWMuc3V0b2Nobm8ucnUvZG9jL2ZpbGVzL29iamVjdHMvMS82MzcvMjU0LzY1MmViYzM3ZDI3YTIuanBn.webp"
              />
            </Box>
            <Stack spacing={0}>
              <Text>ID 123912321</Text>
              <Text>Хуйевый пансионат</Text>
              <Text>Китай</Text>
            </Stack>
          </HStack>

          <HStack>
            <Controller
              control={control}
              name="minDate"
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
                    <PopoverContent
                      maxW={isLessThan968 ? "100dvw" : "full"}
                      w="full"
                      ref={startRef}
                    >
                      <Flex h="full">
                        <CalendarPanel
                          dayzedHookProps={{
                            selected: value,
                            onDateSelected: ({ date }) => {
                              if (isAfter(date, maxDate)) {
                                setValue("maxDate", date);
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
              name="maxDate"
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
                    <PopoverContent
                      ref={endRef}
                      maxW={isLessThan968 ? "100dvw" : "full"}
                      w="full"
                    >
                      <Flex h="full" w="full">
                        <CalendarPanel
                          dayzedHookProps={{
                            selected: value,
                            onDateSelected: ({ date }) => {
                              if (isBefore(date, minDate)) {
                                setValue("minDate", date);
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
          {!sidebarType && (
            <Text
              fontSize={"xl"}
              fontWeight={"medium"}
              display={"flex"}
              alignItems={"center"}
              gap={2}
            >
              Что делать с датами?{" "}
              <Tooltip
                hasArrow
                label="Вы можете установить стоимость проживания в выбранные дни или закрыть их в календаре."
                placement="top"
              >
                <QuestionOutlineIcon />
              </Tooltip>
            </Text>
          )}

          {!sidebarType && (
            <Controller
              control={control}
              name="type"
              defaultValue="setThePrice"
              render={({ field: { onChange, value } }) => {
                return (
                  <RadioGroup
                    onChange={(value) => onChange(value)}
                    value={value}
                  >
                    <Stack>
                      <Radio value="setThePrice">Установить цену </Radio>
                      <Radio value="closeForBooking">
                        Закрыть для бронирования{" "}
                      </Radio>
                    </Stack>
                  </RadioGroup>
                );
              }}
            />
          )}

          {type == "setThePrice" && (
            <>
              <FormControl isInvalid={!!errors.costPerDay?.message}>
                <HStack
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  mb={2}
                >
                  <FormLabel m={0}>
                    Стоимость за сутки{" "}
                    <Tooltip
                      hasArrow
                      label="Чтобы изменить число гостей, проживание которых включено в эту стоимость, перейдите в"
                      placement="top"
                    >
                      <QuestionOutlineIcon />
                    </Tooltip>
                  </FormLabel>
                  <Button variant={"link"} colorScheme="blue">
                    Настройка цен
                  </Button>
                </HStack>

                <InputGroup>
                  <Input
                    {...register("costPerDay")}
                    type="number"
                    {...(selectedDatesForCost.length > 1 &&
                      Math.min(...selectedDatesForCost.map((s) => s.cost)) !=
                        Math.max(
                          ...selectedDatesForCost.map((s) => s.cost)
                        ) && {
                        placeholder: `${Math.min(
                          ...selectedDatesForCost.map((s) => s.cost)
                        )}$ - ${Math.max(
                          ...selectedDatesForCost.map((s) => s.cost)
                        )}$`,
                      })}
                  />
                  <InputRightElement>$</InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.costPerDay?.message}
                </FormErrorMessage>
                <Button variant={"link"} colorScheme="blue">
                  Расширенный выбор дат
                </Button>
              </FormControl>

              <FormControl isInvalid={!!errors.minimumStayPeriod?.message}>
                <FormLabel>
                  Минимальный срок проживания{" "}
                  <Tooltip
                    hasArrow
                    label="Действует при заселении в выбранные даты."
                    placement="top"
                  >
                    <QuestionOutlineIcon />
                  </Tooltip>
                </FormLabel>
                <Select
                  placeholder="Выберите минимальный срок проживания"
                  {...register("minimumStayPeriod")}
                >
                  <option value="1">1 сутки</option>
                  <option value="2">2 суток</option>
                  <option value="3">3 суток</option>
                  <option value="4">4 суток</option>
                  <option value="5">5 суток</option>
                  <option value="6">6 суток</option>
                  <option value="7">7 суток</option>
                  <option value="8">8 суток</option>
                  <option value="9">9 суток</option>
                  <option value="10">10 суток</option>
                  <option value="11">11 суток</option>
                  <option value="12">12 суток</option>
                  <option value="13">13 суток</option>
                  <option value="14">14 суток</option>
                  <option value="15">15 суток</option>
                  <option value="16">16 суток</option>
                  <option value="17">17 суток</option>
                  <option value="18">18 суток</option>
                  <option value="19">19 суток</option>
                  <option value="20">20 суток</option>
                  <option value="21">21 суток</option>
                  <option value="22">22 суток</option>
                  <option value="23">23 суток</option>
                  <option value="24">24 суток</option>
                  <option value="25">25 суток</option>
                  <option value="26">26 суток</option>
                  <option value="27">27 суток</option>
                  <option value="28">28 суток</option>
                  <option value="29">29 суток</option>
                  <option value="30">30 суток</option>
                  <option value="45">45 суток</option>
                  <option value="60">60 суток</option>
                  <option value="90">90 суток</option>
                </Select>
                <FormErrorMessage>
                  {errors.minimumStayPeriod?.message}
                </FormErrorMessage>
                <Button variant={"link"} colorScheme="blue">
                  Сезонные цены
                </Button>
              </FormControl>
            </>
          )}
          {type == "closeForBooking" && (
            <FormControl>
              <FormLabel>Время</FormLabel>
              <HStack>
                <Select {...register("checkIn")}>
                  {getHourList().map((hour) => (
                    <option value={hour}>c {hour}</option>
                  ))}
                </Select>
                <Select {...register("checkOut")}>
                  {getHourList().map((hour) => (
                    <option value={hour}>до {hour}</option>
                  ))}
                </Select>
              </HStack>
            </FormControl>
          )}
          {type == "closeForBooking" && (
            <FormControl>
              <FormLabel>Данные клиента</FormLabel>
              <Stack>
                <Input
                  placeholder="ФИО Клиента"
                  {...register("clientFullName")}
                />
                <Controller
                  control={control}
                  name="phoneNumber"
                  render={({ field: { value, onChange } }) => {
                    return <PhoneInput value={value} onChange={onChange} />;
                  }}
                />
              </Stack>
            </FormControl>
          )}
          {type == "closeForBooking" && (
            <FormControl>
              <FormLabel>Личный комментарий</FormLabel>
              <Textarea {...register("comment")} />
              <FormHelperText>
                Комментарий будет виден только вам
              </FormHelperText>
            </FormControl>
          )}
          {type == "closeForBooking" && (
            <SimpleGrid columns={[3, 3, 4]} spacing={2}>
              <Controller
                name="bookingColor"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <>
                      {availibleColors.map((color) => {
                        return (
                          <Box
                            onClick={() => onChange(color)}
                            rounded={"lg"}
                            h={"85px"}
                            p={1}
                            {...(value === color && {
                              border: "2px solid",
                              borderColor: "red.900",
                            })}
                            key={color}
                          >
                            <Box
                              rounded={"lg"}
                              bgColor={color}
                              w="full"
                              h="full"
                            />
                          </Box>
                        );
                      })}
                    </>
                  );
                }}
              />
            </SimpleGrid>
          )}
        </Stack>
      </DrawerBody>
      <DrawerFooter>
        <HStack w="full">
          <Button colorScheme="blue" w={"60%"} onClick={handleSubmit(onSave)}>
            Сохраниить
          </Button>
          <Button
            variant="outline"
            w={"40%"}
            onClick={() => {
              onClose();
              dispatch(calendarActions.setClearRange());
            }}
          >
            Отмена
          </Button>
        </HStack>
      </DrawerFooter>
      <AlertDialog
        isOpen={alertModalIsOpen}
        leastDestructiveRef={cancelRef}
        onClose={alertModalOsClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Неверная дата
            </AlertDialogHeader>

            <AlertDialogBody>
              Невозможно сохранить изменения. К этим датам в вашем календаре уже
              относится другой период.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef as LegacyRef<HTMLButtonElement>}
                onClick={alertModalOsClose}
                colorScheme="red"
              >
                Закрыть
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
});
