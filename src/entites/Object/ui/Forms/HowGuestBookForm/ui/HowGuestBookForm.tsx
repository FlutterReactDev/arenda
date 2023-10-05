import {
  Box,
  Stack,
  RadioGroup,
  FormControl,
  Radio,
  HStack,
  Icon,
  Badge,
  FormHelperText,
  FormLabel,
  Switch,
  Text,
} from "@chakra-ui/react";
import { FormProps } from "@entites/Object/model/types";
import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import { addObjectStepActions } from "@entites/Object";

import { getForm } from "@entites/Object/model/selectors";
import { FormCard } from "@shared/ui/FormCard";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { FC } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoIosFlash } from "react-icons/io";
import { InferType } from "yup";
import { howGuestBookSchema } from "@entites/Object/model/schemas/howGuestBookSchema";

const HowGuestBookForm: FC<FormProps> = (props) => {
  const { navigation, onNext } = props;

  const howGuestBookData = useAppSelector(getForm(2, 1));
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
      addObjectStepActions.setForm({
        data,
        screen: 2,
        step: 1,
      })
    );
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
