import { HStack, Text, useMediaQuery } from "@chakra-ui/react";
import { FC, memo } from "react";
import { CalendarAvailability } from "../model/types";
import { EventPopover } from "./EventPopover";
export interface CalendarDetailAvailability extends CalendarAvailability {
  left: number;
  top: number;
  width: number;
  isRightRounded: boolean;
  isLeftRounded: boolean;
}

export const CalendarDetailAvailability: FC<CalendarDetailAvailability> = memo(
  (props) => {
    const {
      left,
      top,
      width,
      comment,
      isRightRounded,
      isLeftRounded,
      color,
      id,
      objectId,
    } = props;
    const [isLessThan968] = useMediaQuery("(max-width: 968px)");
    const cell = !isLessThan968 ? 97 : 6;

    const topValue = `calc((${cell}px * ${top}) + 30px + ${cell / 2 - 10}px )`;
    const wValue = `calc(${cell}px * ${width})`;
    const leftValue = `calc(${cell}px * ${left})`;
    return (
      <EventPopover id={id} objectId={objectId}>
        <HStack
          pos={"absolute"}
          h={"20px"}
          left={leftValue}
          w={wValue}
          bgColor={color}
          alignItems={"center"}
          p={2}
          overflow={"hidden"}
          top={topValue}
          {...(isRightRounded && {
            roundedRight: "full",
          })}
          {...(isLeftRounded && {
            roundedLeft: "full",
          })}
          cursor={"pointer"}
        >
          <Text
            fontSize={"sm"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
            whiteSpace={"nowrap"}
            fontWeight={"medium"}
            color={"white"}
          >
            {comment}
          </Text>
        </HStack>
      </EventPopover>
    );
  }
);
