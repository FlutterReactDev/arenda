import {
  Box,
  Flex,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  PopoverBody,
  PopoverFooter,
  Text,
  useDisclosure,
  Modal,
  Center,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
} from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { ModalType } from "../model/types/HeaderTypes";
import { LoginForm } from "@features/LoginForm";

export const Header = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [modalType, setModalType] = useState<ModalType>(ModalType.LOGIN);
  return (
    <Box bgColor="blackAlpha.900" h={"12"} px={2}>
      <Flex h="full" justifyContent={"space-between"} alignContent={"center"}>
        <Box>Logo</Box>
        <Flex alignItems={"center"} h="full">
          <Popover trigger="hover" openDelay={0}>
            <PopoverTrigger>
              <Button>Trigger</Button>
            </PopoverTrigger>
            <PopoverContent bgColor="blackAlpha.900">
              <PopoverBody>
                <Text color="white">
                  Войдите или создайте аккаунт, чтобы использовать все
                  возможности сервиса
                </Text>
              </PopoverBody>
              <PopoverFooter border="0">
                <Button w="full" colorScheme="red" onClick={onOpen}>
                  Войти
                </Button>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
        </Flex>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent>
          <ModalHeader>Вход</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Suspense
              fallback={
                <Center p={6}>
                  <Spinner size={"xl"} />
                </Center>
              }
            >
              <LoginForm />
            </Suspense>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};
