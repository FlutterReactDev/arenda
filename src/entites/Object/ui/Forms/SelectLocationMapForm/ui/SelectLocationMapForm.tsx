import { Box, Button, Center, HStack, Stack, Text } from "@chakra-ui/react";

import { SelectMap } from "@entites/Map";
import { FC } from "react";

import { useGetObjectByCoordinatesQuery } from "@entites/Map/model/api";
import { FormCard } from "@shared/ui/FormCard";

import { FormContainer } from "@entites/Object/ui/FormContainer";

import { FormProps } from "@entites/Object/model/types/objectTypes";
import { SelectMapType } from "@entites/Object/model/schemas/selectMapSchema";
import { LatLong } from "@entites/Map/model/types";

interface SelectLocationMapFormProps {
  stateValue: SelectMapType;
  changeState: (data: SelectMapType) => void;
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
    stateValue,
    changeState,
    city,
    country,
    house,
    region,
    streetName,
    viewpoint1,
    viewpoint2,
  } = props;

  const { data, isFetching, isSuccess } = useGetObjectByCoordinatesQuery(
    stateValue.coordinates,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const onSubmit = () => {
    changeState &&
      changeState({
        coordinates: stateValue?.coordinates,
        fullAddress: data?.result?.items[0].full_name,
      });

    onNext && onNext();
  };

  const onPrevHandler = () => {
    onPrev && onPrev();

    changeState &&
      changeState({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        coordinates: undefined,
      });
  };

  return (
    <Stack spacing={4}>
      <FormContainer>
        <FormCard title="Карта">
          <Text>
            Это местоположение гости увидят на нашем сайте. Если у вас появилось
            несколько маркеров, выберите тот который точно указывает ваш адресс
          </Text>

          <Box h={"350px"} mt={5}>
            <SelectMap
              country={country}
              city={city}
              region={region}
              streetName={streetName}
              house={house}
              value={stateValue?.coordinates}
              onChange={(coordinates: LatLong) => {
                changeState &&
                  changeState({
                    coordinates,
                    fullAddress: data?.result?.items[0].full_name,
                  });
              }}
              viewpoint1={viewpoint1}
              viewpoint2={viewpoint2}
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
              <Button
                colorScheme="red"
                isDisabled={!stateValue || isFetching || !isSuccess}
                onClick={onSubmit}
              >
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
