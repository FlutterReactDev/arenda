import {
  Box,
  FormControl,
  FormLabel,
  Select,
  FormHelperText,
  InputGroup,
  Input,
  InputRightElement,
  FormErrorMessage,
  Alert,
  AlertIcon,
  Stack,
  HStack,
  Switch,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { FormProps } from "@entites/Object/model/types";
import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import { addObjectStepActions } from "@entites/Object";
import { getForm } from "@entites/Object/model/selectors";
import { FormCard } from "@shared/ui/FormCard";
import { getCurrencySymbol } from "@shared/utils/getCurrencySymbol";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { InferType } from "yup";
import { optionalServiceSchema } from "@entites/Object/model/schemas/optionalServiceSchema";
import { priceSchema } from "@entites/Object/model/schemas/priceSchema";

const OptionalServiceForm: FC<FormProps> = (props) => {
  const { navigation, onNext } = props;

  const optionalServiceData = useAppSelector(getForm(1, 2)) as InferType<
    typeof optionalServiceSchema
  >;

  const { currency } = useAppSelector(getForm(0, 2)) as InferType<
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
    if (data.finalCleaning == "2") {
      delete data.cleaningCost;
    }

    dispatch(
      addObjectStepActions.setForm({
        data: { ...data },
        screen: 1,
        step: 2,
      })
    );
    onNext && onNext();
  };
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
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
                  defaultValue={optionalServiceData.cleaningCost || 0}
                  {...register("cleaningCost")}
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
        {navigation}
      </FormContainer>
    </Box>
  );
};

export default OptionalServiceForm;
