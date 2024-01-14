import { Text, Grid, GridItem, useMediaQuery } from "@chakra-ui/react";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { format, isEqual } from "date-fns";
import { FC, memo } from "react";
import { getCommonSettings } from "../model/selectors";
import { ru } from "date-fns/locale";

interface DayProps {
  date: Date;
  isMonth: boolean;
  isToday: boolean;
  isPastDay: boolean;
  isWeekday: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export const Day: FC<DayProps> = memo(
  (props) => {
    const { date, isMonth, isPastDay, isToday, isWeekday, isFirst, isLast } =
      props;
    const { currentWidth } = useAppSelector(getCommonSettings);
    const [isLessThan968] = useMediaQuery("(max-width: 968px)");
    return (
      <Grid
        gridTemplateColumns={`${currentWidth}px`}
        gridTemplateRows={"32px 47px"}
        gridTemplateAreas={`"month" "day"`}
        justifyContent={"space-around"}
        alignItems={"center"}
      >
        {!isLessThan968 && !isFirst && !isLast && (
          <>
            <GridItem
              w="130px"
              area={"month"}
              fontWeight={"medium"}
              textTransform={"capitalize"}
              ml="26px"
            >
              <Text>
                {isMonth && format(date, "MMMM yyyy", { locale: ru })}
              </Text>
            </GridItem>
            <GridItem
              w={"37px"}
              h={"35px"}
              rounded={"md"}
              textAlign={"center"}
              pos={"relative"}
              left={"50%"}
              transform={"translateX(-50%)"}
              bgColor={"white"}
              {...(isPastDay && {
                color: "blackAlpha.500",
              })}
              {...(isWeekday &&
                !isPastDay && {
                  color: "white",
                  bgColor: "blue.400",
                })}
              {...(isToday && {
                color: "#fff",
                backgroundColor: "#444",
              })}
              fontWeight={"medium"}
              area={"day"}
            >
              <Text lineHeight={"17px"}>
                {format(date, "EEEEEE", { locale: ru })}
              </Text>
              <Text lineHeight={"12px"}>{date.getDate()}</Text>
            </GridItem>
          </>
        )}
        {isLessThan968 && (
          <>
            <GridItem
              w="130px"
              area={"month"}
              fontWeight={"medium"}
              textTransform={"capitalize"}
              ml="18px"
            >
              <Text>
                {isMonth && format(date, "MMMM yyyy", { locale: ru })}
              </Text>
            </GridItem>
            <GridItem
              w={"37px"}
              h={"35px"}
              rounded={"md"}
              textAlign={"center"}
              pos={"relative"}
              left={"50%"}
              transform={"translateX(-50%)"}
              bgColor={"white"}
              {...(isPastDay && {
                color: "blackAlpha.500",
              })}
              {...(isWeekday &&
                !isPastDay && {
                  color: "white",
                  bgColor: "red.500",
                })}
              {...(isToday && {
                color: "#fff",
                backgroundColor: "#444",
              })}
              fontWeight={"medium"}
              area={"day"}
            >
              <Text lineHeight={"17px"}>
                {format(date, "EEEEEE", { locale: ru })}
              </Text>
              <Text lineHeight={"18px"}>{date.getDate()}</Text>
            </GridItem>
          </>
        )}
      </Grid>
    );
  },
  (oldProps, newProps) => {
    return (
      isEqual(oldProps.date, newProps.date) &&
      oldProps.isFirst === newProps.isFirst &&
      oldProps.isLast === newProps.isLast &&
      oldProps.isMonth === newProps.isMonth &&
      oldProps.isPastDay === newProps.isPastDay &&
      oldProps.isToday === newProps.isToday &&
      oldProps.isWeekday === newProps.isWeekday
    );
  }
);
