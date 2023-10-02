import {
  Alert,
  AlertIcon,
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { FormCard } from "./FormCard";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { postingRulesSchema } from "../model/schemas/postingRulesSchema";
import { InferType } from "yup";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { getForm } from "../model/selectors";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { addObjectAction } from "..";
interface PostingRulesFormProps {
  onChangeScreen: (screen: number) => void;
  onChangeStep: (step: number) => void;
}

export const PostingRulesForm: FC<PostingRulesFormProps> = (props) => {
  const { onChangeScreen, onChangeStep } = props;
  const postingData = useAppSelector(getForm(1, 1));
  const dispatch = useAppDispatch();
  const { control, handleSubmit, register } = useForm<
    InferType<typeof postingRulesSchema>
  >({
    resolver: yupResolver(postingRulesSchema),
    defaultValues: { ...postingData } as InferType<typeof postingRulesSchema>,
  });
  const possibleWithChildren = useWatch({
    control,
    name: "possibleWithChildren",
  });

  const onSubmit = (data: InferType<typeof postingRulesSchema>) => {
    if (!possibleWithChildren) {
      delete data.age;
    }
    dispatch(
      addObjectAction.setForm({
        data,
        screen: 1,
        step: 1,
      })
    );
    onChangeScreen(2);
  };

  const onPrev = () => {
    onChangeStep(0);
    onChangeScreen(6);
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <FormCard title="Правила размещения">
          <Alert status="info" variant="subtle">
            <AlertIcon />
            <Text fontSize={"small"}>
              Правила проживания можно будет всегда настроить после публикации
              объявления на странице «Настройки бронирования».
            </Text>
          </Alert>
          <Stack spacing={2} mt={6}>
            <FormControl>
              <HStack justifyContent={"space-between"}>
                <FormLabel>можно с детьми</FormLabel>
                <Switch
                  {...register("possibleWithChildren")}
                  colorScheme="red"
                />
              </HStack>
            </FormControl>
            {possibleWithChildren && (
              <FormControl>
                <HStack alignItems={"center"} justifyContent={"space-between"}>
                  <FormLabel>возраст</FormLabel>
                  <Select {...register("age")}>
                    <option value="0">дети любого возраста</option>
                    <option value="1">с 1 года</option>
                    <option value="2">с 2 лет</option>
                    <option value="3">с 3 лет</option>
                    <option value="4">с 4 лет</option>
                    <option value="5">с 5 лет</option>
                    <option value="6">с 6 лет</option>
                    <option value="7">с 7 лет</option>
                    <option value="8">с 8 лет</option>
                    <option value="9">с 9 лет</option>
                    <option value="10">с 10 лет</option>
                    <option value="11">с 11 лет</option>
                    <option value="12">с 12 лет</option>
                    <option value="13">с 13 лет</option>
                    <option value="14">с 14 лет</option>
                    <option value="15">с 15 лет</option>
                    <option value="16">с 16 лет</option>
                    <option value="17">с 17 лет</option>
                  </Select>
                </HStack>
              </FormControl>
            )}
            <FormControl>
              <HStack justifyContent={"space-between"}>
                <FormLabel>можно с животными</FormLabel>
                <Switch {...register("petsAllowed")} colorScheme="red" />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack justifyContent={"space-between"}>
                <FormLabel>курение разрешено</FormLabel>
                <Switch {...register("smokingAllowed")} colorScheme="red" />
              </HStack>
            </FormControl>
            <FormControl>
              <HStack justifyContent={"space-between"}>
                <FormLabel>вечеринки разрешены</FormLabel>
                <Switch {...register("partiesAreAllowed")} colorScheme="red" />
              </HStack>
            </FormControl>
          </Stack>
        </FormCard>
        <FormCard>
          <HStack w="full" justifyContent={"space-between"} px={2}>
            <Button onClick={onPrev} colorScheme="gray" variant="outline">
              Назад
            </Button>
            <Button colorScheme="red" type="submit">
              Продолжить
            </Button>
          </HStack>
        </FormCard>
      </Stack>
    </Box>
  );
};
