import {
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
} from "@chakra-ui/react";

import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  HeadingFormType,
  headingFormSchema,
} from "@entites/Object/model/schemas/headingFormSchema";
import { FormProps } from "@entites/Object/model/types/objectTypes";
import { FormCard } from "@shared/ui/FormCard";
import { FC } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
interface HeadingFormProps {
  value: HeadingFormType;
  onChange: (value: HeadingFormType) => void;
}
const HeadingForm: FC<FormProps & HeadingFormProps> = (props) => {
  const { navigation, onNext, onChange, value } = props;

  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm<HeadingFormType>({
    resolver: yupResolver(headingFormSchema),
    defaultValues: value,
  });

  const title = useWatch({ control, name: "title" });

  const onSubmit = (data: HeadingFormType) => {
    onChange(data);
    onNext && onNext();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormCard title="Заголовок">
          <Alert status="info" variant="subtle">
            <AlertIcon />
            <Text fontSize={"small"}>
              Лучше назвать свой объект так, чтобы он привлекал внимание гостей.
              Например, «Уютная квартира в центре города» или «Апартаменты с
              видом на море»
            </Text>
          </Alert>
          <FormControl isInvalid={!!errors.title?.message}>
            <FormLabel>Заголовок</FormLabel>
            <InputGroup>
              <Controller
                control={control}
                name="title"
                render={({ field: { onChange, value, ...otherField } }) => {
                  return (
                    <Input
                      onChange={(e) => {
                        if (e.target.value.length <= 70) {
                          onChange(e.target.value);
                        } else {
                          onChange(value);
                        }
                      }}
                      value={value}
                      {...otherField}
                      placeholder="Введите загаловок"
                      pr={7}
                    />
                  );
                }}
              />

              <InputRightElement>
                {title?.length ? 70 - title?.length : 70}
              </InputRightElement>
            </InputGroup>

            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            <FormHelperText>
              Сделайте название коротким и уникальным. Это название гости будут
              видеть на Суточно.ру
            </FormHelperText>
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Свое название (не обязательно)</FormLabel>
            <Input {...register("ownName")} type="text" />
            <FormHelperText>
              Для удобства можете ввести уникальное название\номер, которое
              будете видеть только вы
            </FormHelperText>
          </FormControl>
        </FormCard>
        <FormCard title="Подробное описание">
          <FormControl isInvalid={!!errors.detailedDescription?.message}>
            <Textarea
              {...register("detailedDescription")}
              placeholder="Напишите о своем объекте подробнее (исключая то, что уже указали на предыдущих этапах). Например, расскажите, чем ваше жильё привлекательно для гостей"
              size="sm"
            />
            <FormErrorMessage>
              {errors.detailedDescription?.message}
            </FormErrorMessage>
          </FormControl>
        </FormCard>
        {navigation}
      </FormContainer>
    </Box>
  );
};

export default HeadingForm;
