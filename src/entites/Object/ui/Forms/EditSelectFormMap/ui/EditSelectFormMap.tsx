import { Box, Stack, Text } from "@chakra-ui/react";

import { SelectMap } from "@entites/Map";
import { FC } from "react";

import { FormCard } from "@shared/ui/FormCard";

import { FormContainer } from "@entites/Object/ui/FormContainer";

import {
  SelectMapType,
  selectMapSchema,
} from "@entites/Object/model/schemas/selectMapSchema";
import { FormProps } from "@entites/Object/model/types/objectTypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";

interface EditSelectFormMapProps {
  value: SelectMapType;
  onChange?: (data: SelectMapType) => void;
}
export const EditSelectFormMap: FC<FormProps & EditSelectFormMapProps> = (
  props
) => {
  const { onNext, onChange, value, navigation } = props;

  const { control, handleSubmit } = useForm<SelectMapType>({
    resolver: yupResolver(selectMapSchema),
    defaultValues: value,
  });

  const onSubmit = (data: SelectMapType) => {
    onChange && onChange(data);

    onNext && onNext();
  };

  return (
    <Stack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <Text>
          Это местоположение гости увидят на нашем сайте. Если у вас появилось
          несколько маркеров, выберите тот который точно указывает ваш адресс
        </Text>

        <Box h={"350px"} mt={5}>
          <Controller
            control={control}
            name="selectMap"
            render={({ field: { onChange, value } }) => {
              return (
                <SelectMap
                  value={{
                    selectMap: value,
                  }}
                  onChange={({ selectMap: { coordinates, fullAddress } }) => {
                    onChange({
                      coordinates,
                      fullAddress,
                    });
                  }}
                  city="Бостери"
                  country="Кыргызстан"
                  region="Ыссык-Кол"
                  streetName={"Мамытова"}
                  house={"22а"}
                  viewpoint1={{
                    id: 1,
                    latitude: 42.646977948,
                    longitude: 77.175349515,
                  }}
                  viewpoint2={{
                    id: 2,
                    latitude: 42.643640622,
                    longitude: 77.176861897,
                  }}
                />
              );
            }}
          />
        </Box>

        <FormCard>{navigation}</FormCard>
      </FormContainer>
    </Stack>
  );
};
