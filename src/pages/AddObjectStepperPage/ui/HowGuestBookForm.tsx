import {
  Badge,
  Box,
  FormControl,
  FormHelperText,
  Text,
  HStack,
  Icon,
  Radio,
  RadioGroup,
  Stack,
  FormLabel,
  Switch,
  Button,
} from "@chakra-ui/react";
import { FormCard } from "./FormCard";
import { IoIosFlash } from "react-icons/io";

import { useForm, Controller } from "react-hook-form";
import { howGuestBookSchema } from "../model/schemas/howGuestBookSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { InferType } from "yup";
import { FC } from "react";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getForm } from "../model/selectors";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { addObjectAction } from "..";
interface HowGuestBookFormProps {
  onChangeScreen(index: number): void;
}
export const HowGuestBookForm: FC<HowGuestBookFormProps> = (props) => {
  const { onChangeScreen } = props;
  const howGuestBookData = useAppSelector(getForm(3, 1));
  const dispatch = useAppDispatch();
  const { handleSubmit, watch, control, register } = useForm<
    InferType<typeof howGuestBookSchema>
  >({
    resolver: yupResolver(howGuestBookSchema),
    defaultValues: { ...howGuestBookData } as InferType<
      typeof howGuestBookSchema
    >,
  });

  const onSubmit = (data: InferType<typeof howGuestBookSchema>) => {
    if (data.bookingType == "sendRequest") {
      delete data.highlyRatedGuestsBookInstantly;
    }
    dispatch(
      addObjectAction.setForm({
        data,
        screen: 3,
        step: 1,
      })
    );
    onChangeScreen(4);
  };

  const onPrev = () => {
    onChangeScreen(2);
  };

  const bookingType = watch("bookingType");

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
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
