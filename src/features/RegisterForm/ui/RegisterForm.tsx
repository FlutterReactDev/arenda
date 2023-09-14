import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";

import { AddPhoneForm, PhonesList } from "@entites/Phone";
import { Gender, PhoneSchema, RegisterSchema } from "@entites/User";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import * as Yup from "yup";
const RegisterForm = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<Yup.InferType<typeof RegisterSchema>>({
    resolver: yupResolver(RegisterSchema),
    mode: "onChange",
  });

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

  const onSubmit = (data: Yup.InferType<typeof RegisterSchema>) => {
    console.log(data);
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
              <FormControl>
                <FormLabel>Имя</FormLabel>
                <Input placeholder="Имя" {...register("name")} type="text" />
              </FormControl>
            </Box>
            <Box w={"full"}>
              <FormControl>
                <FormLabel>Фамилия</FormLabel>
                <Input
                  placeholder="Фамилия"
                  {...register("surname")}
                  type="text"
                />
              </FormControl>
            </Box>
          </Stack>
          <FormControl>
            <FormLabel>Пол</FormLabel>
            <Select {...register("gender")} placeholder="Пол">
              <option value={Gender.MALE}>Мужской</option>
              <option value={Gender.FEMALE}>Женский</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel>Дата рождения</FormLabel>
            <Input
              {...register("dateOfBirth")}
              type={"date"}
              placeholder="Дата рождения"
            />
          </FormControl>
          <FormControl>
            <FormLabel>Страна</FormLabel>
            <Input
              placeholder="Укажите страну"
              {...register("country")}
              type={"text"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Язык</FormLabel>
            <Select {...register("languageID")}>
              <option value={1}>Кыргысзкий</option>
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>E-mail</FormLabel>
            <Input
              placeholder="Укажите почту"
              {...register("email")}
              type={"email"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Пароль</FormLabel>
            <Input
              placeholder="Введите пароль"
              {...register("password")}
              type={"password"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Подтвердите пароль</FormLabel>
            <Input
              placeholder="Введите пароль"
              {...register("passwordConfirmation")}
              type={"password"}
            />
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

          <Button type="submit" w="full" colorScheme="red">
            Зарегистрироваться
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default RegisterForm;
