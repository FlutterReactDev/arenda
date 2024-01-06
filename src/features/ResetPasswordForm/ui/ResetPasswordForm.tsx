import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useResetPasswordMutation } from "@entites/User/model/api/userApi";
import {
  ResetPasswordSchema,
  ResetPasswordType,
} from "@entites/User/model/schemas/ResetPasswordSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { BaseResponse } from "@shared/type";
import { ErrorAlert } from "@shared/ui/Alerts/ErrorAlert";
import { SucessAlert } from "@shared/ui/Alerts/SucessAlert";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

export const ResetPasswordForm = () => {
  const toast = useToast();
  const { token } = useParams();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<ResetPasswordType>({
    resolver: yupResolver(ResetPasswordSchema),
  });

  const onSubmit = (data: ResetPasswordType) => {
    resetPassword({
      ...data,
      token: token || "",
    })
      .unwrap()
      .then((data) => {
        toast({
          isClosable: true,
          duration: 3000,
          position: "top-right",
          render({ onClose }) {
            return (
              <SucessAlert
                title={"Сброс пароля"}
                description={data.result}
                onClose={onClose}
              />
            );
          },
        });
      })
      .catch((error: FetchBaseQueryError) => {
        const { message, result } = error.data as BaseResponse<string>;

        toast({
          isClosable: true,
          duration: 3000,
          position: "top-right",
          render({ onClose }) {
            return (
              <ErrorAlert
                title={message}
                description={result}
                onClose={onClose}
              />
            );
          },
        });
      });
  };
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack>
        <FormControl>
          <FormLabel>Новый пароль</FormLabel>
          <Input
            placeholder="Новый пароль"
            type="password"
            {...register("newPassword")}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Подтвердите новый пароль</FormLabel>
          <Input
            placeholder="Подтвердите новый пароль"
            type="password"
            {...register("confirmNewPassword")}
          />
        </FormControl>
      </Stack>
      <Button
        mt={4}
        colorScheme="red"
        type={"submit"}
        isDisabled={!isValid}
        isLoading={isLoading}
      >
        Изменить
      </Button>
    </Box>
  );
};
