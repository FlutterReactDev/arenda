import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import {
  Avatar,
  Button,
  Divider,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Link } from "react-router-dom";
import { useAuth } from "..";
import { useLogoutMutation } from "../model/api/userApi";

export const UserAccount = () => {
  const { logout } = useAuth();
  const [logoutApi, { isLoading }] = useLogoutMutation();

  const onLogout = async () => {
    await logoutApi().then(() => {
      logout();
    });
  };

  return (
    <Popover trigger="hover" gutter={0} openDelay={0} closeDelay={0}>
      <PopoverTrigger>
        <Button
          as={Link}
          to={RouteName.CABINET}
          variant={"unstyled"}
          h="full"
          position={"relative"}
          role="group"
          display={"inline-flex"}
          alignItems={"center"}
          justifyContent={"center"}
          leftIcon={<Avatar h={8} w={8} src="https://bit.ly/broken-link" />}
          p={2}
        >
          <Stack spacing={1}>
            <Text fontWeight={"medium"} lineHeight={"12px"}>
              DEnchik
            </Text>
            <Text fontSize={"sm"} color={"gray.500"}>
              личный кабинет
            </Text>
          </Stack>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody rounded={"xl"} mt={1} color="white" p={4}>
          <Stack>
            <Button>Редактировать профиль</Button>
            <Button>Изменить пароль</Button>
            <Divider />
            <Button
              _hover={{
                bgColor: "transparent",
              }}
              variant={"outline"}
              onClick={onLogout}
              isLoading={isLoading}
            >
              Выйти из аккаунта
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
