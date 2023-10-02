import {
  Box,
  Button,
  Checkbox,
  FormControl,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FormCard } from "./FormCard";
import { InferType } from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { calendarInfoSchema } from "../model/schemas/calendarInfoSchema";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getForm } from "../model/selectors";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { addObjectAction } from "..";
import { FC } from "react";
interface CalendarInfoFormProps {
  onChangeScreen: (screen: number) => void;
  onChangeStep: (step: number) => void;
}
export const CalendarInfoForm: FC<CalendarInfoFormProps> = (props) => {
  const { onChangeStep, onChangeScreen } = props;
  const calendarInfoData = useAppSelector(getForm(5, 1));
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
      addObjectAction.setForm({
        data,
        screen: 5,
        step: 1,
      })
    );
    onChangeStep(2);
    onChangeScreen(1);
  };

  const onPrev = () => {
    onChangeStep(1);
    onChangeScreen(4);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
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
      </Stack>
    </Box>
  );
};
