import { Box, Button, Center, HStack, Stack, Text } from "@chakra-ui/react";

import { FC } from "react";
import { SelectMap } from "@entites/Map";

import { InferType } from "yup";

import { useGetObjectByCoordinatesQuery } from "@entites/Map/model/api";
import { FormCard } from "@shared/ui/FormCard";

import { FormProps } from "@entites/Object/model/types";
import { FormContainer } from "@entites/Object/ui/FormContainer";

import { selectMapSchema } from "@entites/Object/model/schemas/selectMapSchema";

interface SelectLocationMapFormProps {
  stateValue?: InferType<typeof selectMapSchema>;
  changeState?: (data: InferType<typeof selectMapSchema>) => void;
  city?: string;
  country?: string;
  region?: string;
  streetName: string;
  house: string;
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
  } = props;

  const { data, isFetching, isSuccess } = useGetObjectByCoordinatesQuery(
    stateValue?.coordinates as number[],
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const onSubmit = () => {
    changeState &&
      changeState({
        coordinates: stateValue?.coordinates as number[],
        addressName: data?.result?.items[0].full_name,
      });
    // dispatch(
    //   addObjectStepActions.setForm({
    //     screen: 1,
    //     step: 0,
    //     data: {},
    //   })
    // );
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
    // dispatch(
    // //   addObjectStepActions.setForm({
    // //     screen: 1,
    // //     step: 0,
    // //     data: {

    // //     },
    // //   })
    // );
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
              address={`${country} ${region}, ${city}, ${streetName}, ${house}`}
              value={stateValue?.coordinates as number[]}
              onChange={(coordinates: number[]) => {
                changeState &&
                  changeState({
                    coordinates,
                    addressName: data?.result?.items[0].full_name,
                  });
                // dispatch(
                //   addObjectStepActions.setForm({
                //     screen: 1,
                //     step: 0,
                //     data: {
                //
                //     },
                //   })
                // );
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
