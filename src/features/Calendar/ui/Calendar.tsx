import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  HStack,
  Hide,
  IconButton,
  Stack,
  useMediaQuery,
} from "@chakra-ui/react";

import { calendarActions } from "..";

import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { memo, useCallback, useEffect, useState } from "react";
import {
  getColumnDays,
  getCommonSettings,
  getObjectGroup,
} from "../model/selectors";
import { Day } from "./Day";

import { Loader } from "@shared/ui/Loader";
import { ActionTop } from "./ActionTop";
import { CalendarCollapseGroup } from "./CalendarCollapseGroup";
import { CalendarScroller } from "./CalendarScroller";
import { ChangeObjectRoom } from "./ChangeObjectRoom";
import { ModalDeleteAvailibility } from "./ModalDeleteAvailibility";
import { ObjectItem } from "./ObjectItem";
import { SearchAvailibilityRoomsBtn } from "./SearchAvailibilityRoomsBtn";
import { SearchAvailibilityRoomsModal } from "./SearchAvailibilityRoomsModal";
import { SearchObject } from "./SearchObject";
import { Sidebar } from "./Sidebar";
import { SmallGoToDateBtn } from "./SmallGoToDateBtn";

export const Calendar = memo(() => {
  const dispatch = useAppDispatch();
  const appIsLoading = useAppSelector((state) => state.calendar.appLoading);

  const objectsGroup = useAppSelector(getObjectGroup);

  const [isLessThan968] = useMediaQuery("(max-width: 968px)");
  const days = useAppSelector(getColumnDays);

  const [rangeObjectId, setRangeObjectId] = useState<null | number>(null);

  const { sidebarWidth } = useAppSelector(getCommonSettings);

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
        {...(!isLessThan968 && {
          position: "sticky",
          top: 0,
          zIndex: "9",
        })}
        bgColor={"#f5f5f5"}
      >
        <GridItem area={"filter"}>
          <Stack alignItems={"center"} h="full" spacing={3}>
            <ChangeObjectRoom />
            <Hide breakpoint="(max-width: 968px)">
              <SearchAvailibilityRoomsBtn />
              <SearchObject />
            </Hide>
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

      <Box position={"relative"}>
        {appIsLoading && (
          <Center p={4}>
            <Loader />
          </Center>
        )}
        {!appIsLoading &&
          objectsGroup.map(({ name, objects }, idx) => {
            return (
              <CalendarCollapseGroup
                title={`${name}`}
                {...(idx != 0 && {
                  defaultIsOpen: false,
                })}
              >
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
              </CalendarCollapseGroup>
            );
          })}

        <CalendarScroller />
      </Box>
      <ModalDeleteAvailibility />
      <SearchAvailibilityRoomsModal />
      <Sidebar />
    </Box>
  );
});
