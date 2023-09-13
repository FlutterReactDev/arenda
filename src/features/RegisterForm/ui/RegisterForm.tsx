import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
} from "@chakra-ui/react";
import { Gender, RegisterSchema } from "@entites/User";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import * as Yup from "yup";
const RegisterForm = () => {
  const { handleSubmit, register, control } = useForm<
    Yup.InferType<typeof RegisterSchema>
  >({
    resolver: yupResolver(RegisterSchema),
  });

  const { fields, append } = useFieldArray({
    control,
    name: "test",
  });

  const onSubmit = (data: Yup.InferType<typeof RegisterSchema>) => {
    console.log(data);
    append([{ value: 1 }, { value: 1 }, { value: 1 }]);
  };
  return (
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
            {...register("password")}
            type={"password"}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Номер телефона</FormLabel>
          <Box>
            <Radio value="1" />
            <Radio value="1" />
            <Radio value="1" />
          </Box>
        </FormControl>
        <Button type="submit" w="full" colorScheme="red">
          Зарегистрироваться
        </Button>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
