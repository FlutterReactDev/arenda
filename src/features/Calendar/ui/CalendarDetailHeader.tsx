import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useMediaQuery,
} from "@chakra-ui/react";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { addMonths, eachMonthOfInterval, format, subMonths } from "date-fns";
import { ru } from "date-fns/locale";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import ScrollTo from "react-scroll-into-view";
import { calendarActions } from "..";
import { getObject } from "../model/selectors";
import { toDay } from "../utils/toDay";
import { ObjectInfo } from "./ObjectInfo";

export interface CalendarDetailHeaderProps {
  objectId: number;
}
export const CalendarDetailHeader: FC<CalendarDetailHeaderProps> = (props) => {
  const { objectId } = props;
  const dispatch = useAppDispatch();
  const visibleId = useAppSelector((state) => state.calendar.currentVisbleId);

  const object = useAppSelector(getObject(objectId));
  const [isLessThan968] = useMediaQuery("(max-width: 968px)");

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio == 1) {
            dispatch(
              calendarActions.setCurrentVisbleId(
                Number(entry.target.id.replace("calendar", ""))
              )
            );
          }
        });
      },

      options
    );

    for (let i = 0; i < 19; i++) {
      const target = document.querySelector(`#calendar${i}`);
      observer.observe(target as Element);
    }
  }, []);

  return (
    <Box
      as="header"
      left={0}
      right={0}
      pos={"sticky"}
      top={0}
      bgColor={"#ededed"}
      zIndex={"banner"}
      py={1}
    >
      <HStack alignItems={"center"} px={6} h="full" flexWrap={"wrap"}>
        <Button
          bgColor={"white"}
          rounded={"full"}
          w="4"
          as={Link}
          to={RouteName.CALENDAR_PAGE}
        >
          <ChevronLeftIcon />
        </Button>
        <ObjectInfo
          address={object.address}
          name={object.name}
          objectId={objectId}
        />
        <Menu isLazy>
          <MenuButton
            as={Button}
            textTransform={"capitalize"}
            rounded={"md"}
            bgColor={"white"}
            {...(!isLessThan968 && {
              h: "full",
            })}
            _hover={{
              bgColor: "white",
            }}
            _active={{
              bgColor: "white",
            }}
            rightIcon={<ChevronDownIcon />}
            size={["sm", "md", "lg"]}
            maxW={["130px", "max-content", "max-content"]}
          >
            {format(
              eachMonthOfInterval({
                start: subMonths(toDay(new Date()), 6),
                end: addMonths(toDay(new Date()), 12),
              }).filter((_, idx) => idx == visibleId)[0],
              isLessThan968 ? "MMM yyyy" : "MMMM yyyy",
              { locale: ru }
            )}
          </MenuButton>
          <MenuList>
            {eachMonthOfInterval({
              start: subMonths(toDay(new Date()), 6),
              end: addMonths(toDay(new Date()), 12),
            }).map((date, id) => {
              return (
                <ScrollTo
                  key={id}
                  selector={`#calendar${id}`}
                  scrollOptions={{
                    block: "center",
                    inline: "center",
                  }}
                  onClick={() =>
                    dispatch(calendarActions.setCurrentVisbleId(id))
                  }
                >
                  <MenuItem
                    textTransform={"capitalize"}
                    key={date.getMilliseconds()}
                    {...(id == visibleId && {
                      bgColor: "gray.100",
                    })}
                  >
                    {format(date, "MMMM yyyy ", { locale: ru })}
                  </MenuItem>
                </ScrollTo>
              );
            })}
          </MenuList>
        </Menu>
        <HStack h="full" alignItems={"center"}>
          <ScrollTo
            selector={`#calendar${visibleId - 1}`}
            onClick={() =>
              visibleId > 0 &&
              dispatch(calendarActions.setCurrentVisbleId(visibleId - 1))
            }
            scrollOptions={{
              block: "center",
              inline: "center",
            }}
          >
            <IconButton
              aria-label="prev month"
              rounded={"md"}
              w={"60px"}
              bgColor={"white"}
              _hover={{
                bgColor: "white",
              }}
              _active={{
                bgColor: "white",
              }}
              {...(!isLessThan968 && {
                h: "full",
              })}
              size={["sm", "md", "lg"]}
            >
              <ChevronLeftIcon />
            </IconButton>
          </ScrollTo>
          <ScrollTo
            selector={`#calendar${visibleId + 1}`}
            onClick={() =>
              visibleId < 18 &&
              dispatch(calendarActions.setCurrentVisbleId(visibleId + 1))
            }
            scrollOptions={{
              block: "center",
              inline: "center",
            }}
          >
            <IconButton
              aria-label="next month"
              size={["sm", "md", "lg"]}
              rounded={"md"}
              bgColor={"white"}
              w={"60px"}
              _hover={{
                bgColor: "white",
              }}
              _active={{
                bgColor: "white",
              }}
              {...(!isLessThan968 && {
                h: "full",
              })}
            >
              <ChevronRightIcon />
            </IconButton>
          </ScrollTo>
        </HStack>
      </HStack>
    </Box>
  );
};
