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
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useWatch, Controller } from "react-hook-form";
import { headingFormSchema } from "../model/schemas/headingFormSchema";
import { InferType } from "yup";
import { FormCard } from "./FormCard";
import { FC } from "react";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { addObjectAction } from "..";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getForm } from "../model/selectors";
interface HeadingFormProps {
  onChangeScreen: (screen: number) => void;
  onChangeStep: (step: number) => void;
}
export const HeadingForm: FC<HeadingFormProps> = (props) => {
  const { onChangeScreen, onChangeStep } = props;
  const headingData = useAppSelector(getForm(6, 0));
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
      addObjectAction.setForm({
        screen: 6,
        step: 0,
        data,
      })
    );
    onChangeStep(1);
    onChangeScreen(1);
  };

  const onPrev = () => {
    onChangeStep(0);
    onChangeScreen(5);
  };
  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
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
