import { Stack } from "@chakra-ui/react";
import { ObjectNavLink } from "./ObjectNavLink";

export const ObjectNavigation = () => {
  return (
    <Stack>
      <ObjectNavLink>1.Основная информация</ObjectNavLink>
      <ObjectNavLink>2.Фотографии</ObjectNavLink>
      <ObjectNavLink>3.Номера</ObjectNavLink>
    </Stack>
  );
};
