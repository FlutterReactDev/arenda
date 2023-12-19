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
  render: (closeButton: ReactNode, closeFn: () => void) => ReactNode;
  defaultIsOpen?: boolean;
  onCloseClick?: () => void;
}

export const CollapseFormCard: FC<PropsWithChildren<CollapseFormCardProps>> =
  memo((props) => {
    const { title, render, defaultIsOpen = false, onCloseClick } = props;
    const { isOpen, onOpen, onClose } = useDisclosure({
      defaultIsOpen,
    });

    const onHide = () => {
      onClose();
      onCloseClick && onCloseClick();
    };
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
        <Collapse
          in={isOpen}
          animateOpacity
          style={{
            overflow: "visible",
          }}
        >
          {render(
            <Button variant={"outline"} w="full" onClick={onHide}>
              Отмена
            </Button>,
            () => {
              onClose();
            }
          )}
        </Collapse>
      </Box>
    );
  });
