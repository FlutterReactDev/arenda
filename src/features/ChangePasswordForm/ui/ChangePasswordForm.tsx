import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import {
  ChangePasswordSchema,
  ChangePasswordType,
} from "@entites/User/model/schemas/ChangePasswordSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

export const ChangePasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<ChangePasswordType>({
    resolver: yupResolver(ChangePasswordSchema),
  });

  const onSubmit = () => {};

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <FormControl>
          <FormLabel>Старый пароль</FormLabel>
          <Input type="password" {...register("oldPassword")} />
        </FormControl>
        <FormControl>
          <FormLabel>Новый пароль</FormLabel>
          <Input type="password" {...register("newPassword")} />
        </FormControl>
        <FormControl>
          <FormLabel>Подтвердите новый пароль</FormLabel>
          <Input type="password" {...register("confirmNewPassword")} />
        </FormControl>
      </Stack>

      <Button mt={2} colorScheme="red" type="submit" isDisabled={!isValid}>
        Сменить пароль
      </Button>
      <Box p="4">
        <Button
          variant={"link"}
          colorScheme="red"
          as={Link}
          to={RouteName.RESET_PAGE}
        >
          Забыли пароль?
        </Button>
      </Box>
    </Box>
  );
};
