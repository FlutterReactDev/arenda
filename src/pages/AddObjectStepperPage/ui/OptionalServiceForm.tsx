import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Switch,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { FormCard } from "./FormCard";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { optionalServiceSchema } from "../model/schemas/optionalServiceSchema";
import { InferType } from "yup";
import { FC } from "react";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getForm } from "../model/selectors";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { addObjectAction } from "..";
import { priceSchema } from "../model/schemas/priceSchema";
import { getCurrencySymbol } from "@shared/utils/getCurrencySymbol";
interface OptionalServiceFormProps {
  onChangeScreen: (screen: number) => void;
  onChangeStep: (step: number) => void;
}
export const OptionalServiceForm: FC<OptionalServiceFormProps> = (props) => {
  const { onChangeScreen } = props;
  const optionalServiceData = useAppSelector(getForm(2, 2));
  const { currency } = useAppSelector(getForm(1, 2)) as InferType<
    typeof priceSchema
  >;
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    watch,
    formState: { errors },
    register,
  } = useForm<InferType<typeof optionalServiceSchema>>({
    resolver: yupResolver(optionalServiceSchema),
    defaultValues: { ...optionalServiceData } as InferType<
      typeof optionalServiceSchema
    >,
  });

  const transfer = watch("transfer");
  const finalCleaning = watch("finalCleaning");
  const onSubmit = (data: InferType<typeof optionalServiceSchema>) => {
    if (!data.transfer) {
      delete data.transferDescription;
    }
    if (data.finalCleaning == "1") {
      delete data.cleaningCost;
    }

    dispatch(
      addObjectAction.setForm({
        data,
        screen: 2,
        step: 2,
      })
    );
  };
  const onPrev = () => {
    onChangeScreen(1);
  };
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormCard title="Плата за уборку">
          <FormControl>
            <FormLabel>Финальная уборка</FormLabel>
            <Select {...register("finalCleaning")} defaultValue={"2"}>
              <option value="1">оплачивается отдельно</option>
              <option value="2">
                включена в стоимость проживания (рекомендуется)
              </option>
            </Select>
            <FormHelperText>
              Цена уборки уже учитывается в стоимости проживания
            </FormHelperText>
          </FormControl>
          {finalCleaning == "1" && (
            <FormControl mt={2} isInvalid={!!errors.cleaningCost?.message}>
              <FormLabel>Cколько стоит уборка</FormLabel>
              <InputGroup>
                <Input
                  {...register("cleaningCost")}
                  defaultValue={0}
                  type="number"
                />
                <InputRightElement>
                  {getCurrencySymbol("ru-RU", currency)}
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.cleaningCost?.message}
              </FormErrorMessage>
            </FormControl>
          )}
        </FormCard>
        <FormCard title="Страховой депозит">
          <FormControl isInvalid={!!errors.depositAmount?.message}>
            <FormLabel>Размер депозита</FormLabel>
            <InputGroup>
              <Input
                {...register("depositAmount")}
                type="number"
                defaultValue={0}
              />
              <InputRightElement>
                {getCurrencySymbol("ru-RU", currency)}
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errors.depositAmount?.message}</FormErrorMessage>
            <FormHelperText>
              Залог, который вы берёте с гостя при заезде и возвращаете при
              отъезде
            </FormHelperText>
          </FormControl>
        </FormCard>
        <FormCard title="Трансфер">
          <Alert status="info">
            <AlertIcon />
            <Text fontSize={"small"}>
              Отметьте этот пункт, если вы предоставляете гостям трансфер к
              месту проживания (например, от вокзала или аэропорта)
            </Text>
          </Alert>
          <Stack mt={2} spacing={2}>
            <FormControl>
              <HStack justifyContent={"space-between"}>
                <FormLabel>Предоставляется трансфер</FormLabel>
                <Switch {...register("transfer")} colorScheme="red" />
              </HStack>
            </FormControl>
            {transfer && (
              <FormControl isInvalid={!!errors.transferDescription?.message}>
                <Textarea
                  {...register("transferDescription")}
                  placeholder="Опишите условия предоставления трансфера"
                />
                <FormErrorMessage>
                  {errors.transferDescription?.message}
                </FormErrorMessage>
              </FormControl>
            )}
          </Stack>
        </FormCard>
        <FormCard>
          <HStack justifyContent={"space-between"}>
            <Button onClick={onPrev} colorScheme="gray" variant={"outline"}>
              Назад
            </Button>
            <Button type="submit" colorScheme="red">
              Продолжить
            </Button>
          </HStack>
        </FormCard>
      </Stack>
    </Box>
  );
};
