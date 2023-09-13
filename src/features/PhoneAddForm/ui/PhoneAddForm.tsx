import { PhoneSchema } from "@entites/User";
import * as Yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, FormControl, FormLabel, HStack } from "@chakra-ui/react";
import { FC } from "react";

import { PhoneInput } from "@shared/ui/PhoneInput";
export interface AddPhoneFormProps {
  onChange: (data: Yup.InferType<typeof PhoneSchema>) => void;
}

export const AddPhoneForm: FC<AddPhoneFormProps> = (props) => {
  const { onChange } = props;
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(PhoneSchema),
  });
  const onSubmit = (data: Yup.InferType<typeof PhoneSchema>) => {
    onChange(data);
  };
  return (
    <HStack alignItems={"flex-end"}>
      <FormControl>
        <FormLabel>Номер телефона</FormLabel>

        <Controller
          name="phone"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => {
            return (
              <PhoneInput onBlur={onBlur} onChange={onChange} value={value} />
            );
          }}
        />
      </FormControl>
      <Button type="submit" fontSize={"x-small"} onClick={handleSubmit(onSubmit)}>
        Добавить номер
      </Button>
    </HStack>
  );
};
