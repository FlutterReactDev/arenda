import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Hide,
  IconButton,
  Select,
  Show,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";

import { calendarActions } from "..";

import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  getColumnDays,
  getCommonSettings,
  getCurrentObjects,
} from "../model/selectors";
import { Day } from "./Day";

import { useDrag } from "@use-gesture/react";

import { ActionTop } from "./ActionTop";
import { CalendarScroller } from "./CalendarScroller";
import { ModalDeleteAvailibility } from "./ModalDeleteAvailibility";
import { ObjectItem } from "./ObjectItem";
import { ObjectPagination } from "./ObjectsPagination";
import { SearchAvailibilityRoomsBtn } from "./SearchAvailibilityRoomsBtn";
import { SearchAvailibilityRoomsModal } from "./SearchAvailibilityRoomsModal";
import { SearchObject } from "./SearchObject";
import { Sidebar } from "./Sidebar";
import { SmallGoToDateBtn } from "./SmallGoToDateBtn";

export const Calendar = memo(() => {
  const dispatch = useAppDispatch();

  const [isLessThan968] = useMediaQuery("(max-width: 968px)");
  const days = useAppSelector(getColumnDays);
  const objects = useAppSelector(getCurrentObjects);
  const [rangeObjectId, setRangeObjectId] = useState<null | number>(null);
  const touchX = useRef(0);
  const { currentWidth, sidebarWidth } = useAppSelector(getCommonSettings);

  const onResize = () => {
    dispatch(calendarActions.initWidthWindow());
  };

  useEffect(() => {
    window.addEventListener("resize", onResize);

    dispatch(calendarActions.initWidthWindow());

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const bind = useDrag(
    ({ offset: [ox], first }) => {
      if (first) {
        touchX.current = ox;
      }
      const diffX = ox - touchX.current;

      if (Math.abs(diffX) >= currentWidth) {
        touchX.current = ox;
        if (diffX < 0) {
          dispatch(calendarActions.increaseDay());
        } else {
          dispatch(calendarActions.decreaseDay());
        }
      }
    },
    {
      axis: "x",
    }
  );

  const onScroll = useCallback(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    (event) => {
      if (event.deltaY > 1) {
        dispatch(calendarActions.increaseDay());
      } else {
        dispatch(calendarActions.decreaseDay());
      }
    },
    [dispatch]
  );

  const onPrev = () => {
    dispatch(calendarActions.decreaseStep());
  };
  const onNext = () => {
    dispatch(calendarActions.increaseStep());
  };

  const onRangeObjectId = useCallback((id: number) => {
    setRangeObjectId(id);
  }, []);

  return (
    <Box >
      <Box>
        <Grid
          gridTemplateColumns={isLessThan968 ? "1fr" : "270px 1fr"}
          gridTemplateRows={isLessThan968 ? "auto auto" : "124px 80px"}
          gridTemplateAreas={
            isLessThan968
              ? ` "filter filter"
              "actionsTop actionsTop"
              "actionsBottom actionsBottom"
              `
              : `
              "filter actionsTop"
              " filter actionsBottom"`
          }
        >
          <GridItem area={"filter"}>
            <Stack alignItems={"center"} h="full" spacing={3}>
              <Select bgColor={"white"}>
                <option>Дом, коттедж</option>
              </Select>
              <Hide breakpoint="(max-width: 968px)">
                <SearchAvailibilityRoomsBtn />
                <SearchObject />
              </Hide>
              <Box w="full">
                <Hide breakpoint="(max-width: 968px)">
                  <ObjectPagination />
                </Hide>
              </Box>
            </Stack>
          </GridItem>

          <ActionTop />

          <GridItem area={"actionsBottom"} overflow={"hidden"} w="full">
            <Grid
              gridTemplateColumns={
                isLessThan968 ? `${sidebarWidth}px 1fr` : "1fr"
              }
              alignItems={"flex-end"}
            >
              {isLessThan968 && (
                <Flex alignItems={"center"} justifyContent={"center"} pb={1}>
                  <SmallGoToDateBtn />
                </Flex>
              )}

              <HStack
                cursor={"ew-resize"}
                borderBottom={"1px solid"}
                borderColor={"#d8d8d8"}
                overflow={"hidden"}
                spacing={0}
                h="full"
                userSelect={"none"}
                pos={"relative"}
                {...bind()}
                onWheel={onScroll}
                style={{
                  touchAction: "none",
                }}
              >
                {!isLessThan968 && (
                  <IconButton
                    aria-label="left arrow"
                    onClick={onPrev}
                    isRound
                    bgColor={"white"}
                    mt={4}
                    position={"absolute"}
                    left={"15px"}
                    top={"15px"}
                    fontSize={"xl"}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                )}

                {days.map((day, index) => {
                  return <Day key={index} {...day} />;
                })}

                {!isLessThan968 && (
                  <IconButton
                    aria-label="right arrow"
                    onClick={onNext}
                    isRound
                    bgColor={"white"}
                    mt={4}
                    right={"15px"}
                    top={"15px"}
                    position={"absolute"}
                    fontSize={"xl"}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                )}
              </HStack>
            </Grid>
          </GridItem>
        </Grid>
      </Box>
      <Box h="calc(100dvh - 204px - 48px)" position={"relative"}>
        {objects.map((object) => {
          return (
            <ObjectItem
              setRangeObjectId={onRangeObjectId}
              rangeObjectId={rangeObjectId}
              {...object}
              key={object.id}
            />
          );
        })}
        <CalendarScroller />
        <Show breakpoint="(max-width: 968px)">
          <Box maxW={"64"} mt={4}>
            <ObjectPagination />
          </Box>
        </Show>
      </Box>
      <ModalDeleteAvailibility />
      <SearchAvailibilityRoomsModal />
      <Sidebar />
    </Box>
  );
});
