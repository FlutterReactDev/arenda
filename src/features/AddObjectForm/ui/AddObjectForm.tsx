import { useMemo, useState } from "react";

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
} from "@chakra-ui/react";
import { ObjectSelectList } from "@entites/Object";
import { SelectSearch } from "@shared/ui/SelectSearch";
const options = [
  {
    value: "Kyrgyzystan",
    label: "Кыргызстан",
  },
  {
    value: "Russia",
    label: "Россия",
  },
  {
    value: "China",
    label: "Китай",
  },
];
export const AddObjectForm = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | string>("");
  const data = useMemo(
    () => [
      {
        name: "номера, спальные места",
        subtitle: "в отеле, гостевом доме или хостеле",
        description:
          "Гостям будет предоставлен номер в отеле, гостевом доме или спальное место в хостеле",
        icon: GiBunkBeds,
        id: 1,
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
        id: 2,
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
        id: 3,
        icon: GiSpookyHouse,
        description: "Гости снимут дом целиком. Вместе с пристройками",
        types: [
          {
            value: "Коттедж",
            id: 17,
          },

          {
            value: "Эллинг",
            id: 17,
          },
          {
            value: "Гестхаус",
            id: 18,
          },
          {
            value: "Особняк",
            id: 19,
          },
          {
            value: "Дом",
            id: 20,
          },
          {
            value: "Деревенский дом",
            id: 21,
          },
          {
            value: "Шале",
            id: 22,
          },
          {
            value: "Яхта",
            id: 23,
          },
          {
            value: "Вилла",
            id: 24,
          },
          {
            value: "Таунхаус",
            id: 25,
          },
          {
            value: "Бунгало",
            id: 26,
          },
          {
            value: "Дача",
            id: 26,
          },
          {
            value: "Часть дома с отдельным входом",
            id: 27,
          },
          {
            value: "Часть дома с отдельным входом",
            id: 28,
          },
          {
            value: "Целый этаж в доме",
            id: 29,
          },
          {
            value: "Дом на колёсах",
            id: 30,
          },
        ],
      },
      {
        name: "отдельные комнаты",
        subtitle: "целиком",
        id: 4,
        icon: BsDoorOpen,
        description: "Гости снимут отдельную комнату со спальным местом",
        types: [
          {
            value: "Комната в квартире",
            id: 31,
          },
          {
            value: "Комната в частном доме",
            id: 32,
          },
          {
            value: "Комната в коттедже",
            id: 33,
          },
        ],
      },
    ],
    []
  );
  const onSelect = (value: string | number) => {
    console.log(value);

    setSelected(value);
  };
  const onChange = (value: string) => {
    console.log(value);
  };

  return (
    <Box>
      <Text fontWeight={"medium"} mb={2}>
        Что будете сдавать?
      </Text>
      <Tabs
        onChange={(index) => {
          setCurrentIndex(index);
        }}
        variant={"unstyled"}
        px={0}
      >
        <TabList gap={6}>
          {data.map((object) => {
            return (
              <Box w="25%" h={"full"}>
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
        </TabList>
        <Text mt={2} fontWeight={"medium"}>
          Выберите заголовок объявления:
        </Text>
        <TabPanels>
          {data.map((object, index) => {
            return (
              <TabPanel px={0} key={object.id}>
                <SlideFade in={currentIndex == index} offsetY={"60px"}>
                  <ObjectSelectList
                    objectTypes={object.types}
                    onChange={onChange}
                  />
                </SlideFade>
              </TabPanel>
            );
          })}
        </TabPanels>
      </Tabs>
      <Box>
        <Text fontWeight={"medium"}>Укажите место:</Text>
        <Center>
          <Stack spacing={4} w="xl" alignItems={"center"}>
            <SelectSearch
              value={selected}
              onChange={onSelect}
              options={options}
              placeholder="Выберите страну"
              icon={ImEarth}
            />
          </Stack>
        </Center>
      </Box>
    </Box>
  );
};
