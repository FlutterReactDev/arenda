import { Box, Button, Center, HStack, Stack, Text } from "@chakra-ui/react";
import { FormCard } from "./FormCard";
import { FC } from "react";
import { SelectMap } from "@entites/Map";

import { selectMapSchema } from "../model/schemas/selectMapSchema";
import { InferType } from "yup";

import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { addObjectAction } from "../model/addObjectSlice";
import { firstFormSchema } from "../model/schemas/firstFormSchema";
import { useGetObjectByCoordinatesQuery } from "@entites/Map/model/api";
interface SearchLocationMapProps {
  onChangeScreen: (index: number) => void;
}
export const SearchLocationMap: FC<SearchLocationMapProps> = (props) => {
  const { onChangeScreen } = props;
  const dispatch = useAppDispatch();
  const forms = useAppSelector((state) => state.addOBject.forms);
  const { city, country, region } = useAppSelector(
    (state) => state.addObjectForm
  );
  const { streetName, house } = forms.filter(
    (form) => form.screen == 1 && form.step == 0
  )[0].data as InferType<typeof firstFormSchema>;

  const { coordinates } = forms.filter(
    (form) => form.screen == 2 && form.step == 0
  )[0].data as InferType<typeof selectMapSchema>;
  const { data, isFetching, isSuccess } = useGetObjectByCoordinatesQuery(
    coordinates,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const onSubmit = () => {
    dispatch(
      addObjectAction.setForm({
        screen: 2,
        step: 0,
        data: {
          coordinates,
          addressName: data?.result?.items[0].full_name,
        },
      })
    );
    onChangeScreen(3);
  };

  const onPrev = () => {
    onChangeScreen(1);
    dispatch(
      addObjectAction.setForm({
        screen: 2,
        step: 0,
        data: {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          coordinates: undefined,
        },
      })
    );
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={2}>
        <FormCard title="Карта">
          <Text>
            Это местоположение гости увидят на нашем сайте. Если у вас появилось
            несколько маркеров, выберите тот который точно указывает ваш адресс
          </Text>

          <Box h={"350px"} mt={5}>
            <SelectMap
              address={`${country?.label} ${region?.label}, ${city?.label}, ${streetName}, ${house}`}
              value={coordinates}
              onChange={(coordinates: number[]) => {
                dispatch(
                  addObjectAction.setForm({
                    screen: 2,
                    step: 0,
                    data: {
                      coordinates,
                      addressName: data?.result?.items[0].full_name,
                    },
                  })
                );
              }}
            />
          </Box>
        </FormCard>
        <FormCard>
          <Center w="full">
            <HStack w="full" justifyContent={"space-between"} px={2}>
              <Button onClick={onPrev} colorScheme="gray" variant="outline">
                Назад
              </Button>
              <Button
                colorScheme="red"
                isDisabled={!coordinates || isFetching || !isSuccess}
                onClick={onSubmit}
              >
                Продолжить
              </Button>
            </HStack>
          </Center>
        </FormCard>
      </Stack>
    </Stack>
  );
};
