import { CalendarIcon, SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Grid,
  GridItem,
  Stack,
  Select,
  Button,
  InputGroup,
  Input,
  InputLeftElement,
  HStack,
  Switch,
} from "@chakra-ui/react";

import { calendarActions } from "..";

import { Day } from "./Day";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getColumnDays } from "../model/selectors";
import { MouseEventHandler, useRef } from "react";

export const Calendar = () => {
  const dispatch = useAppDispatch();
  const days = useAppSelector(getColumnDays);

  const touchX = useRef(0);
  const clientX = useRef(0);
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  function onTouchStart(event) {
    touchX.current = event.changedTouches[0].clientX;
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  function onTouchMove(event) {
    const diffX = event.changedTouches[0].clientX - touchX.current;
    if (Math.abs(diffX) > 70) {
      touchX.current = event.changedTouches[0].clientX;
      if (diffX < 0) {
        dispatch(calendarActions.increaseDay());
      } else {
        dispatch(calendarActions.decrease());
      }
    }
  }
  function onMouseStart(event: MouseEvent) {
    clientX.current = event.clientX;
  }

  function onMouseMove(event: MouseEvent) {
    if (!clientX.current) return;

    const diffX = event.clientX - clientX.current;
    const Dev = diffX / 70;
    const isChange =
      (Dev < 0 && Math.floor(-Dev) !== 0) || (Dev > 0 && Math.ceil(Dev));
    if (isChange) {
      if (Dev < 0) {
        dispatch(calendarActions.increaseDay());
      } else {
        dispatch(calendarActions.decrease());
      }
      clientX.current += Math.sign(diffX) * 70;
    }
  }

  function onMouseEnd() {
    clientX.current = 0;
  }

  return (
    <Box bgColor={"blackAlpha.50"}>
      <Box h="144px">
        <Grid
          gridTemplateColumns={"280px 1fr"}
          gridTemplateRows={"64px 80px"}
          gridTemplateAreas={`"filter actionsTop"
              "filter actionsBottom"`}
        >
          <GridItem area={"filter"}>
            <Stack>
              <Select>
                <option>Дом, коттедж</option>
              </Select>
              <Button leftIcon={<CalendarIcon />}>
                Найти свободные на даты
              </Button>
              <InputGroup>
                <Input placeholder="Адресс объекта" />
                <InputLeftElement>
                  <SearchIcon />
                </InputLeftElement>
              </InputGroup>
            </Stack>
          </GridItem>

          <GridItem area={"actionsTop"}>
            <Grid gridTemplateColumns={"1fr 160px"}>
              <GridItem>
                <HStack>
                  <Button></Button>
                  <Button></Button>
                  <Button></Button>
                </HStack>
              </GridItem>
              <GridItem>
                <Switch>Режим Цен</Switch>
              </GridItem>
            </Grid>
          </GridItem>

          <GridItem area={"actionsBottom"}>
            <HStack
              cursor={"ew-resize"}
              border={"1px solid"}
              borderColor={"#d8d8d8"}
              overflow={"hidden"}
              alignItems={"center"}
              spacing={0}
              h="full"
              userSelect={"none"}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onMouseDown={
                onMouseStart as unknown as MouseEventHandler<HTMLDivElement>
              }
              onMouseMove={
                onMouseMove as unknown as MouseEventHandler<HTMLDivElement>
              }
              onMouseUp={onMouseEnd}
            >
              {days.map((day) => {
                return (
                  <Day
                    isMonth={day.isMonth}
                    date={day.date}
                    key={day.date.getDate()}
                  />
                );
              })}
            </HStack>
          </GridItem>
        </Grid>
      </Box>
      <Box h="calc(100dvh - 144px)"></Box>
    </Box>
  );
};
