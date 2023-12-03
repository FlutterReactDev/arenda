import { Collapse, HStack, Text, useDisclosure } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";
import { FaMinusSquare, FaPlusSquare } from "react-icons/fa";
interface CalendarCollapseGroupProps {
  title: string;
}

export const CalendarCollapseGroup: FC<
  PropsWithChildren<CalendarCollapseGroupProps>
> = (props) => {
  const { children, title } = props;
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: true,
  });
  return (
    <>
      <HStack p={3} w="full" h="50px" bgColor={"blue.50"}>
        <HStack cursor={"pointer"} onClick={onToggle}>
          <Text fontWeight={"medium"}>{title}</Text>
          {isOpen && <FaMinusSquare />}
          {!isOpen && <FaPlusSquare />}
        </HStack>
      </HStack>
      <Collapse in={isOpen}>{children}</Collapse>
    </>
  );
};
