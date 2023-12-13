import {
  Box,
  Button,
  Center,
  Divider,
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
  Stack,
  Text,
} from "@chakra-ui/react";
import { LoginForm } from "@features/LoginForm";
import { RegisterForm } from "@features/RegisterForm";
import { Suspense, memo, useEffect, useState } from "react";
import { BiUserCircle } from "react-icons/bi";
import { MdFavoriteBorder } from "react-icons/md";
import { ModalType } from "../model/types/HeaderTypes";

import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { AuthButton, useAuth, useAuthModal } from "@entites/User";
import { LoginButton } from "@features/LoginButton";
import { Link } from "react-router-dom";
import { HeaderLinkItem } from "./HeaderLinkItem";
import { UserAccount } from "@entites/User/ui/UserAccount";

export const Header = memo(() => {
  const { isLoggin } = useAuth();
  console.log(isLoggin);

  const { isOpen, onClose } = useAuthModal();
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
    <Box bgColor="blackAlpha.900" h={"12"} px={2} overflow={"hidden"}>
      <Flex h="full" justifyContent={"space-between"} alignContent={"center"}>
        <Box color="white">logo</Box>
        <HStack spacing={6} alignItems={"center"} h="full">
          {!isLoggin && (
            <HeaderLinkItem
              dropdownContent={
                <>
                  <Stack>
                    <Text fontWeight={"medium"}>
                      Зарабатывайте на сдаче жилья
                    </Text>
                    <Text fontSize={"sm"} color={"gray.500"}>
                      Сдавайте квартиру, дом, номера в гостинице и другие
                      объекты.
                    </Text>
                    <Button w="full" colorScheme="red">
                      Подробнее
                    </Button>
                    <AuthButton
                      w="full"
                      colorScheme="gray"
                      to={RouteName.ADD_OBJECT}
                      isAuth={true}
                    >
                      Создать объявление
                    </AuthButton>
                  </Stack>
                </>
              }
              icon={MdFavoriteBorder}
              title="Сдать жильё"
              to="/"
            />
            // {isLoggin && (

            // )}
          )}
          {isLoggin && (
            <HeaderLinkItem
              dropdownContent={
                <>
                  <Stack>
                    <Button
                      as={Link}
                      to={RouteName.MY_OBJECTS}
                      textAlign={"left"}
                    >
                      Мои объекты
                    </Button>
                    <Button as={Link} to={RouteName.MY_OBJECTS}>
                      Календарь
                    </Button>
                    <Button as={Link} to={RouteName.MY_OBJECTS}>
                      Брони
                    </Button>

                    <Divider />
                    <Box p={2}>
                      <Button colorScheme="red" w="full">
                        Добавить объект
                      </Button>
                    </Box>
                  </Stack>
                </>
              }
              icon={MdFavoriteBorder}
              title="Сдавайся"
              to="/"
            />
          )}
          <HeaderLinkItem
            dropdownContent={
              <>
                {!isLoggin && (
                  <Stack>
                    <Text>Войдите, чтобы управлять своими бронированиями.</Text>

                    <LoginButton w="full" colorScheme="red">
                      Войти
                    </LoginButton>
                  </Stack>
                )}
                {isLoggin && (
                  <Stack>
                    <Button>Текущие бронирования</Button>
                    <Button>Прошедшие бронирования</Button>
                    <Button>Мои отзывы</Button>
                  </Stack>
                )}
              </>
            }
            icon={MdFavoriteBorder}
            title="Бронирования"
            to="/"
          />
          {isLoggin && (
            <HeaderLinkItem
              dropdownContent={
                <>
                  <Stack>
                    <Button>Все сообщения</Button>
                    <Button>Архив</Button>
                  </Stack>
                </>
              }
              icon={MdFavoriteBorder}
              title="Сообщения"
              to="/"
            />
          )}
          <HeaderLinkItem
            dropdownContent={
              <>
                {!isLoggin && (
                  <Stack>
                    <Text>
                      Войдите, чтобы посмотреть избранные объекты на любом
                      устройстве.
                    </Text>

                    <LoginButton w="full" colorScheme="red">
                      Войти
                    </LoginButton>
                  </Stack>
                )}
              </>
            }
            icon={MdFavoriteBorder}
            title="Избранное"
            to="/"
          />
          {isLoggin && (
            <HeaderLinkItem
              dropdownContent={
                <>
                  <Stack>
                    <Button>Мои деньги</Button>
                    <Button>Мои бонусы</Button>
                  </Stack>
                </>
              }
              icon={MdFavoriteBorder}
              title="Баланс"
              to="/"
            />
          )}

          {!isLoggin && (
            <HeaderLinkItem
              dropdownContent={
                <Stack>
                  <Text>
                    Войдите или создайте аккаунт, чтобы использовать все
                    возможности сервиса
                  </Text>
                  <LoginButton w="full" colorScheme="red">
                    Войти
                  </LoginButton>
                </Stack>
              }
              icon={BiUserCircle}
              title="Войти"
              to="/"
            />
          )}
          {isLoggin && <UserAccount />}
        </HStack>
      </Flex>

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
    </Box>
  );
});
