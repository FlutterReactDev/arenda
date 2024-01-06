import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { EditIcon } from "@chakra-ui/icons";
import { Button, Stack } from "@chakra-ui/react";
import { useAuth } from "@entites/User";
import { MdPassword } from "react-icons/md";
import { Link } from "react-router-dom";
import { NavItem } from "./NavItem";

export const ProfileSidebar = () => {
  const { logout } = useAuth();

  return (
    <Stack>
      <NavItem
        icon={EditIcon}
        to={RouteName.PROFILE_EDIT_PAGE.replace("/", "")}
      >
        Изменить профиль
      </NavItem>
      <NavItem
        icon={MdPassword}
        to={RouteName.PROFILE_PASSWORD_PAGE.replace("/", "")}
      >
        Пароль
      </NavItem>

      <Button as={Link} colorScheme="red" variant={"outline"} onClick={logout}>
        Выход
      </Button>
    </Stack>
  );
};
