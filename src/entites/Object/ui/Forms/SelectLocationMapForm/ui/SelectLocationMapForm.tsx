import { Box, Button, Center, HStack, Stack, Text } from "@chakra-ui/react";

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

interface SelectLocationMapFormProps {
  value: SelectMapType;
  onChange: (data: SelectMapType) => void;
  city: string;
  country: string;
  region: string;
  streetName: string;
  house: string;
  viewpoint1: {
    id: number;
    latitude: number;
    longitude: number;
  };
  viewpoint2: {
    id: number;
    latitude: number;
    longitude: number;
  };
}
const SelectLocationMapForm: FC<FormProps & SelectLocationMapFormProps> = (
  props
) => {
  const {
    onNext,
    onPrev,
    onChange,
    value,
    city,
    country,
    house,
    region,
    streetName,
    viewpoint1,
    viewpoint2,
  } = props;

  const {
    control,
    formState: { isValid },

    reset,
    handleSubmit,
  } = useForm<SelectMapType>({
    resolver: yupResolver(selectMapSchema),
    defaultValues: value,
  });
  const onSubmit = (data: SelectMapType) => {
    onChange(data);

    onNext && onNext();
  };

  const onPrevHandler = () => {
    reset();
    onPrev && onPrev();
  };

  return (
    <Stack as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
      <FormContainer>
        <FormCard title="Карта">
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
                    country={country}
                    city={city}
                    region={region}
                    streetName={streetName}
                    house={house}
                    value={{
                      selectMap: value,
                    }}
                    onChange={({ selectMap: { coordinates, fullAddress } }) => {
                      onChange({
                        coordinates,
                        fullAddress,
                      });
                    }}
                    viewpoint1={viewpoint1}
                    viewpoint2={viewpoint2}
                  />
                );
              }}
            />
          </Box>
        </FormCard>
        <FormCard>
          <Center w="full">
            <HStack w="full" justifyContent={"space-between"} px={2}>
              <Button
                onClick={onPrevHandler}
                colorScheme="gray"
                variant="outline"
              >
                Назад
              </Button>
              <Button colorScheme="red" isDisabled={!isValid} type="submit">
                Продолжить
              </Button>
            </HStack>
          </Center>
        </FormCard>
      </FormContainer>
    </Stack>
  );
};

export default SelectLocationMapForm;
