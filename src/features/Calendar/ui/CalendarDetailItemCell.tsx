import { SmallAddIcon } from "@chakra-ui/icons";
import { Box, Text, useMediaQuery } from "@chakra-ui/react";
import { isEqual } from "date-fns";
import { FC, memo } from "react";

interface CalendarDetailItemCell {
  inRange: boolean;
  cost: number;
  isPast: boolean;
  isBlocked: boolean;

  onMouseMove: (date: Date) => void;
  onMouseDown: (date: Date) => void;
  onMouseUp: (date: Date) => void;
  date: Date;
}

export const CalendarDetailItemCell: FC<CalendarDetailItemCell> = memo(
  (props) => {
    const {
      cost,
      date,
      inRange,
      isBlocked,
      isPast,
      onMouseMove,
      onMouseDown,
      onMouseUp,
    } = props;
    const [isSm] = useMediaQuery("(max-width: 600px)");
    const onMove = () => {
      onMouseMove(date);
    };
    const onDown = () => {
      onMouseDown(date);
    };
    const onUp = () => {
      onMouseUp(date);
    };
    return (
      <Box
        h="full"
        overflow={"hidden"}
        color={"gray.500"}
        boxShadow={"0 0 0 1px #d8d8d8"}
        w={"full"}
        onMouseMove={onMove}
        onMouseDown={onDown}
        onMouseUp={onUp}
        {...(isPast && {
          bgColor: "blackAlpha.50",
          color: "blackAlpha.500",
          pointerEvents: "none",
        })}
        {...(isBlocked && {
          pointerEvents: "none",
        })}
        {...(inRange && {
          border: "1px solid ",
          borderColor: "#444",
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
      >
        <Text
          fontSize={["sm", "md", "md"]}
          fontWeight={"medium"}
          pos="absolute"
          right={2}
          {...(isSm && {
            right: "50%",
            transform: "translateX(50%)",
          })}
          bottom={"0"}
          maxW={"55px"}
          whiteSpace={"nowrap"}
          overflow={"hidden"}
          zIndex={10}
        >
          {cost}$
        </Text>
        <Text
          fontSize={["sm", "md", "md"]}
          fontWeight={"medium"}
          pos="absolute"
          top={2}
          left={2}
          maxW={"55px"}
          whiteSpace={"nowrap"}
          overflow={"hidden"}
          zIndex={10}
          {...(isSm && {
            left: "50%",
            top: 1,
            transform: "translateX(-50%)",
          })}
        >
          {date.getDate()}
        </Text>
        {isBlocked && (
          <Box
            w={"135px"}
            pos={"absolute"}
            borderBottom={"1px solid "}
            borderColor={"#d8d8d8"}
            transform={"rotate(-45deg)"}
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
      </Box>
    );
  },
  (oldProps, newProps) => {
    return (
      oldProps.cost == newProps.cost &&
      oldProps.inRange == newProps.inRange &&
      oldProps.isPast == newProps.isPast &&
      oldProps.isBlocked == newProps.isBlocked &&
      isEqual(oldProps.date, newProps.date) &&
      oldProps.onMouseDown == newProps.onMouseDown &&
      oldProps.onMouseMove == newProps.onMouseMove &&
      oldProps.onMouseUp == newProps.onMouseUp
    );
  }
);
