import {
  Box,
  Stack,
  HStack,
  Button,
  FormControl,
  FormLabel,
  Select,
  FormHelperText,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FormCard } from "./FormCard";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSettingSchema } from "../model/schemas/bookingSettingSchema";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getForm } from "../model/selectors";
import { InferType } from "yup";
import { addObjectAction } from "..";
import { FC } from "react";

interface BookingSettingFormProps {
  onChangeScreen(index: number): void;
}
export const BookingSettingForm: FC<BookingSettingFormProps> = (props) => {
  const { onChangeScreen } = props;
  const bookingSettingData = useAppSelector(getForm(4, 1));
  const dispatch = useAppDispatch();
  const { handleSubmit, register } = useForm<
    InferType<typeof bookingSettingSchema>
  >({
    resolver: yupResolver(bookingSettingSchema),
    defaultValues: { ...bookingSettingData } as InferType<
      typeof bookingSettingSchema
    >,
  });

  const onSubmit = (data: InferType<typeof bookingSettingSchema>) => {
    dispatch(
      addObjectAction.setForm({
        data,
        screen: 4,
        step: 1,
      })
    );
    onChangeScreen(5);
  };

  const onPrev = () => {
    onChangeScreen(3);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormCard title="Как гости могут бронировать">
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>
                От бронирования до заселения должно оставаться:
              </FormLabel>
              <Select {...register("bookingToCheckInTheFollowingRemain")}>
                <option value="0">без ограничений</option>
                <option value="1">минимум 1 час</option>
                <option value="2">минимум 2 часа</option>
                <option value="3">минимум 3 часа</option>
                <option value="4">минимум 4 часа</option>
                <option value="5">минимум 5 часов</option>
                <option value="6">минимум 6 часов</option>
                <option value="9">минимум 9 часов</option>
                <option value="12">минимум 12 часов</option>
                <option value="24">минимум 24 часа</option>
                <option value="36">минимум 36 часов</option>
                <option value="48">минимум 48 часов (двое суток)</option>
              </Select>
              <FormHelperText>
                Если до заселения меньше 5 часов, запрос придёт вам на
                согласование
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Мгновенное бронирование действует:</FormLabel>
              <Select {...register("instantBookingIsValid")}>
                <option value="30">на 1 месяц вперёд</option>
                <option value="60">на 2 месяца вперёд</option>
                <option value="90">на 3 месяца вперёд</option>
                <option value="120">на 4 месяца вперёд</option>
                <option value="150">на 5 месяцев вперёд</option>
                <option value="180">на 6 месяцев вперёд</option>
                <option value="270">на 9 месяцев вперёд</option>
                <option value="360">на 12 месяцев вперёд</option>
              </Select>
              <FormHelperText>
                Если до дня заселения больше 3 месяцев, запрос придёт вам на
                согласование
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Размер предоплаты</FormLabel>
              <Select {...register("prepaymentAmount")}>
                <option value="18">18%</option>
                <option value="15">15%</option>
                <option value="20">20%</option>
                <option value="25">25%</option>
                <option value="30">30%</option>
                <option value="35">35%</option>
                <option value="40">40%</option>
                <option value="45">45%</option>
                <option value="50">50%</option>
                <option value="60">60%</option>
                <option value="70">70%</option>
                <option value="80">80%</option>
                <option value="90">90%</option>
                <option value="100">100%</option>
              </Select>
              <FormHelperText>
                Чтобы самому назначать размер предоплаты, вам нужно работать с
                Суточно.ру в качестве самозанятого, ИП или юрлица. Для
                заключения договора обращайтесь в Службу поддержки.
              </FormHelperText>
            </FormControl>
          </Stack>
        </FormCard>
        <FormCard>
          <HStack w="full" justifyContent={"space-between"} px={2}>
            <Button onClick={onPrev} colorScheme="gray" variant="outline">
              Назад
            </Button>
            <Button colorScheme="red" type="submit">
              Продолжить
            </Button>
          </HStack>
        </FormCard>
      </Stack>
    </Box>
  );
};
