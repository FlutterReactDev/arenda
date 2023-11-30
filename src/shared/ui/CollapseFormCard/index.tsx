import {
  Box,
  Button,
  Collapse,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FC, PropsWithChildren, ReactNode, memo } from "react";

interface CollapseFormCardProps {
  title: string;
  render: (closeButton: ReactNode) => ReactNode;
}

export const CollapseFormCard: FC<PropsWithChildren<CollapseFormCardProps>> =
  memo((props) => {
    const { title, render } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
      <Box bgColor={"white"} p={4} rounded={"lg"}>
        <HStack mb={2} justifyContent={"space-between"}>
          <Text fontSize={"lg"} fontWeight={"medium"}>
            {title}
          </Text>
          {!isOpen && (
            <Button onClick={onOpen} variant={"outline"}>
              Редактировать
            </Button>
          )}
        </HStack>
        <Collapse in={isOpen} animateOpacity>
          {render(
            <Button variant={"outline"} onClick={onClose}>
              Отмена
            </Button>
          )}
        </Collapse>
      </Box>
    );
  });
