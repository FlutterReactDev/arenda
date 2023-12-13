import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { LoginSchema, useAuth, useAuthModal } from "@entites/User";
import { useLoginMutation } from "@entites/User/model/api/userApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { PhoneInput } from "@shared/ui/PhoneInput";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
const LoginForm = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    control,
  } = useForm<Yup.InferType<typeof LoginSchema>>({
    resolver: yupResolver(LoginSchema),
  });
  const userAuth = useAuth();
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);

  const { onClose } = useAuthModal();

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (data: Yup.InferType<typeof LoginSchema>) => {
    await login({ ...data, phoneNumber: data.phoneNumber.replace(/ /g, "") })
      .unwrap()
      .then((data) => {
        userAuth.login(data);
        onClose();
        if (location.state?.from) {
          return navigate(location.state?.from, {
            replace: true,
          });
        }

        navigate(RouteName.MAIN_PAGE);
      });
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <FormControl isInvalid={!!errors?.phoneNumber?.message}>
          <FormLabel>Номер телефона</FormLabel>
          <Controller
            name="phoneNumber"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => {
              return (
                <PhoneInput onBlur={onBlur} onChange={onChange} value={value} />
              );
            }}
          />

          <FormErrorMessage>{errors.phoneNumber?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password?.message}>
          <FormLabel>Пароль</FormLabel>
          <InputGroup>
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
            />
            <InputRightElement h={"full"}>
              <Button
                variant={"ghost"}
                onClick={() => setShowPassword((showPassword) => !showPassword)}
              >
                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
              </Button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button
          w="full"
          mt={2}
          type="submit"
          colorScheme="red"
          isLoading={isLoading}
        >
          Войти
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
