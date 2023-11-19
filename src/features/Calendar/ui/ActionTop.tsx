import {
  Flex,
  Grid,
  GridItem,
  HStack,
  Hide,
  Show,
  useMediaQuery,
} from "@chakra-ui/react";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { memo } from "react";
import { calendarActions } from "..";
import { getObjectsBySearchAvailibility } from "../model/selectors";
import { EventClickProps } from "../model/types";
import { usePagination } from "../model/usePagination";
import { CalendarNavigationBtns } from "./CalendarNavigationBtns";
import { GoToDateBtn } from "./GoToDateBtn";
import { GoToMonth } from "./GoToMonth";
import { GoTodayBtn } from "./GoTodayBtn";
import { NewBookingBtn } from "./NewBookingBtn";
import { SearchComment } from "./SearchComment";
import { TodayCalendarInfo } from "./TodayCalendarInfo";

export const ActionTop = memo(() => {
  const dispatch = useAppDispatch();
  const [isLessThan968] = useMediaQuery("(max-width: 968px)");
  const availabilities = useAppSelector(getObjectsBySearchAvailibility);
  const { jump } = usePagination();

  const onEventClick = ({ availibilityInfo, page }: EventClickProps) => {
    dispatch(calendarActions.setBeginDate(availibilityInfo.minDate));
    jump(page);
  };
  return (
    <GridItem area={"actionsTop"}>
      <Grid gridTemplateColumns={isLessThan968 ? "1fr" : "1fr 300px"}>
        <GridItem>
          <HStack p={isLessThan968 ? 2 : 4}>
            <GoToMonth />

            <Hide breakpoint="(max-width: 968px)">
              <GoToDateBtn />
            </Hide>
            <GoTodayBtn />
          </HStack>
          <HStack
            px={2}
            {...(isLessThan968 && {
              flexWrap: "wrap",
            })}
          >
            <NewBookingBtn />

            <SearchComment
              onEventClick={onEventClick}
              includesAvailabilities={availabilities}
            />
          </HStack>
        </GridItem>
        <GridItem p={2}>
          <TodayCalendarInfo />
        </GridItem>
        <Show breakpoint="(max-width: 968px)">
          <Flex justifyContent={"center"}>
            <CalendarNavigationBtns />
          </Flex>
        </Show>
      </Grid>
    </GridItem>
  );
});
