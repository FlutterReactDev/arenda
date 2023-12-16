import {
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
} from "@chakra-ui/react";

import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  CleaningFeeTypes,
  Currency,
} from "@entites/CommonReference/model/types";
import {
  RoomOptionalServiceType,
  roomOptionalServiceSchema,
} from "@entites/Object/model/schemas/roomOptionalServiceSchema";
import { CleaningFeeType } from "@entites/Object/model/types/createRoomTypes";
import { FormProps } from "@entites/Object/model/types/objectTypes";
import { FormCard } from "@shared/ui/FormCard";
import { getCurrencySymbol } from "@shared/utils/getCurrencySymbol";
import { FC } from "react";
import { useForm } from "react-hook-form";

interface RoomOptionalServiceFormProps {
  value: RoomOptionalServiceType;
  onChange: (value: RoomOptionalServiceType) => void;
  cleaningFeeTypes: CleaningFeeTypes[];
  currentCurrencyId: number;
  currencies: Currency[];
}
const RoomOptionalServiceForm: FC<FormProps & RoomOptionalServiceFormProps> = (
  props
) => {
  const {
    onPrev,
    onNext,
    onChange,
    value,
    cleaningFeeTypes,
    currencies,
    currentCurrencyId,
  } = props;
  console.log(currencies);
  
  const {
    handleSubmit,
    watch,
    formState: { errors },
    register,
  } = useForm<RoomOptionalServiceType>({
    resolver: yupResolver(roomOptionalServiceSchema),
    defaultValues: value,
  });

  const cleaningFeeType = watch("cleaningFeeType");
  const onSubmit = (data: RoomOptionalServiceType) => {
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

        <HStack p={3} w="full" rounded={"lg"} bgColor={"white"}>
          <Button onClick={onPrev} w="30%">
            Назад
          </Button>
          <Button colorScheme="red" w="70%" type="submit">
            Создать комнату
          </Button>
        </HStack>
      </FormContainer>
    </Box>
  );
};

export default RoomOptionalServiceForm;
