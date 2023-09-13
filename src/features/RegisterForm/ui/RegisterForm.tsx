import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Gender, RegisterSchema } from "@entites/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { SingleDatepicker } from "@shared/ui/Calendar";
import { useForm, Controller } from "react-hook-form";
import * as Yup from "yup";
const RegisterForm = () => {
  const { handleSubmit, register, control } = useForm<
    Yup.InferType<typeof RegisterSchema>
  >({
    resolver: yupResolver(RegisterSchema),
  });

  const onSubmit = (data: Yup.InferType<typeof RegisterSchema>) => {
    console.log(data);
  };
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <HStack>
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
        </HStack>
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
            {...register("password")}
            type={"password"}
          />
        </FormControl>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
