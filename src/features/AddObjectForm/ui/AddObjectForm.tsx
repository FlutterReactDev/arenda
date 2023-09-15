import { useMemo, useState } from "react";

import { GiBunkBeds, GiSpookyHouse } from "react-icons/gi";
import { BiBuildingHouse } from "react-icons/bi";
import { BsDoorOpen } from "react-icons/bs";
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
} from "@chakra-ui/react";
import { ObjectSelectList } from "@entites/Object";

export const AddObjectForm = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = useMemo(
    () => [
      {
        name: "номера, спальные места",
        subtitle: "в отеле, гостевом доме или хостеле",
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
  const onChange = (value: string) => {
    console.log(value);
  };
  return (
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
            <Tab
              border={"1px solid"}
              borderColor={"transparent"}
              borderRadius={"lg"}
              bg={"white"}
              _selected={{
                borderColor: "red.600",
              }}
              w={"25%"}
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
          );
        })}
      </TabList>
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
  );
};
