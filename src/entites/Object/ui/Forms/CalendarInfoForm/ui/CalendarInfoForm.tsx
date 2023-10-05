import {
  Box,
  FormControl,
  Checkbox,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import { FormProps } from "@entites/Object/model/types";
import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";

import { getForm } from "@entites/Object/model/selectors";
import { FormCard } from "@shared/ui/FormCard";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { InferType } from "yup";
import { calendarInfoSchema } from "@entites/Object/model/schemas/calendarInfoSchema";
import { addObjectStepActions } from "@entites/Object";
const CalendarInfoForm: FC<FormProps> = (props) => {
  const { onNext, onPrev } = props;
  const calendarInfoData = useAppSelector(getForm(4, 1));
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<InferType<typeof calendarInfoSchema>>({
    resolver: yupResolver(calendarInfoSchema),
    defaultValues: { ...calendarInfoData } as InferType<
      typeof calendarInfoSchema
    >,
  });

  const calendarAgree = watch("calendarAgree");
  const onSubmit = (data: InferType<typeof calendarInfoSchema>) => {
    dispatch(
      addObjectStepActions.setForm({
        data,
        screen: 4,
        step: 1,
      })
    );
    onNext && onNext();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormCard title="Ведите календарь занятости — гостям важна каждая дата">
          <Text>
            Если даты в календаре свободны, гость может отправить на них запрос
            или воспользоваться мгновенным бронированием. После оформления брони
            вам нужно обязательно заселить гостя: если вы отмените бронь, нам
            придется списать штраф с вашего баланса. Чтобы получать бронирования
            только на нужные даты и избегать штрафов, следите за календарем
            занятости: можно заполнять его вручную либо настроить синхронизацию
            с другими сервисами бронирования и менеджерами каналов.
          </Text>
          <FormControl mt={5} isInvalid={!!errors.calendarAgree?.message}>
            <Checkbox {...register("calendarAgree")} colorScheme="red">
              Ясно! Буду обновлять календарь или настрою синхронизацию.
            </Checkbox>
          </FormControl>
        </FormCard>
        <FormCard>
          <HStack justifyContent={"space-between"}>
            <Button onClick={onPrev} colorScheme="gray" variant={"outline"}>
              Назад
            </Button>
            <Button isDisabled={!calendarAgree} type="submit" colorScheme="red">
              Продолжить
            </Button>
          </HStack>
        </FormCard>
      </FormContainer>
    </Box>
  );
};

export default CalendarInfoForm;
