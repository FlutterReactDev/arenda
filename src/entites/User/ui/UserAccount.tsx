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

import { useAuth } from "..";
import { useLogoutMutation } from "../model/api/userApi";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { FC } from "react";
import { Link } from "react-router-dom";
import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
interface UserAccountProps {
  onLogout?: () => void;
}
export const UserAccount: FC<UserAccountProps> = (props) => {
  const { onLogout } = props;
  const { logout } = useAuth();
  const [logoutApi, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    await logoutApi().then(() => {
      logout();
      onLogout && onLogout();
    });
  };

  return (
    <Popover gutter={0} openDelay={0} closeDelay={0}>
      <PopoverTrigger>
        <Button
          variant={"unstyled"}
          h="full"
          position={"relative"}
          role="group"
          display={"inline-flex"}
          alignItems={"center"}
          justifyContent={"center"}
          leftIcon={<Avatar h={8} w={8} src="https://bit.ly/broken-link" />}
          p={2}
          rightIcon={<ChevronDownIcon boxSize={"6"} />}
        >
          <Stack alignItems={"flex-start"} spacing={1}>
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
            <Button>Профиль</Button>
            <Button>Редактировать профиль</Button>
            <Button as={Link} to={RouteName.RESET_PAGE}>
              Изменить пароль
            </Button>
            <Divider />
            <Button
              _hover={{
                bgColor: "transparent",
              }}
              variant={"outline"}
              onClick={handleLogout}
              isLoading={isLoading}
              colorScheme="red"
            >
              Выйти из аккаунта
            </Button>
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
