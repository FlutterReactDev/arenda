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
  Icon,
  ModalFooter,
} from "@chakra-ui/react";
import { Suspense, useState } from "react";
import { ModalType } from "../model/types/HeaderTypes";
import { LoginForm } from "@features/LoginForm";
import { BiUserCircle } from "react-icons/bi";
import { RegisterForm } from "@features/RegisterForm";
export const Header = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [modalType, setModalType] = useState<ModalType>(ModalType.LOGIN);

  const changeLoginModalType = () => {
    setModalType(ModalType.LOGIN);
  };

  const changeRegisterModalType = () => {
    setModalType(ModalType.REGISTER);
  };
  return (
    <Box bgColor="blackAlpha.900" h={"12"} px={2}>
      <Flex h="full" justifyContent={"space-between"} alignContent={"center"}>
        <Box>Logo</Box>
        <Flex alignItems={"center"} h="full">
          <Popover trigger="hover" openDelay={0}>
            <PopoverTrigger>
              <Button
                leftIcon={<Icon as={BiUserCircle} boxSize={6} />}
                colorScheme="red"
              >
                Войти
              </Button>
            </PopoverTrigger>
            <PopoverContent bgColor="blackAlpha.900" border="0">
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

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={["full", "lg", "lg", "2xl"]}
      >
        <ModalOverlay backdropFilter="blur(10px)" />
        <ModalContent transition={"0.3s max-width"}>
          <ModalHeader>
            {modalType == ModalType.LOGIN && "Вход"}
            {modalType == ModalType.REGISTER && "Регистрация"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Suspense
              fallback={
                <Center p={6}>
                  <Spinner size={"xl"} />
                </Center>
              }
            >
              {modalType == ModalType.LOGIN && <LoginForm />}
              {modalType == ModalType.REGISTER && <RegisterForm />}
            </Suspense>
          </ModalBody>
          <ModalFooter>
            {modalType == ModalType.LOGIN && (
              <Text
                _hover={{
                  color: "red.600",
                }}
                cursor={"pointer"}
                fontWeight={"semibold"}
                color="red.500"
                onClick={changeRegisterModalType}
              >
                Нет аккаунта?
              </Text>
            )}
            {modalType == ModalType.REGISTER && (
              <Text
                _hover={{
                  color: "red.600",
                }}
                cursor={"pointer"}
                fontWeight={"semibold"}
                color="red.500"
                onClick={changeLoginModalType}
              >
                Есть аккаунт?
              </Text>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};
