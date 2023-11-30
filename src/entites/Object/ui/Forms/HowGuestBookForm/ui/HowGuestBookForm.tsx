import {
  Badge,
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Icon,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";

import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  HowGuestBookType,
  howGuestBookSchema,
} from "@entites/Object/model/schemas/howGuestBookSchema";
import { FormProps } from "@entites/Object/model/types/objectTypes";
import { FormCard } from "@shared/ui/FormCard";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { IoIosFlash } from "react-icons/io";
interface HowGuestBookFormProps {
  value: HowGuestBookType;
  onChange: (value: HowGuestBookType) => void;
}
const HowGuestBookForm: FC<FormProps & HowGuestBookFormProps> = (props) => {
  const { navigation, onNext, value, onChange } = props;

  const { handleSubmit, watch, control, register } = useForm<HowGuestBookType>({
    resolver: yupResolver(howGuestBookSchema),
    defaultValues: value,
  });

  const onSubmit = (data: HowGuestBookType) => {
    onChange(data);
    onNext && onNext();
  };

  const bookingType = watch("bookingType");

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormCard title="Как гости могут бронировать">
          <Controller
            control={control}
            name="bookingType"
            defaultValue="sendRequest"
            render={({ field: { value, onChange, ref, onBlur, name } }) => {
              return (
                <RadioGroup
                  value={value}
                  onChange={onChange}
                  ref={ref}
                  onBlur={onBlur}
                  name={name}
                >
                  <Stack spacing={4}>
                    <FormControl>
                      <Radio value="bookInstantly" colorScheme="red">
                        <HStack alignItems={"center"} spacing={1}>
                          <Icon as={IoIosFlash} />
                          <Text>бронируют мгновенно</Text>
                          <Badge colorScheme="gray">РЕКОМЕНДУЕМ</Badge>
                        </HStack>
                      </Radio>
                      <FormHelperText>
                        Мгновенное бронирование приносит в 3 раза больше броней.
                        Ваше объявление выделяется специальным значком и
                        занимает более высокую позицию, если гость указал даты
                        при поиске вариантов. Вы можете настроить условия, при
                        которых мгновенная бронь будет приходить к вам на
                        согласование
                      </FormHelperText>
                    </FormControl>
                    {bookingType == "bookInstantly" && (
                      <FormControl>
                        <HStack justifyContent={"space-between"}>
                          <FormLabel>
                            мгновенно бронируют только гости с высоким рейтингом
                          </FormLabel>
                          <Switch
                            {...register("highlyRatedGuestsBookInstantly")}
                            colorScheme="red"
                          />
                        </HStack>
                        <FormHelperText>
                          Если у гостя высокий рейтинг, он сможет использовать
                          мгновенное бронирование. Если его рейтинг ниже 6, вам
                          придет запрос, который можно принять или отклонить.
                        </FormHelperText>
                      </FormControl>
                    )}
                    <FormControl>
                      <Radio value="sendRequest" colorScheme="red">
                        отправляют запрос
                      </Radio>
                      <FormHelperText>
                        Вы будете получать запросы на бронь — каждый нужно
                        обработать в личном кабинете. Гости реже пользуются
                        запросами: они не любят долго ждать ответа арендодателя
                        и выбирают мгновенное бронирование
                      </FormHelperText>
                    </FormControl>
                  </Stack>
                </RadioGroup>
              );
            }}
          />
        </FormCard>
        {navigation}
      </FormContainer>
    </Box>
  );
};

export default HowGuestBookForm;
