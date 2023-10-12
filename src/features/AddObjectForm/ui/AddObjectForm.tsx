import { useEffect, useMemo } from "react";

import { GiBunkBeds, GiSpookyHouse } from "react-icons/gi";
import { BiBuildingHouse } from "react-icons/bi";
import { BsDoorOpen } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import { ImEarth } from "react-icons/im";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  Box,
  HStack,
  Icon,
  SlideFade,
  Center,
  Stack,
  Spinner,
  Button,
  SimpleGrid,
  Skeleton,
} from "@chakra-ui/react";
import { ObjectSelectList } from "@entites/Object";
import { Option, SelectSearch } from "@shared/ui/SelectSearch";
import { useAppSelector } from "@shared/utils/hooks/useAppSelecter";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { addObjectSliceActions } from "..";
import { ObjectValue } from "../model/types";
import {
  useGetCityQuery,
  useGetCountryQuery,
  useGetRegionQuery,
} from "@entites/Location";
import { Link } from "react-router-dom";

// import { useGetByIdQuery } from "@entites/ObjectTypeProperty";

export const AddObjectForm = () => {
  const data = useMemo(
    () => [
      {
        name: "номера, спальные места",
        subtitle: "в отеле, гостевом доме или хостеле",
        description:
          "Гостям будет предоставлен номер в отеле, гостевом доме или спальное место в хостеле",
        icon: GiBunkBeds,
        id: ObjectValue.ROOM,
        types: [
          {
            value: "Отель",
            id: 1,
          },
          {
            value: "Хостел",
            id: 2,
          },
          {
            value: "Пансионат",
            id: 3,
          },
          {
            value: "Гостиница",
            id: 4,
          },
          {
            value: "Мини-гостиница",
            id: 5,
          },
          {
            value: "Отель эконом-класса",
            id: 6,
          },
          {
            value: "Санаторий",
            id: 7,
          },
          {
            value: "Гостевой дом",
            id: 8,
          },
          {
            value: "Капсульный отель",
            id: 9,
          },
          {
            value: "Апартамент",
            id: 10,
          },
          {
            value: "База отдыха",
            id: 12,
          },
          {
            value: "Глэмпинг",
            id: 13,
          },
        ],
      },
      {
        name: "квартиры, апартаменты",
        subtitle: "целиком",
        id: ObjectValue.APARTAMENTS,
        icon: BiBuildingHouse,
        description:
          "Гости снимут квартиру целиком. Вместе со всеми удобствами и кухней",
        types: [
          {
            value: "Квартира",
            id: 14,
          },
          {
            value: "Апартамент",
            id: 15,
          },
          {
            value: "Студия",
            id: 16,
          },
        ],
      },
      {
        name: "дома, коттеджи",
        subtitle: "целиком",
        id: ObjectValue.HOUSES,
        icon: GiSpookyHouse,
        description: "Гости снимут дом целиком. Вместе с пристройками",
        types: [
          {
            value: "Коттедж",
            id: 17,
          },

          {
            value: "Эллинг",
            id: 18,
          },
          {
            value: "Гестхаус",
            id: 19,
          },
          {
            value: "Особняк",
            id: 20,
          },
          {
            value: "Дом",
            id: 21,
          },
          {
            value: "Деревенский дом",
            id: 22,
          },
          {
            value: "Шале",
            id: 23,
          },
          {
            value: "Яхта",
            id: 24,
          },
          {
            value: "Вилла",
            id: 25,
          },
          {
            value: "Таунхаус",
            id: 26,
          },
          {
            value: "Бунгало",
            id: 27,
          },
          {
            value: "Дача",
            id: 28,
          },
          {
            value: "Часть дома с отдельным входом",
            id: 29,
          },
          {
            value: "Часть дома с отдельным входом",
            id: 30,
          },
          {
            value: "Целый этаж в доме",
            id: 31,
          },
          {
            value: "Дом на колёсах",
            id: 32,
          },
        ],
      },
      {
        name: "отдельные комнаты",
        subtitle: "целиком",
        id: ObjectValue.SEPARATE_ROOMS,
        icon: BsDoorOpen,
        description: "Гости снимут отдельную комнату со спальным местом",
        types: [
          {
            value: "Комната в квартире",
            id: 33,
          },
          {
            value: "Комната в частном доме",
            id: 34,
          },
          {
            value: "Комната в коттедже",
            id: 35,
          },
        ],
      },
    ],
    []
  );

  const { city, objectType, country, object, region } = useAppSelector(
    (state) => state.addObjectForm
  );
  //ObjectsType requests

  // const {
  //   data: objectPropertyType,
  //   isFetching: objectPropertyTypeIsLoading,
  //   isSuccess: objectPropertyTypeIsSuccess,
  // } = useGetByIdQuery(object, {
  //   refetchOnMountOrArgChange: true,
  // });

  //Location reguests
  const {
    data: countryData,
    isLoading: countryLoading,
    isSuccess: countryIsSuccess,
  } = useGetCountryQuery(null);
  const {
    data: regionData,

    isSuccess: regionIsSuccess,
    isFetching: regionIsFetching,
  } = useGetRegionQuery(country?.value as number, {
    skip: country == undefined,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: cityData,

    isSuccess: cityIsSuccess,
    isFetching: cityIsFetching,
  } = useGetCityQuery(region?.value as number, {
    skip: region == undefined,
    refetchOnMountOrArgChange: true,
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(addObjectSliceActions.setObjectType(data[object].types[0].id));
  }, [data, dispatch, object]);

  const onChange = (nextValue: string) => {
    dispatch(addObjectSliceActions.setObjectType(Number(nextValue)));
  };
  const onCountrySelect = (option: Option) => {
    dispatch(addObjectSliceActions.setCountry(option));
    dispatch(addObjectSliceActions.setRegion(undefined));
  };
  const onRegionSelect = (option: Option) => {
    dispatch(addObjectSliceActions.setRegion(option));
    dispatch(addObjectSliceActions.setCity(undefined));
  };
  const onCitySelect = (option: Option) => {
    dispatch(addObjectSliceActions.setCity(option));
  };

  const isOneFieldIsEmpty =
    city == undefined ||
    objectType == undefined ||
    country == undefined ||
    object == undefined ||
    region == undefined;

  return (
    <Box>
      <Text fontWeight={"medium"} mb={2}>
        Что будете сдавать?
      </Text>
      <Tabs
        onChange={(index: ObjectValue) => {
          dispatch(addObjectSliceActions.setObject(index));
        }}
        variant={"unstyled"}
        px={0}
        index={object}
      >
        <TabList gap={6}>
          <SimpleGrid columns={[1, 2, 2, 4]} spacing={6}>
            {data.map((object) => {
              return (
                <Box key={object.id} h={"full"}>
                  <Tab
                    border={"1px solid"}
                    borderColor={"transparent"}
                    borderRadius={"lg"}
                    bg={"white"}
                    _selected={{
                      borderColor: "red.600",
                    }}
                    w={"full"}
                    h={"20"}
                    key={object.id}
                    boxShadow={"lg"}
                  >
                    <HStack justifyContent={"center"} alignItems={"center"}>
                      <Icon as={object.icon} fontSize={"4xl"} />
                      <Box textAlign={"left"}>
                        <Text fontSize={"16px"}>{object.name}</Text>
                        <Text fontSize={"14px"}>{object.subtitle}</Text>
                      </Box>
                    </HStack>
                  </Tab>
                  <Text color={"gray.600"} mt={2} fontSize={"12px"}>
                    {object.description}
                  </Text>
                </Box>
              );
            })}
          </SimpleGrid>
        </TabList>
        <Text mt={2} fontWeight={"medium"}>
          Выберите заголовок объявления:
        </Text>
        <TabPanels>
          {data.map((tab, index: ObjectValue) => {
            return (
              <TabPanel px={0} key={tab.id}>
                <SlideFade in={object == index} offsetY={"60px"}>
                  <ObjectSelectList
                    objectTypes={tab.types}
                    onChange={onChange}
                    value={objectType}
                  />
                </SlideFade>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
      <Box>
        <Text fontWeight={"medium"}>Укажите место:</Text>
        <Center w={"full"} mt={4}>
          <Stack w={"full"} spacing={4} alignItems={"center"}>
            <Box w="full" maxW="xl" justifyContent={"space-between"}>
              {countryIsSuccess && (
                <>
                  <Text mb={2}>Страна</Text>
                  <SelectSearch
                    value={country?.value}
                    onChange={onCountrySelect}
                    options={countryData?.map(({ label, id }) => ({
                      label,
                      value: id,
                    }))}
                    placeholder="Выберите страну"
                    icon={ImEarth}
                  />
                </>
              )}
              {countryLoading && (
                <Center>
                  <Spinner color="red.600" size={"xl"} />
                </Center>
              )}
            </Box>

            <Box w="full" maxW="xl" justifyContent={"space-between"}>
              {country && (
                <Skeleton
                  rounded={"lg"}
                  isLoaded={regionIsSuccess && !regionIsFetching}
                  h={regionIsSuccess && !regionIsFetching ? "auto" : "40px"}
                >
                  <Text mb={2}>Регион</Text>
                  <SelectSearch
                    value={region?.value}
                    onChange={onRegionSelect}
                    options={regionData?.map(({ label, id }) => ({
                      label,
                      value: id,
                    }))}
                    placeholder="Выберите регион"
                    icon={CiLocationOn}
                  />
                </Skeleton>
              )}
            </Box>
            <Box w="full" maxW="xl" justifyContent={"space-between"}>
              {region && (
                <Skeleton
                  rounded={"lg"}
                  isLoaded={cityIsSuccess && !cityIsFetching && !!region}
                  h={
                    cityIsSuccess && !cityIsFetching && region ? "auto" : "40px"
                  }
                >
                  <Text mb={2}>Город</Text>
                  <SelectSearch
                    value={city?.value}
                    onChange={onCitySelect}
                    options={cityData?.map(({ label, id }) => ({
                      label,
                      value: id,
                    }))}
                    placeholder="Выберите город"
                    icon={ImEarth}
                  />
                </Skeleton>
              )}
            </Box>
            {isOneFieldIsEmpty && (
              <Button
                colorScheme="red"
                isDisabled={
                  city == undefined ||
                  objectType == undefined ||
                  country == undefined ||
                  object == undefined ||
                  region == undefined
                }
              >
                Далее
              </Button>
            )}
            {city != undefined &&
              objectType != undefined &&
              country != undefined &&
              object != undefined &&
              region != undefined && (
                <Button
                  colorScheme="red"
                  isDisabled={
                    city == undefined ||
                    objectType == undefined ||
                    country == undefined ||
                    object == undefined ||
                    region == undefined
                  }
                  as={Link}
                  to={
                    object == ObjectValue.ROOM
                      ? "/add-hotel"
                      : "/add-object-info"
                  }
                >
                  Далее
                </Button>
              )}
          </Stack>
        </Center>
      </Box>
    </Box>
  );
};
