import {
  Box,
  Collapse,
  HStack,
  Text,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
interface CalendarCollapseGroupProps {
  title: string;
}

export const CalendarCollapseGroup: FC<
  PropsWithChildren<CalendarCollapseGroupProps>
> = (props) => {
  const { children, title } = props;
  const [isLessThan968] = useMediaQuery("(max-width: 968px)");
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });
  return (
    <Box>
      <HStack
        p={3}
        w="full"
        minH="50px"
        bgColor={"blue.50"}
        pos={"sticky"}
        {...(!isLessThan968 && {
          top: "204px",
          zIndex: "8",
        })}
      >
        <HStack cursor={"pointer"} onClick={onToggle}>
          <Text fontWeight={"medium"}>{title}</Text>
          {isOpen && <FaMinusSquare />}
          {!isOpen && <FaPlusSquare />}
        </HStack>
      </HStack>

      <Collapse in={isOpen}>{isOpen && <>{children}</>}</Collapse>
    </Box>
  );
};
