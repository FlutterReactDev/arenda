import {
  Box,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { FormProps } from "@entites/Object/model/types";
import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import { addObjectStepActions } from "@entites/Object";

import { getForm } from "@entites/Object/model/selectors";
import { FormCard } from "@shared/ui/FormCard";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { FC } from "react";
import { useForm, useWatch, Controller } from "react-hook-form";
import { InferType } from "yup";
import { headingFormSchema } from "@entites/Object/model/schemas/headingFormSchema";

const HeadingForm: FC<FormProps> = (props) => {
  const { navigation, onNext } = props;
  const headingData = useAppSelector(getForm(5, 0));
  const {
    handleSubmit,
    control,
    formState: { errors },
    register,
  } = useForm<InferType<typeof headingFormSchema>>({
    resolver: yupResolver(headingFormSchema),
    defaultValues: { ...headingData } as InferType<typeof headingFormSchema>,
  });
  const dispatch = useAppDispatch();

  const title = useWatch({ control, name: "title" });

  const onSubmit = (data: InferType<typeof headingFormSchema>) => {
    dispatch(
      addObjectStepActions.setForm({
        screen: 5,
        step: 0,
        data,
      })
    );
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
                render={({ field: { onChange, ...otherField } }) => {
                  return (
                    <Input
                      onChange={(e) => {
                        if (e.target.value.length <= 70) {
                          onChange(e.target.value);
                        }
                      }}
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
