import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Icon,
  IconButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { UserAccount } from "@entites/User/ui/UserAccount";
import { BsPlusLg } from "react-icons/bs";
import { IoMdMenu } from "react-icons/io";
import { Link as RouterLink, useLocation } from "react-router-dom";

export const HeaderMobileNav = () => {
  const { pathname } = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="mobile menu open"
        onClick={onOpen}
        icon={<Icon as={IoMdMenu} />}
      />
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent h={"90dvh"} roundedTop={"2xl"}>
          <DrawerBody>
            <DrawerCloseButton />
            <DrawerHeader>Меню</DrawerHeader>

            <DrawerBody p="0">
              <Stack spacing={4} alignItems={"flex-start"}>
                <UserAccount onLogout={onClose} />
                <Button
                  bg={"white"}
                  color="gray.500"
                  display="inline-flex"
                  alignItems="center"
                  fontSize="lg"
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
                  fontSize="lg"
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
                <Button
                  as={RouterLink}
                  to={RouteName.ADD_OBJECT}
                  rightIcon={<BsPlusLg />}
                  colorScheme="facebook"
                >
                  Сдать объект
                </Button>
              </Stack>
            </DrawerBody>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
