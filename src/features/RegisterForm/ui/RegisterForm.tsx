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
          <Box>
            <FormControl>
              <FormLabel>Имя</FormLabel>
              <Input placeholder="Имя" {...register("name")} type="text" />
            </FormControl>
          </Box>
          <Box>
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
          <FormLabel>Пол</FormLabel>
          <Select {...register("gender")} placeholder="Пол">
            <option value={Gender.MALE}>Мужской</option>
            <option value={Gender.FEMALE}>Женский</option>
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Дата рождения</FormLabel>
          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field: { onChange, value } }) => (
              <SingleDatepicker onChange={onChange} selected={value} />
            )}
          />
        </FormControl>
      </Stack>
    </Box>
  );
};

export default RegisterForm;
