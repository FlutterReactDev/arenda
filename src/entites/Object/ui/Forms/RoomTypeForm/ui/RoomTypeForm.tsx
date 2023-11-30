import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
} from "@chakra-ui/react";
import { RoomCategories } from "@entites/CommonReference/model/types";
import { FormProps } from "@entites/Object";
import {
  RoomFormType,
  roomTypeSchema,
} from "@entites/Object/model/schemas/roomTypeSchema";
import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCard } from "@shared/ui/FormCard";
import { FC } from "react";
import { Controller, useForm } from "react-hook-form";
interface RoomTypeFormProps {
  value: RoomFormType;
  onChange: (value: RoomFormType) => void;
  roomCategories: RoomCategories[];
}
const RoomTypeForm: FC<FormProps & RoomTypeFormProps> = (props) => {
  const { onChange, value, onNext, roomCategories } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RoomFormType>({
    resolver: yupResolver(roomTypeSchema),
    defaultValues: {
      ...value,
      categoryType: value.categoryType || undefined,
    },
  });

  const onSubmit = (data: RoomFormType) => {
    onChange(data);
    onNext && onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormCard title="Укажите тип объекта">
          <FormContainer>
            <FormControl isInvalid={!!errors.categoryType?.message}>
              <FormLabel>Категория номера</FormLabel>
              <Select {...register("categoryType")} placeholder="Выберите">
                {roomCategories.map(({ name, value }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </Select>
              {errors.categoryType?.message && (
                <FormErrorMessage>
                  {errors.categoryType?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.count?.message}>
              <FormLabel>Кол-во номеров этого типам</FormLabel>
              <Controller
                control={control}
                defaultValue={1}
                name="count"
                render={({ field }) => {
                  return (
                    <NumberInput {...field} w="wull" min={1}>
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  );
                }}
              />
              {errors.count?.message && (
                <FormErrorMessage>{errors.count?.message}</FormErrorMessage>
              )}
            </FormControl>
          </FormContainer>
        </FormCard>
        <HStack bgColor={"white"} rounded={"lg"} p={3}>
          <Button w="full" type="submit" colorScheme="red">
            Продолжить
          </Button>
        </HStack>
      </FormContainer>
    </form>
  );
};

export default RoomTypeForm;
