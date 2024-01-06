import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  EmailResetPasswordSchema,
  EmailResetPasswordType,
} from "../model/schema";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { useGetResetPasswordMutation } from "@entites/User/model/api/userApi";
import { SucessAlert } from "@shared/ui/Alerts/SucessAlert";

export const EmailResetPasswordForm = () => {
  const toast = useToast();
  const [sendResetCode, { isLoading }] = useGetResetPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<EmailResetPasswordType>({
    resolver: yupResolver(EmailResetPasswordSchema),
  });

  const onSubmit = (data: EmailResetPasswordType) => {
    sendResetCode(data.email)
      .unwrap()
      .then((data) => {
        toast({
          isClosable: true,
          duration: 3000,
          position: "top-right",
          render({ onClose }) {
            return (
              <SucessAlert
                title={data.message}
                description={data.result}
                onClose={onClose}
              />
            );
          },
        });
      });
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl>
        <FormLabel>Почта</FormLabel>
        <Input
          placeholder="Укажите почту"
          type="email"
          {...register("email")}
        />
      </FormControl>
      <Button
        colorScheme="red"
        type="submit"
        isLoading={isLoading}
        isDisabled={!isValid}
        mt={4}
      >
        Отправить код сброса
      </Button>
    </Box>
  );
};
