import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from "@chakra-ui/react";
import { RoomCategories } from "@entites/CommonReference/model/types";
import { FormProps } from "@entites/Object";
import {
  RoomCategoryType,
  roomCategorySchema,
} from "@entites/Object/model/schemas/roomCategorySchema";
import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormCard } from "@shared/ui/FormCard";
import { FC } from "react";
import { useForm } from "react-hook-form";
interface RoomCategoryFormProps {
  value: RoomCategoryType;
  onChange: (value: RoomCategoryType) => void;
  roomCategories: RoomCategories[];
}
const RoomCategoryForm: FC<FormProps & RoomCategoryFormProps> = (props) => {
  const { onChange, value, onNext, roomCategories, navigation } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RoomCategoryType>({
    resolver: yupResolver(roomCategorySchema),
    defaultValues: {
      ...value,
      categoryType: value.categoryType || undefined,
    },
  });

  const onSubmit = (data: RoomCategoryType) => {
    onChange(data);
    onNext && onNext();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormCard title="Укажите тип комнаты">
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
          </FormContainer>
        </FormCard>
        {navigation}
      </FormContainer>
    </form>
  );
};

export default RoomCategoryForm;
