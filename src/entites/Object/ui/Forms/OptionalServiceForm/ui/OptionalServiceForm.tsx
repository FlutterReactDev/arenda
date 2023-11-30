import {
  Alert,
  AlertIcon,
  Box,
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

import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  OptionalServiceType,
  optionalServiceSchema,
} from "@entites/Object/model/schemas/optionalServiceSchema";
import { FormProps } from "@entites/Object/model/types/objectTypes";
import { FormCard } from "@shared/ui/FormCard";
import { getCurrencySymbol } from "@shared/utils/getCurrencySymbol";
import { FC } from "react";
import { useForm } from "react-hook-form";
import {
  CleaningFeeTypes,
  Currency,
} from "@entites/CommonReference/model/types";
import { CleaningFeeType } from "@entites/Object/model/types/createRoomTypes";
interface OptionalServiceFormProps {
  value: OptionalServiceType;
  onChange: (value: OptionalServiceType) => void;
  cleaningFeeTypes: CleaningFeeTypes[];
  currentCurrencyId: number;
  currencies: Currency[];
}
const OptionalServiceForm: FC<FormProps & OptionalServiceFormProps> = (
  props
) => {
  const {
    navigation,
    onNext,
    onChange,
    value,
    cleaningFeeTypes,
    currencies,
    currentCurrencyId,
  } = props;

  const {
    handleSubmit,
    watch,
    formState: { errors },
    register,
  } = useForm<OptionalServiceType>({
    resolver: yupResolver(optionalServiceSchema),
    defaultValues: value,
  });

  const transfer = watch("transfer");
  const cleaningFeeType = watch("cleaningFeeType");
  const onSubmit = (data: OptionalServiceType) => {
    onChange(data);
    onNext && onNext();
  };
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormCard title="Плата за уборку">
          <FormControl>
            <FormLabel>Финальная уборка</FormLabel>
            <Select {...register("cleaningFeeType")} defaultValue={"2"}>
              {cleaningFeeTypes.map(({ name, value }) => (
                <option value={value} key={value}>
                  {name}
                </option>
              ))}
            </Select>
            <FormHelperText>
              Цена уборки уже учитывается в стоимости проживания
            </FormHelperText>
          </FormControl>
          {cleaningFeeType == CleaningFeeType.PAID_SEPARATELY && (
            <FormControl mt={2} isInvalid={!!errors.cleaningAmount?.message}>
              <FormLabel>Cколько стоит уборка</FormLabel>
              <InputGroup>
                <Input {...register("cleaningAmount")} type="number" />
                <InputRightElement>
                  {getCurrencySymbol(
                    "ru-RU",
                    currencies.filter(
                      (currency) => currency.id == currentCurrencyId
                    )[0].symbol
                  )}
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {errors.cleaningAmount?.message}
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
                {getCurrencySymbol(
                  "ru-RU",
                  currencies.filter(
                    (currency) => currency.id == currentCurrencyId
                  )[0].symbol
                )}
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
