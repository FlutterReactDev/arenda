import {
  Alert,
  AlertIcon,
  Box,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";

import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  PostingRulesType,
  postingRulesSchema,
} from "@entites/Object/model/schemas/postingRulesSchema";
import { FormProps } from "@entites/Object/model/types/objectTypes";
import { FormCard } from "@shared/ui/FormCard";
import { FC } from "react";
import { useForm, useWatch } from "react-hook-form";

interface PostingRulesFormProps {
  value: PostingRulesType;
  onChange: (value: PostingRulesType) => void;
}
const PostingRulesForm: FC<FormProps & PostingRulesFormProps> = (props) => {
  const { navigation, onNext, onChange, value } = props;

  const { control, handleSubmit, register } = useForm<PostingRulesType>({
    resolver: yupResolver(postingRulesSchema),
    defaultValues: value,
  });

  const possibleWithChildren = useWatch({
    control,
    name: "possibleWithChildren",
  });

  const onSubmit = (data: PostingRulesType) => {
    onChange(data);
    onNext && onNext();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
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
                  <Select {...register("childsAge")}>
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
                <Switch {...register("partiesAllowed")} colorScheme="red" />
              </HStack>
            </FormControl>
          </Stack>
        </FormCard>
        {navigation}
      </FormContainer>
    </Box>
  );
};
export default PostingRulesForm;
