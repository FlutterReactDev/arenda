import {
  Box,
  FormControl,
  FormLabel,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";

import { FormContainer } from "@entites/Object/ui/FormContainer";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormCard } from "@shared/ui/FormCard";

import { FC } from "react";
import { useForm } from "react-hook-form";

import {
  CheckInCheckOutType,
  checkInCheckOutSchema,
} from "@entites/Object/model/schemas/checkInCheckOutSchema";
import { FormProps } from "@entites/Object/model/types/objectTypes";
interface CheckInCheckOutForm {
  value: CheckInCheckOutType;
  onChange: (value: CheckInCheckOutType) => void;
}
const CheckInCheckOutForm: FC<FormProps & CheckInCheckOutForm> = (props) => {
  const { navigation, onNext, value, onChange } = props;

  const { handleSubmit, register } = useForm<CheckInCheckOutType>({
    resolver: yupResolver(checkInCheckOutSchema),
    defaultValues: value,
  });

  const onSubmit = (data: CheckInCheckOutType) => {
    onChange(data);
    onNext && onNext();
  };

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormCard title="Заезд / отъезд">
          <Text fontSize={"lg"}>
            В какое время происходит заселение и выселение?
          </Text>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>расчетное время заезда</FormLabel>
              <Select {...register("checkInAfter")}>
                <option value="1:00">с 1:00</option>
                <option value="2:00">с 2:00</option>
                <option value="3:00">с 3:00</option>
                <option value="4:00">с 4:00</option>
                <option value="5:00">с 5:00</option>
                <option value="6:00">с 6:00</option>
                <option value="7:00">с 7:00</option>
                <option value="8:00">с 8:00</option>
                <option value="9:00">с 9:00</option>
                <option value="10:00">с 10:00</option>
                <option value="11:00">с 11:00</option>
                <option value="12:00">с 12:00</option>
                <option value="13:00">с 13:00</option>
                <option value="14:00">с 14:00</option>
                <option value="15:00">с 15:00</option>
                <option value="16:00">с 16:00</option>
                <option value="17:00">с 17:00</option>
                <option value="18:00">с 18:00</option>
                <option value="19:00">с 19:00</option>
                <option value="20:00">с 20:00</option>
                <option value="21:00">с 21:00</option>
                <option value="22:00">с 22:00</option>
                <option value="23:00">с 23:00</option>
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>расчетное время отъезда</FormLabel>
              <Select {...register("checkOutAfter")}>
                <option value="1:00">до 1:00</option>
                <option value="2:00">до 2:00</option>
                <option value="3:00">до 3:00</option>
                <option value="4:00">до 4:00</option>
                <option value="5:00">до 5:00</option>
                <option value="6:00">до 6:00</option>
                <option value="7:00">до 7:00</option>
                <option value="8:00">до 8:00</option>
                <option value="9:00">до 9:00</option>
                <option value="10:00">до 10:00</option>
                <option value="11:00">до 11:00</option>
                <option value="12:00">до 12:00</option>
                <option value="13:00">до 13:00</option>
                <option value="14:00">до 14:00</option>
                <option value="15:00">до 15:00</option>
                <option value="16:00">до 16:00</option>
                <option value="17:00">до 17:00</option>
                <option value="18:00">до 18:00</option>
                <option value="19:00">до 19:00</option>
                <option value="20:00">до 20:00</option>
                <option value="21:00">до 21:00</option>
                <option value="22:00">до 22:00</option>
                <option value="23:00">до 23:00</option>
              </Select>
            </FormControl>
          </Stack>
        </FormCard>
        {navigation}
      </FormContainer>
    </Box>
  );
};

export default CheckInCheckOutForm;
