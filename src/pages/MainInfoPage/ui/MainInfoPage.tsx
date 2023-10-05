import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Select,
  Stack,
} from "@chakra-ui/react";
import { useGetInternetAccessQuery } from "@entites/CommonReference";
import { FormCard } from "@shared/ui/FormCard";

export const MainInfoPage = () => {
  const {} = useGetInternetAccessQuery();
  
  return (
    <Box as="form">
      <Stack>
        <FormCard title="Название глэмпинга">
          <FormControl>
            <Input placeholder="Введите название " />

            <FormHelperText>
              Отель «wqdwdqwdwqdwqdqw» — это название будут видеть гости при
              поиске (если у вас нет названия, можете указать название улицы,
              номер дома)
            </FormHelperText>
          </FormControl>
        </FormCard>
        <FormCard title="Категория">
          <FormControl>
            <FormHelperText>
              Укажите количество звёзд, присвоенных вашему объекту по Системе
              классификации гостиниц и иных средств размещения.
            </FormHelperText>
            <FormLabel>Звёздность</FormLabel>
            <Select></Select>
          </FormControl>
        </FormCard>
        <FormCard title="Интернет">
          <FormControl>
            <FormLabel>
              Услуга, на которую чаще всего обращают внимание гости при поиске
              жилья
            </FormLabel>
          </FormControl>
        </FormCard>
      </Stack>
    </Box>
  );
};
