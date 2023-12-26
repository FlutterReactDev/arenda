import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";

import { AddPhoneForm, PhonesList } from "@entites/Phone";
import {
  Gender,
  PhoneSchema,
  RegisterSchema,
  useAuthModal,
} from "@entites/User";
import { useRegisterMutation } from "@entites/User/model/api/userApi";

import { yupResolver } from "@hookform/resolvers/yup";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ErrorAlert } from "@shared/ui/Alerts/ErrorAlert";
import { useForm, useFieldArray } from "react-hook-form";
import * as Yup from "yup";
const RegisterForm = () => {
  const toast = useToast();
  const [userRegister, { isLoading }] = useRegisterMutation();
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<Yup.InferType<typeof RegisterSchema>>({
    resolver: yupResolver(RegisterSchema),
    mode: "onChange",
  });
  const { onClose } = useAuthModal();

  const { append, fields, update, remove } = useFieldArray({
    control,
    name: "phoneNumbers",
  });

  const onPhoneChange = (nextValue: string) => {
    fields.map(({ phoneNumber }, index) => {
      update(index, {
        phoneNumber,
        isMain: false,
      });
    });
    fields.map(({ phoneNumber }, index) => {
      if (phoneNumber == nextValue) {
        update(index, {
          phoneNumber,
          isMain: true,
        });
      }
    });
  };

  const onSubmit = async (data: Yup.InferType<typeof RegisterSchema>) => {
    await userRegister({
      ...data,
      phoneNumbers: data.phoneNumbers?.map((phone) => ({
        phoneNumber: phone.phoneNumber.replace(/ /g, ""),
        ...(phone.isMain && { isMain: true }),
        ...(!phone.isMain && { isMain: false }),
      })),
    })
      .unwrap()
      .then(() => onClose())
      .catch((error: FetchBaseQueryError) => {
        const data = error.data as string;
        toast({
          isClosable: true,
          duration: 3000,
          position: "top-right",
          render({ onClose }) {
            return (
              <ErrorAlert
                title="Ошибка регистрации"
                description={data}
                onClose={onClose}
              />
            );
          },
        });
      });
  };

  const onPhoneAdd = ({ phone }: Yup.InferType<typeof PhoneSchema>) => {
    if (!fields.filter((field) => field.phoneNumber == phone).length) {
      if (fields.length == 0) {
        return append({ phoneNumber: phone, isMain: true });
      }
      append({ phoneNumber: phone, isMain: false });
    }
  };

  const onPhoneDelete = (phone: string) => {
    const phoneIndex = fields.findIndex((field) => field.phoneNumber == phone);
    remove(phoneIndex);
  };

  return (
    <>
      <Box as="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Stack direction={["column", "column", "row"]}>
            <Box w={"full"}>
              <FormControl isInvalid={!!errors.name?.message}>
                <FormLabel>Имя</FormLabel>
                <Input placeholder="Имя" {...register("name")} type="text" />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box w={"full"}>
              <FormControl isInvalid={!!errors.surname?.message}>
                <FormLabel>Фамилия</FormLabel>
                <Input
                  placeholder="Фамилия"
                  {...register("surname")}
                  type="text"
                />
                <FormErrorMessage>{errors.surname?.message}</FormErrorMessage>
              </FormControl>
            </Box>
          </Stack>
          <FormControl isInvalid={!!errors.gender?.message}>
            <FormLabel>Пол</FormLabel>
            <Select {...register("gender")}>
              <option value={Gender.MALE}>Мужской</option>
              <option value={Gender.FEMALE}>Женский</option>
            </Select>
            <FormErrorMessage>{errors.gender?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.dateOfBirth?.message}>
            <FormLabel>Дата рождения</FormLabel>
            <Input
              {...register("dateOfBirth")}
              type={"date"}
              placeholder="Дата рождения"
            />
          </FormControl>
          <FormControl isInvalid={!!errors.country?.message}>
            <FormLabel>Страна</FormLabel>
            <Input
              placeholder="Укажите страну"
              {...register("country")}
              type={"text"}
            />
            <FormErrorMessage>{errors.country?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.languageID?.message}>
            <FormLabel>Язык</FormLabel>
            <Select {...register("languageID")}>
              <option value={1}>Кыргысзкий</option>
            </Select>
            <FormErrorMessage>{errors.languageID?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.email?.message}>
            <FormLabel>E-mail</FormLabel>
            <Input
              placeholder="Укажите почту"
              {...register("email")}
              type={"email"}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.password?.message}>
            <FormLabel>Пароль</FormLabel>
            <Input
              placeholder="Введите пароль"
              {...register("password")}
              type={"password"}
            />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.confirmPassword?.message}>
            <FormLabel>Подтвердите пароль</FormLabel>
            <Input
              placeholder="Введите пароль"
              {...register("confirmPassword")}
              type={"password"}
            />
            <FormErrorMessage>
              {errors.confirmPassword?.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.phoneNumbers?.message}>
            <FormLabel>Номера телефонов</FormLabel>
            {fields.length != 0 && (
              <PhonesList
                fields={fields}
                onDelete={onPhoneDelete}
                onChange={onPhoneChange}
              />
            )}

            <FormErrorMessage>{errors.phoneNumbers?.message}</FormErrorMessage>
            <Box mt={4}>
              <AddPhoneForm onChange={onPhoneAdd} />
            </Box>
          </FormControl>

          <Button
            type="submit"
            w="full"
            colorScheme="red"
            isLoading={isLoading}
          >
            Зарегистрироваться
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default RegisterForm;
