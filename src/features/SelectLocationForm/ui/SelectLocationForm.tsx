import { useEffect, useState } from "react";

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
import { SelectSearch } from "@shared/ui/SelectSearch";

import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";
import { addObjectActions } from "..";

import {
  useGetCityQuery,
  useGetCountryQuery,
  useGetRegionQuery,
} from "@entites/Location";

import { useGetAllObjectTypesQuery } from "@entites/ObjectType";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  SelectLocationSchema,
  SelectLocationSchemaType,
} from "../model/schema";

import {
  ObjectTypePropertyTabPanel,
  useGetByIdQuery,
} from "@entites/ObjectTypeProperty";
import { useNavigate } from "react-router-dom";
import { OBJECT_TYPE } from "@shared/constants/objectType";
import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";

export const SelectLocationForm = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const { control, handleSubmit, setValue, watch } =
    useForm<SelectLocationSchemaType>({
      resolver: yupResolver(SelectLocationSchema),
    });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const objectType = watch("objectType");
  const objectTypeProperty = watch("objectTypeProperty");
  const country = watch("country");
  const region = watch("region");
  const city = watch("city");
  const { data: objectTypes, isSuccess: objectTypesIsSuccess } =
    useGetAllObjectTypesQuery("");

  const {
    data: objectPropertyTypes,
    isFetching: objectPropertyTypesIsLoading,
    isSuccess: objectPropertyTypesIsSuccess,
  } = useGetByIdQuery(objectType, {
    refetchOnMountOrArgChange: true,
    skip: objectType == undefined,
  });
  useEffect(() => {
    if (objectTypesIsSuccess) {
      setValue("objectType", objectTypes[0].id);
    }
  }, [objectTypes, objectTypesIsSuccess, setValue]);
  useEffect(() => {
    if (objectPropertyTypesIsSuccess && !objectPropertyTypesIsLoading) {
      setValue("objectTypeProperty", objectPropertyTypes[0]);
    }
  }, [
    objectPropertyTypes,
    objectPropertyTypesIsLoading,
    objectPropertyTypesIsSuccess,
    setValue,
  ]);
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
  } = useGetRegionQuery(country?.id, {
    skip: country == undefined,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: cityData,

    isSuccess: cityIsSuccess,
    isFetching: cityIsFetching,
  } = useGetCityQuery(region?.id, {
    skip: region == undefined,
    refetchOnMountOrArgChange: true,
  });

  const isOneFieldIsEmpty =
    city == undefined ||
    objectType == undefined ||
    country == undefined ||
    objectTypeProperty == undefined ||
    region == undefined;
  const onSumbit = (data: SelectLocationSchemaType) => {
    dispatch(addObjectActions.setLocationData(data));
    console.log(objectTypes?.filter((object) => object.id == objectType)[0]);

    if (
      objectTypes?.filter((object) => object.id == objectType)[0].objectType ==
      OBJECT_TYPE.HOTEL
    ) {
      navigate(RouteName.ADD_HOTEL_PAGE);
    } else {
      navigate(RouteName.ADD_OBJECT_INFO);
    }
  };
  return (
    <Box>
      <Text fontWeight={"medium"} mb={2}>
        Что будете сдавать?
      </Text>
      <Box as="form" onSubmit={handleSubmit(onSumbit)}>
        {objectTypes && (
          <Controller
            control={control}
            name={"objectType"}
            render={({ field: { onChange } }) => {
              return (
                <Tabs
                  onChange={(index) => {
                    onChange(objectTypes[index].id);
                    setTabIndex(index);
                  }}
                  variant={"unstyled"}
                  px={0}
                  index={tabIndex}
                >
                  <TabList gap={6} w={"full"}>
                    <SimpleGrid columns={[1, 2, 2, 4]} spacing={6} w={"full"}>
                      {objectTypes &&
                        objectTypes.map((object) => {
                          return (
                            <Box key={object.id} h={"full"} w={"full"}>
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
                                <HStack
                                  justifyContent={"center"}
                                  alignItems={"center"}
                                >
                                  {object.iconName == "bed" && (
                                    <Icon as={GiBunkBeds} fontSize={"4xl"} />
                                  )}
                                  {object.iconName == "apartment" && (
                                    <Icon
                                      as={BiBuildingHouse}
                                      fontSize={"4xl"}
                                    />
                                  )}
                                  {object.iconName == "house" && (
                                    <Icon as={GiSpookyHouse} fontSize={"4xl"} />
                                  )}
                                  {object.iconName == "room" && (
                                    <Icon as={BsDoorOpen} fontSize={"4xl"} />
                                  )}
                                  <Box textAlign={"left"}>
                                    <Text fontSize={"16px"}>{object.name}</Text>
                                    <Text fontSize={"14px"}>
                                      {object.description}
                                    </Text>
                                  </Box>
                                </HStack>
                              </Tab>
                              <Text color={"gray.600"} mt={2} fontSize={"12px"}>
                                {object.info}
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
                    {objectTypes.map((objectType, index) => {
                      return (
                        <ObjectTypePropertyTabPanel
                          index={index}
                          tabIndex={tabIndex}
                          key={objectType.id}
                        >
                          {objectPropertyTypes && (
                            <Controller
                              control={control}
                              name="objectTypeProperty"
                              render={({ field: { value, onChange } }) => {
                                return (
                                  <ObjectSelectList
                                    objectTypes={objectPropertyTypes.map(
                                      (objectPropertyType) => {
                                        return {
                                          id: objectPropertyType.id,
                                          value: objectPropertyType.name,
                                        };
                                      }
                                    )}
                                    onChange={(nextValue) => {
                                      const { id, name } =
                                        objectPropertyTypes[
                                          objectPropertyTypes.findIndex(
                                            (objectPropertyType) =>
                                              objectPropertyType.id ==
                                              Number(nextValue)
                                          )
                                        ];
                                      onChange({
                                        id,
                                        name,
                                      });
                                    }}
                                    value={value?.id}
                                  />
                                );
                              }}
                            />
                          )}
                        </ObjectTypePropertyTabPanel>
                      );
                    })}
                    <TabPanel px={0}>
                      <SlideFade
                        in={
                          objectTypes.findIndex(
                            (type) => type.id == objectType
                          ) == tabIndex
                        }
                        offsetY={"60px"}
                      >
                        <Box bgColor={"red"} h={"200px"}></Box>
                      </SlideFade>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              );
            }}
          />
        )}

        <Box>
          <Text fontWeight={"medium"}>Укажите место:</Text>
          <Center w={"full"} mt={4}>
            <Stack w={"full"} spacing={4} alignItems={"center"}>
              <Controller
                control={control}
                name="country"
                render={({ field: { onChange, value } }) => {
                  return (
                    <Box w="full" maxW="xl" justifyContent={"space-between"}>
                      {countryIsSuccess && (
                        <>
                          <Text mb={2}>Страна</Text>
                          <SelectSearch
                            value={value?.id}
                            onChange={({ value }) => {
                              const countryValue = countryData.filter(
                                (country) => country.id == value
                              )[0];
                              onChange({
                                ...countryValue,
                              });
                            }}
                            options={countryData?.map(({ id, name }) => ({
                              label: name,
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
                  );
                }}
              />

              <Controller
                control={control}
                name="region"
                render={({ field: { value, onChange } }) => {
                  return (
                    <Box w="full" maxW="xl" justifyContent={"space-between"}>
                      {country && (
                        <Skeleton
                          rounded={"lg"}
                          isLoaded={regionIsSuccess && !regionIsFetching}
                          h={
                            regionIsSuccess && !regionIsFetching
                              ? "auto"
                              : "40px"
                          }
                        >
                          <Text mb={2}>Регион</Text>
                          <SelectSearch
                            value={value?.id}
                            onChange={({ label, value }) => {
                              onChange({
                                id: value,
                                name: label,
                              });
                            }}
                            options={regionData?.map(({ name, id }) => ({
                              label: name,
                              value: id,
                            }))}
                            placeholder="Выберите регион"
                            icon={CiLocationOn}
                          />
                        </Skeleton>
                      )}
                    </Box>
                  );
                }}
              />
              <Controller
                control={control}
                name="city"
                render={({ field: { value, onChange } }) => {
                  return (
                    <Box w="full" maxW="xl" justifyContent={"space-between"}>
                      {region && (
                        <Skeleton
                          rounded={"lg"}
                          isLoaded={
                            cityIsSuccess && !cityIsFetching && !!region
                          }
                          h={
                            cityIsSuccess && !cityIsFetching && region
                              ? "auto"
                              : "40px"
                          }
                        >
                          <Text mb={2}>Город</Text>
                          <SelectSearch
                            value={value?.id}
                            onChange={({ label, value }) => {
                              onChange({
                                id: value,
                                name: label,
                              });
                            }}
                            options={cityData?.map(({ name, id }) => ({
                              label: name,
                              value: id,
                            }))}
                            placeholder="Выберите город"
                            icon={ImEarth}
                          />
                        </Skeleton>
                      )}
                    </Box>
                  );
                }}
              />

              {isOneFieldIsEmpty && (
                <Button
                  colorScheme="red"
                  isDisabled={
                    city == undefined ||
                    objectType == undefined ||
                    country == undefined ||
                    objectTypeProperty == undefined ||
                    region == undefined
                  }
                >
                  Далее
                </Button>
              )}
              {city != undefined &&
                objectType != undefined &&
                country != undefined &&
                objectTypeProperty != undefined &&
                region != undefined && (
                  <Button
                    colorScheme="red"
                    isDisabled={
                      city == undefined ||
                      objectType == undefined ||
                      country == undefined ||
                      objectTypeProperty == undefined ||
                      region == undefined
                    }
                    type={"submit"}
                  >
                    Далее
                  </Button>
                )}
            </Stack>
          </Center>
        </Box>
      </Box>
    </Box>
  );
};
