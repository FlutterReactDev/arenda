import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { format } from "date-fns";
import { memo } from "react";
import { calendarActions } from "..";
import {
  getObjects,
  getTodayCheckIn,
  getTodayCheckInAvailibilities,
  getTodayCheckOut,
  getTodayCheckOutAvailibilities,
} from "../model/selectors";
import { EventClickProps } from "../model/types";
import { usePagination } from "../model/usePagination";
import { CalendarClock } from "./CalendarClock";
import { EventItem } from "./EventItem";

export const TodayCalendarInfo = memo(() => {
  const dispatch = useAppDispatch();
  const checkInCount = useAppSelector(getTodayCheckIn);
  const checkOutCount = useAppSelector(getTodayCheckOut);
  const checkInAvailibilities = useAppSelector(getTodayCheckInAvailibilities);
  const checkOutAvailibilities = useAppSelector(getTodayCheckOutAvailibilities);
  const objects = useAppSelector(getObjects);
  const onClick = (minDate: Date) => {
    dispatch(calendarActions.setBeginDate(minDate));
  };
  const { jump } = usePagination();
  const onEventClick = ({ availibilityInfo, page }: EventClickProps) => {
    dispatch(calendarActions.setBeginDate(availibilityInfo.minDate));
    jump(page);
  };
  return (
    <Box
      px={4}
      py={2}
      rounded={"lg"}
      bgColor={"white"}
      border={"1px solid"}
      borderColor={"#444"}
    >
      <CalendarClock />
      <Stack spacing={0}>
        <HStack>
          <Popover isLazy>
            <PopoverTrigger>
              <Button variant={"link"}>Заезды</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader pt={4} fontWeight="bold" border="0">
                Заезды
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody h={"80"} overflowY={"auto"}>
                <Stack>
                  {checkInAvailibilities.map(({ id, objectId }) => {
                    return (
                      <EventItem
                        key={`${objectId}${id}`}
                        id={id}
                        objectId={objectId}
                        onEventClick={onEventClick}
                      />
                    );
                  })}
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Text fontWeight={"medium"}>{checkInCount}</Text>
        </HStack>
        <HStack>
          <Popover isLazy strategy="fixed" preventOverflow>
            <PopoverTrigger>
              <Button variant={"link"}>Выезды</Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader pt={4} fontWeight="bold" border="0">
                Выезды
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody h={"80"} overflowY={"auto"}>
                <Stack>
                  {checkOutAvailibilities.map(
                    ({ comment, color, maxDate, minDate }) => {
                      return (
                        <Stack
                          spacing={0}
                          border={"1px solid"}
                          borderColor={color}
                          rounded={"lg"}
                          p={2}
                          cursor={"pointer"}
                          _hover={{
                            boxShadow: "lg",
                          }}
                          transition={"0.3s all"}
                          onClick={() => onClick(minDate)}
                        >
                          <HStack alignItems={"center"}>
                            <Text
                              fontSize={"md"}
                              overflow={"hidden"}
                              textOverflow={"ellipsis"}
                              whiteSpace={"nowrap"}
                              fontWeight={"medium"}
                              color={"gray.500"}
                            >
                              {comment || "Нет коментария"}
                            </Text>
                            <Box
                              h={2}
                              w="60px"
                              bgColor={color}
                              rounded={"full"}
                            ></Box>
                          </HStack>
                          <Text
                            fontSize={"sm"}
                            overflow={"hidden"}
                            textOverflow={"ellipsis"}
                            whiteSpace={"nowrap"}
                            fontWeight={"medium"}
                            color={"gray.500"}
                          >
                            Дата заезда: {format(minDate, "y-M-d")}
                          </Text>
                          <Text
                            fontSize={"sm"}
                            overflow={"hidden"}
                            textOverflow={"ellipsis"}
                            whiteSpace={"nowrap"}
                            fontWeight={"medium"}
                            color={"gray.500"}
                          >
                            Дата выезда: {format(maxDate, "y-M-d")}
                          </Text>
                          <Text
                            fontSize={"sm"}
                            overflow={"hidden"}
                            textOverflow={"ellipsis"}
                            whiteSpace={"nowrap"}
                            fontWeight={"medium"}
                            color={"gray.500"}
                          >
                            Номер: Хуй в пальто
                          </Text>
                          <ButtonGroup mt={2} size="sm">
                            <Button colorScheme="yellow">Редактировать</Button>
                            <Button colorScheme="red">Удалить</Button>
                          </ButtonGroup>
                        </Stack>
                      );
                    }
                  )}
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Popover>
          <Text fontWeight={"medium"}>{checkOutCount}</Text>
        </HStack>
        <HStack>
          <Button variant={"link"} fontWeight={"medium"}>
            Всего объектов:
          </Button>
          <Text fontWeight={"medium"}> {objects.length}</Text>
        </HStack>
      </Stack>
    </Box>
  );
});
