import {
  Box,
  Stack,
  FormControl,
  FormLabel,
  Select,
  FormErrorMessage,
  Input,
  Center,
  Button,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { firstFormSchema } from "../model/schemas/firstFormSchema";
import { FormCard } from "./FormCard";
import * as Yup from "yup";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { addObjectAction } from "../model/addObjectSlice";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { InferType } from "yup";

interface FirstFormStepProps {
  onChangeScreen: (index: number) => void;
}

export const FirstFormStep: FC<FirstFormStepProps> = (props) => {
  const { onChangeScreen } = props;
  const dispatch = useAppDispatch();
  const forms = useAppSelector((state) => state.addOBject.forms);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Yup.InferType<typeof firstFormSchema>>({
    resolver: yupResolver(firstFormSchema),
    defaultValues: {
      ...(forms.filter((form) => form.screen == 1 && form.step == 0)[0]
        .data as InferType<typeof firstFormSchema>),
    },
  });
  const streetType = watch("streetType");

  const onSubmit = (data: Yup.InferType<typeof firstFormSchema>) => {
    console.log(data);

    dispatch(
      addObjectAction.setForm({
        screen: 1,
        step: 0,
        data,
      })
    );
    onChangeScreen(2);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormCard title="Адресс">
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.streetType?.message}>
              <FormLabel>Тип улицы</FormLabel>
              <Select
                {...register("streetType")}
                placeholder="Выберите тип улицы"
              >
                <option value={"boulevard"}>Бульвар</option>
                <option value={"lane"}>Переулок</option>
                <option value={"avenue"}>Проспект</option>
                <option value={"street"}>Улица</option>
                <option value={"other"}>Другое</option>
              </Select>
              {errors.streetType?.message && (
                <FormErrorMessage>
                  {errors.streetType?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            {streetType == "other" && (
              <FormControl isInvalid={!!errors.additionalStreetType?.message}>
                <Select
                  {...register("additionalStreetType")}
                  placeholder="Выберите другой тип улицы"
                >
                  <option value={"alley"}>Аллея</option>
                  <option value={"road"}> дорога</option>
                  <option value={"lane"}> дорожка</option>
                  <option value={"zhilmassiv"}> жилмассив</option>
                  <option value={"kilometer"}> километр</option>
                  <option value={"line"}> линия</option>
                  <option value={"seafront"}>набережная</option>
                  <option value={"square"}>площадь</option>
                  <option value={"travel"}>проезд</option>
                  <option value={"average"}>просека</option>
                  <option value={"village"}>просёлок</option>
                  <option value={"track"}>трасса</option>
                  <option value={"descent"}>спуск</option>
                  <option value={"deadlock"}>тупик</option>
                </Select>

                <FormErrorMessage>
                  {errors.additionalStreetType?.message}
                </FormErrorMessage>
              </FormControl>
            )}
            <FormControl isInvalid={!!errors.streetName?.message}>
              <FormLabel>Название улицы</FormLabel>
              <Input {...register("streetName")} />
              {errors.streetName?.message && (
                <FormErrorMessage>
                  {errors.streetName?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.house?.message}>
              <FormLabel>Дом</FormLabel>
              <Input {...register("house")} />
              {errors.house?.message && (
                <FormErrorMessage>{errors.house?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.corps?.message}>
              <FormLabel>Корпус</FormLabel>
              <Input {...register("corps")} />
              {errors.corps?.message && (
                <FormErrorMessage>{errors.corps?.message}</FormErrorMessage>
              )}
            </FormControl>
          </Stack>
        </FormCard>
        <FormCard>
          <Center>
            <Button type="submit" colorScheme="red">
              Продолжить
            </Button>
          </Center>
        </FormCard>
      </Stack>
    </Box>
  );
};
