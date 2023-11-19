import { Box, Text } from "@chakra-ui/react";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { FC, forwardRef, memo } from "react";
import { getCommonSettings } from "../model/selectors";

import { SmallAddIcon } from "@chakra-ui/icons";
import { isEqual, isSaturday, isSunday, isToday } from "date-fns";

interface ObjectCellProps {
  inRange: boolean;
  cost: number;
  isPast: boolean;
  isBlocked: boolean;
  isRangeBorderLeft: boolean;
  isRangeBorderRight: boolean;
  onMouseMove: (date: Date) => void;
  onMouseDown: (date: Date) => void;
  onMouseUp: () => void;
  onTouchStart: (date: Date) => void;
  onTouchMove: (pageX: number) => void;
  onTouchEnd: () => void;
  date: Date;
}
export const ObjectCell: FC<ObjectCellProps> = memo(
  forwardRef((props) => {
    const {
      inRange,
      cost,
      isPast,
      isBlocked,
      isRangeBorderLeft,
      isRangeBorderRight,
      date,
      onMouseMove,
      onMouseDown,
      onMouseUp,
    } = props;
    const { currentWidth } = useAppSelector(getCommonSettings);

    const onMove = () => {
      onMouseMove(date);
    };
    const onDown = () => {
      onMouseDown(date);
    };
    const onUp = () => {
      onMouseUp();
    };

    return (
      <Box
        borderRight={"1px solid "}
        borderColor={"#d8d8d8"}
        h="full"
        overflow={"hidden"}
        color={"gray.500"}
        w={`${currentWidth}px`}
        onMouseDown={onDown}
        onMouseMove={onMove}
        onMouseUp={onUp}
        {...(inRange && {
          border: "1px solid ",
          borderColor: "black",
          borderRightColor: "transparent",
        })}
        {...(isPast && {
          bgColor: "blackAlpha.50",
          color: "blackAlpha.500",
          pointerEvents: "none",
        })}
        {...(isBlocked && {
          pointerEvents: "none",
        })}
        userSelect={"none"}
        position={"relative"}
        _hover={{
          bgColor: "#d8d8d8",
        }}
        role="group"
        _after={{
          w: "1px",
          h: "full",
          position: "absolute",
          right: "0",
          top: "0",
          bgColor: "#444",
        }}
        {...(isSaturday(date) &&
          !isPast && {
            bgColor: "red.300",
          })}
        {...(isSunday(date) &&
          !isPast && {
            bgColor: "red.300",
          })}
        {...(isToday(date) && {
          bgColor: "#444",
        })}
      >
        <Text
          fontSize={"small"}
          fontWeight={"medium"}
          pos="absolute"
          right={2}
          bottom={"0"}
          maxW={"55px"}
          whiteSpace={"nowrap"}
          overflow={"hidden"}
          {...(isSaturday(date) &&
            !isPast && {
              color: "white",
            })}
          {...(isSunday(date) &&
            !isPast && {
              color: "white",
            })}
          {...(isToday(date) && {
            color: "white",
          })}
        >
          {cost}$
        </Text>
        <Text
          fontSize={"sm"}
          fontWeight={"medium"}
          pos="absolute"
          top={1}
          left={1}
          maxW={"55px"}
          whiteSpace={"nowrap"}
          overflow={"hidden"}
          {...(isToday(date) && {
            color: "white",
          })}
          {...(isSaturday(date) &&
            !isPast && {
              color: "white",
            })}
          {...(isSunday(date) &&
            !isPast && {
              color: "white",
            })}
        >
          {date.getDate()}
        </Text>
        {isBlocked && (
          <Box
            w={"110px"}
            pos={"absolute"}
            borderBottom={"1px solid "}
            borderColor={"#d8d8d8"}
            transform={"rotate(-48deg)"}
            transformOrigin={"right"}
            right={0}
            top={0}
          />
        )}
        <Box
          position={"absolute"}
          left={"50%"}
          top={"50%"}
          transform={"translate(-50%,-50%)"}
          opacity={0}
          _groupHover={{
            opacity: 1,
          }}
          {...(isPast && {
            bgColor: "blackAlpha.50",
            color: "blackAlpha.500",
          })}
        >
          <SmallAddIcon w={7} h={7} />
        </Box>
        {isRangeBorderRight && (
          <Box
            pos={"absolute"}
            right={0}
            top={0}
            h="full"
            w="1px"
            bgColor={"black"}
          />
        )}

        {isRangeBorderLeft && (
          <Box
            pos={"absolute"}
            right={0}
            top={0}
            h="full"
            w="1px"
            bgColor={"black"}
          />
        )}
      </Box>
    );
  }),
  (oldProps, newProps) =>
    oldProps.cost === newProps.cost &&
    oldProps.inRange === newProps.inRange &&
    oldProps.isBlocked === newProps.isBlocked &&
    oldProps.isPast === newProps.isPast &&
    oldProps.isRangeBorderLeft === newProps.isRangeBorderLeft &&
    oldProps.isRangeBorderRight === newProps.isRangeBorderRight &&
    isEqual(oldProps.date, newProps.date) &&
    oldProps.onMouseDown == newProps.onMouseDown &&
    oldProps.onMouseMove == newProps.onMouseMove &&
    oldProps.onMouseUp == newProps.onMouseUp &&
    oldProps.onTouchStart == newProps.onTouchStart &&
    oldProps.onTouchMove == newProps.onTouchMove &&
    oldProps.onTouchEnd == newProps.onTouchEnd
);
