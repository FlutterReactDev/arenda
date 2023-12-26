import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  chakra,
} from "@chakra-ui/react";
import { LoginForm } from "@features/LoginForm";
import { RegisterForm } from "@features/RegisterForm";
import { Suspense, memo, useEffect, useState } from "react";
import { ModalType } from "../model/types/HeaderTypes";

import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { useAuth, useAuthModal } from "@entites/User";
import { UserAccount } from "@entites/User/ui/UserAccount";
import { CurrencySwitcher } from "@features/CurrencySwitcher";
import { useInView } from "react-intersection-observer";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useHeader } from "../model/useHeader";
import { HeaderMobileNav } from "./HeaderMobileNav";

export const Header = memo(() => {
  const { setHeaderHeight } = useHeader();
  const { pathname } = useLocation();
  const { ref } = useInView({
    threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    onChange(_, entry) {
      setHeaderHeight(entry.intersectionRatio * 72);
    },
  });

  const { isLoggin } = useAuth();
  const { isOpen, onClose, onOpen } = useAuthModal();
  const [modalType, setModalType] = useState<ModalType>(ModalType.LOGIN);

  const changeLoginModalType = () => {
    setModalType(ModalType.LOGIN);
  };

  const changeRegisterModalType = () => {
    setModalType(ModalType.REGISTER);
  };

  useEffect(() => {
    if (!isOpen) {
      changeLoginModalType();
    }
  }, [isOpen]);

  return (
    <>
      <chakra.header
        ref={ref}
        bg={"white"}
        w="full"
        overflowY="hidden"
        color="gray.800"
        h="4.5rem"
        overflow={"hidden"}
      >
        <chakra.div h="full" mx="auto" maxW="1400px">
          <Flex
            w="full"
            h="full"
            px="6"
            alignItems="center"
            justifyContent={"space-between"}
          >
            <Flex align="flex-start" as={RouterLink} to={RouteName.MAIN_PAGE}>
              <HStack>
                <Text fontWeight={"bold"} fontSize={"2xl"} color={"red.600"}>
                  Turak.KG
                </Text>
              </HStack>
            </Flex>
            <HStack spacing={4}>
              {isLoggin && (
                <HStack
                  spacing="2"
                  display={{
                    base: "none",
                    md: "flex",
                  }}
                >
                  <Button
                    bg={"white"}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _hover={{
                      color: "gray.800",
                    }}
                    _focus={{
                      boxShadow: "none",
                    }}
                    as={RouterLink}
                    to={RouteName.MY_OBJECTS}
                    {...(pathname == RouteName.MY_OBJECTS && {
                      bgColor: "gray.100",
                      color: "gray.800",
                    })}
                  >
                    Мои объекты
                  </Button>
                  <Button
                    as={RouterLink}
                    to={RouteName.CALENDAR_PAGE}
                    bg={"white"}
                    color="gray.500"
                    display="inline-flex"
                    alignItems="center"
                    fontSize="md"
                    _hover={{
                      color: "gray.800",
                    }}
                    _focus={{
                      boxShadow: "none",
                    }}
                    {...(pathname.includes(RouteName.CALENDAR_PAGE) && {
                      bgColor: "gray.100",
                      color: "gray.800",
                    })}
                  >
                    Календарь
                  </Button>
                </HStack>
              )}

              {!isLoggin && (
                <Button colorScheme="red" onClick={onOpen}>
                  Войти
                </Button>
              )}
              {isLoggin && (
                <Box
                  display={{
                    base: "none",
                    md: "block",
                  }}
                >
                  <UserAccount />
                </Box>
              )}
              <CurrencySwitcher />
              {isLoggin && (
                <Box
                  display={{
                    base: "block",
                    md: "none",
                  }}
                >
                  <HeaderMobileNav />
                </Box>
              )}
            </HStack>
          </Flex>
        </chakra.div>
      </chakra.header>

      <Modal isOpen={isOpen} onClose={onClose} size={["full", "xl", "2xl"]}>
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
    </>
  );
});
