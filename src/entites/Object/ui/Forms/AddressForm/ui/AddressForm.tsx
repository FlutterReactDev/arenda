import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

import { InferType } from "yup";
import { FormCard } from "@shared/ui/FormCard";
import { FormProps } from "@entites/Object/model/types";
import { FormContainer } from "@entites/Object/ui/FormContainer";
import { addressFormSchema } from "@entites/Object/model/schemas/addressFormSchema";

interface AddressFormProps {
  defaultValues?: InferType<typeof addressFormSchema>;
  changeState?: (data: InferType<typeof addressFormSchema>) => void;
}
const AddressForm: FC<FormProps & AddressFormProps> = (props) => {
  const { navigation, onNext, defaultValues, changeState } = props;
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<InferType<typeof addressFormSchema>>({
    resolver: yupResolver(addressFormSchema),
    defaultValues,
  });

  const onSubmit = (data: Yup.InferType<typeof addressFormSchema>) => {
    changeState && changeState(data);
    onNext && onNext();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormCard title="Адресс">
          <FormContainer>
            <FormControl isInvalid={!!errors.streetName?.message}>
              <FormLabel>Название улицы</FormLabel>
              <Input {...register("streetName")} />
              {errors.streetName?.message && (
                <FormErrorMessage>
                  {errors.streetName?.message}
                </FormErrorMessage>
              )}
            </FormControl>
            <FormControl isInvalid={!!errors.house?.message}>
              <FormLabel>Дом</FormLabel>
              <Input {...register("house")} />
              {errors.house?.message && (
                <FormErrorMessage>{errors.house?.message}</FormErrorMessage>
              )}
            </FormControl>
          </FormContainer>
        </FormCard>
        {navigation}
      </FormContainer>
    </Box>
  );
};

export default AddressForm;
