import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  Stack,
} from "@chakra-ui/react";

import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormCard } from "@shared/ui/FormCard";

import {
  BookingSettingType,
  bookingSettingSchema,
} from "@entites/Object/model/schemas/bookingSettingSchema";
import { FormProps } from "@entites/Object/model/types/objectTypes";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { InferType } from "yup";
import {
  FromBookingToCheckIn,
  InstantBookingValid,
} from "@entites/CommonReference/model/types";
interface BookingSettingFormProps {
  value: BookingSettingType;
  onChange: (value: BookingSettingType) => void;
  fromBookingToCheckIn: FromBookingToCheckIn[];
  instantBookingValid: InstantBookingValid[];
}
const BookingSettingForm: FC<FormProps & BookingSettingFormProps> = (props) => {
  const {
    navigation,
    onNext,
    value,
    onChange,
    fromBookingToCheckIn,
    instantBookingValid,
  } = props;

  const { handleSubmit, register } = useForm<BookingSettingType>({
    resolver: yupResolver(bookingSettingSchema),
    defaultValues: value,
  });

  const onSubmit = (data: InferType<typeof bookingSettingSchema>) => {
    onChange(data);
    onNext && onNext();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormCard title="Как гости могут бронировать">
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>
                От бронирования до заселения должно оставаться:
              </FormLabel>
              <Select {...register("fromBookingToCheckIn")}>
                {fromBookingToCheckIn.map(({ name, value }) => (
                  <option value={value} key={value}>
                    {name}
                  </option>
                ))}
              </Select>
              <FormHelperText>
                Если до заселения меньше 5 часов, запрос придёт вам на
                согласование
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Мгновенное бронирование действует:</FormLabel>
              <Select {...register("instantBookingStart")}>
                {instantBookingValid.map(({ name, value }) => (
                  <option value={value} key={value}>
                    {name}
                  </option>
                ))}
              </Select>
              <FormHelperText>
                Если до дня заселения больше 3 месяцев, запрос придёт вам на
                согласование
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>Размер предоплаты</FormLabel>
              <Select {...register("prepaymentPercent")}>
                <option value="10">10%</option>
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
        {navigation}
      </FormContainer>
    </Box>
  );
};
export default BookingSettingForm;
