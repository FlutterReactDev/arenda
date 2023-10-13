import { ObjectCard, SimpleObjectCard } from "@entites/Object";
import {
  Box,
  Grid,
  GridItem,
  Hide,
  Show,
  SimpleGrid,
  VStack,
  Text,
  HStack,
  Icon,
  Switch,
  Stack,
  Checkbox,
  Select,
  Tooltip,
  FormControl,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Center,
  IconButton,
  Drawer,
  useDisclosure,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  InputLeftElement,
  useMediaQuery,
  DrawerHeader,
} from "@chakra-ui/react";

import { SearchMap } from "@entites/Map";

import { ResultSearch } from "@features/ResultSearch";
import { HiLightningBolt } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { VscSettings } from "react-icons/vsc";
import { FormCard } from "@shared/ui/FormCard";
import {
  HamburgerIcon,
  QuestionOutlineIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { CheckboxList } from "@shared/ui/CheckboxList";
import { useState } from "react";
import { DraggbleDrawer } from "@shared/ui/DraggbleDrawer";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Header } from "@widgets/Header";
import { Footer } from "@widgets/Footer";

export const ObjectSearchLayout = () => {
  const [windowView, setWindowView] = useState<(string | number)[]>([]);
  const [floor, setFloor] = useState<(string | number)[]>([]);
  const {
    isOpen: desktopFilterIsOpen,
    onOpen: desktopFilterOnOpen,
    onClose: desktopFilterOnClose,
  } = useDisclosure();
  const {
    isOpen: mobileFilterIsOpen,
    onOpen: mobileFilterOnOpen,
    onClose: mobileFilterOnClose,
  } = useDisclosure();
  const [isLessThan630] = useMediaQuery("(max-width: 630px)");
  return (
    <>
      <Show breakpoint="(min-width: 900px)">
        <Header />
        <Grid
          templateAreas={{
            "2xl": `"header header header"
          "filter main map"
            `,
            xl: `"header header header"
            ". main map"
              `,
            base: `"header header header"
          ". main map"
            `,
          }}
          gridTemplateRows={"90px 1fr"}
          gridTemplateColumns={{
            "2xl": " 300px minmax(750px,1fr) 1fr",
            xl: "0px minmax(750px,1fr) 1fr",
            lg: "0px 350px 1fr",
            base: "0px 350px 1fr",
          }}
          transition={"0.3s all"}
          bgColor={"blackAlpha.50"}
          columnGap={2}
          rowGap={6}
        >
          <GridItem
            top={0}
            position={"sticky"}
            area={"header"}
            zIndex={9}
            boxShadow={"md"}
            bgColor={"white"}
          >
            <HStack
              justifyContent={{
                base: "space-between",
                "2xl": "center",
              }}
              w="full"
              h={"full"}
              px={4}
            >
              <Show below="2xl">
                <IconButton
                  aria-label="open filter drawer button"
                  colorScheme="red"
                  size={"lg"}
                  onClick={desktopFilterOnOpen}
                >
                  <Icon as={VscSettings} />
                </IconButton>
              </Show>

              <ResultSearch
                maxW={{ base: "4xl", xl: "4xl", "2xl": "7xl" }}
                w={"full"}
              />
            </HStack>
          </GridItem>
          <Hide below="2xl">
            <GridItem
              position={"sticky"}
              top={"28"}
              h={"calc(100vh - 160px)"}
              area={"filter"}
              overflow={"hidden"}
            >
              <Stack
                spacing={4}
                w="full"
                h="full"
                overflowY={"auto"}
                position={"relative"}
              >
                <FormCard title="Выбирайте лучшее">
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mt={2}
                  >
                    <HStack>
                      <Icon as={HiLightningBolt} color={"red.500"} />
                      <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        fontWeight={"medium"}
                      >
                        Быстрое бронирование
                      </Text>
                    </HStack>
                    <Switch colorScheme="red" />
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mt={2}
                  >
                    <HStack>
                      <Icon as={FaHeart} color={"red.500"} />
                      <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        fontWeight={"medium"}
                      >
                        Избранное
                      </Text>
                    </HStack>
                    <Switch colorScheme="red" />
                  </HStack>
                </FormCard>
                <FormCard title="Варианты размещения">
                  <Stack>
                    <Checkbox colorScheme="red">Квартиры, апартаменты</Checkbox>
                    <Checkbox colorScheme="red">Дома, коттеджи</Checkbox>
                    <Checkbox colorScheme="red">Комнаты</Checkbox>
                    <Checkbox colorScheme="red">Отели, гостиницы</Checkbox>
                    <Checkbox colorScheme="red">Апарт-отели</Checkbox>
                    <Checkbox colorScheme="red">Мини-гостиницы</Checkbox>
                    <Checkbox colorScheme="red">Гостевые дома</Checkbox>
                    <Checkbox colorScheme="red">
                      Глэмпинги, базы отдыха
                    </Checkbox>
                    <Checkbox colorScheme="red">Хостелы</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard title="Отдельные спальни">
                  <Select>
                    <option>любое</option>
                    <option value="is_studio">студия</option>
                    <option value="1">не менее 1</option>
                    <option value="2">не менее 2</option>
                    <option value="3">не менее 3</option>
                    <option value="4">4 и более</option>
                  </Select>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text>Спальные места</Text>

                        <Tooltip
                          hasArrow
                          label="Вы можете выбрать раздельные или двуспальные места, а также отметить оба этих типа"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <Stack>
                    <FormControl>
                      <Stack>
                        <FormHelperText>Кровати/диваны</FormHelperText>
                        <Select>
                          <option>любое количество</option>
                          <option value="2">2 и более</option>
                          <option value="3">3 и более</option>
                          <option value="4">4 и более</option>
                          <option value="5">5 и более</option>
                        </Select>
                      </Stack>
                    </FormControl>
                    <FormControl>
                      <Stack>
                        <FormHelperText>Двуспальные</FormHelperText>
                        <Select>
                          <option>любое количество</option>
                          <option value="2">2 и более</option>
                          <option value="3">3 и более</option>
                        </Select>
                      </Stack>
                    </FormControl>
                  </Stack>
                </FormCard>
                <FormCard title="Площадь">
                  <HStack>
                    <InputGroup>
                      <Input placeholder="от" type="number" />
                      <InputRightElement>
                        м<sup>2</sup>
                      </InputRightElement>
                    </InputGroup>
                    <Box>-</Box>
                    <InputGroup>
                      <Input placeholder="до" type="number" />
                      <InputRightElement>
                        м<sup>2</sup>
                      </InputRightElement>
                    </InputGroup>
                  </HStack>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text>Правила размещения </Text>

                        <Tooltip
                          hasArrow
                          label="В большинстве объектов запрещены вечеринки, животные и курение"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <Stack>
                    <HStack justifyContent={"space-between"}>
                      <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        fontWeight={"medium"}
                      >
                        Курение разрешено
                      </Text>

                      <Switch colorScheme="red" />
                    </HStack>
                    <HStack justifyContent={"space-between"}>
                      <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        fontWeight={"medium"}
                      >
                        Вечеринки разрешены
                      </Text>

                      <Switch colorScheme="red" />
                    </HStack>
                  </Stack>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text>Без депозита </Text>

                        <Tooltip
                          hasArrow
                          label="Хозяин жилья не берёт залог при заселении"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <Stack>
                    <HStack justifyContent={"space-between"}>
                      <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        fontWeight={"medium"}
                      >
                        Депозит не требуется
                      </Text>

                      <Switch colorScheme="red" />
                    </HStack>
                  </Stack>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text> В помещении </Text>

                        <Tooltip
                          hasArrow
                          label="Непосредственно в квартире, доме или номере"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <Stack>
                    <Checkbox colorScheme="red">Интернет Wi-Fi</Checkbox>
                    <Checkbox colorScheme="red">кондиционер</Checkbox>
                    <Checkbox colorScheme="red">кухня</Checkbox>
                    <Checkbox colorScheme="red">кухня</Checkbox>
                    <Checkbox colorScheme="red">холодильник</Checkbox>
                    <Checkbox colorScheme="red">балкон / лоджия</Checkbox>
                    <Checkbox colorScheme="red">детская кроватка</Checkbox>
                    <Checkbox colorScheme="red">стиральная машина</Checkbox>
                    <Checkbox colorScheme="red">телевизор</Checkbox>
                    <Checkbox colorScheme="red">электрочайник</Checkbox>
                    <Checkbox colorScheme="red">
                      посуда и принадлежности
                    </Checkbox>
                    <Checkbox colorScheme="red">микроволновка</Checkbox>
                    <Checkbox colorScheme="red">полотенца</Checkbox>
                    <Checkbox colorScheme="red">
                      утюг с гладильной доской
                    </Checkbox>
                    <Checkbox colorScheme="red">фен</Checkbox>
                    <Checkbox colorScheme="red">джакузи</Checkbox>
                    <Checkbox colorScheme="red">сауна / баня</Checkbox>
                    <Checkbox colorScheme="red">Посудомоечная машина</Checkbox>
                    <Checkbox colorScheme="red">мультиварка</Checkbox>
                    <Checkbox colorScheme="red">терраса</Checkbox>
                    <Checkbox colorScheme="red">водонагреватель</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text> На территории </Text>

                        <Tooltip
                          hasArrow
                          label="Во дворе дома или на территории гостиницы"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <Stack>
                    <Checkbox colorScheme="red">Парковка</Checkbox>
                    <Checkbox colorScheme="red">Беседка</Checkbox>
                    <Checkbox colorScheme="red">Мангал</Checkbox>
                    <Checkbox colorScheme="red">Бассейн</Checkbox>
                    <Checkbox colorScheme="red">Детская площадка</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard title="Этаж">
                  <HStack>
                    <Input type="number" placeholder="с" />
                    <Box>-</Box>
                    <Input type="number" placeholder="по" />
                  </HStack>
                  <Box mt={4}>
                    <CheckboxList
                      value={floor}
                      onChange={setFloor}
                      checkboxes={[
                        {
                          value: "lastFloor",
                          label: "Последний",
                        },
                        {
                          value: "notFirstFloor",
                          label: "Не первый",
                        },
                        {
                          value: "notLastFloor",
                          label: "Не последний",
                        },
                        {
                          value: "notGroundFloor",
                          label: "Не цоколь",
                        },
                      ]}
                    />
                  </Box>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text> Вид из окна </Text>

                        <Tooltip
                          hasArrow
                          label="Укажите, что вы хотите видеть из окна во время проживания"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <CheckboxList
                    value={windowView}
                    onChange={setWindowView}
                    checkboxes={[
                      {
                        label: "На море",
                        value: "sea",
                      },
                      {
                        label: "На горы",
                        value: "mountains",
                      },
                      {
                        label: "На город",
                        value: "city",
                      },
                      {
                        label: "На реку/озеро",
                        value: "river/lake",
                      },
                    ]}
                  />
                </FormCard>
                <FormCard title="Санузел">
                  <Stack>
                    <Checkbox colorScheme="red">Своя ванная комната</Checkbox>
                    <Checkbox colorScheme="red">Свой туалет</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text>Питание</Text>

                        <Tooltip
                          hasArrow
                          label="Входит в стоимость проживания или оплачивается отдельно"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <Stack>
                    <Checkbox colorScheme="red">Завтрак</Checkbox>
                    <Checkbox colorScheme="red">Обед</Checkbox>
                    <Checkbox colorScheme="red">Ужин</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text>Количество звёзд отеля </Text>

                        <Tooltip
                          hasArrow
                          label="Звёздность отелей подтверждена официальными сертификатами"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <Stack>
                    <Checkbox colorScheme="red">5 звёзд</Checkbox>
                    <Checkbox colorScheme="red">4 звёзд</Checkbox>
                    <Checkbox colorScheme="red">3 звёзд</Checkbox>
                    <Checkbox colorScheme="red">2 звёзд</Checkbox>
                    <Checkbox colorScheme="red">1 звёзд и без звёзд</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard title="Доступность">
                  <Stack>
                    <Checkbox colorScheme="red">Лифт</Checkbox>
                    <Checkbox colorScheme="red">Доступ для инвалидов</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard title="Дополнительно">
                  <Stack>
                    <Checkbox colorScheme="red">быстро отвечают</Checkbox>
                    <Checkbox colorScheme="red">Суперхозяева</Checkbox>
                    <Checkbox colorScheme="red">Трансфер</Checkbox>
                    <Checkbox colorScheme="red">С хорошими отзывами</Checkbox>
                    <Checkbox colorScheme="red">Ранний заезд разрешён</Checkbox>
                    <Checkbox colorScheme="red">
                      Поздний отъезд разрешён
                    </Checkbox>
                    <Checkbox colorScheme="red">
                      Бесконтактное заселение
                    </Checkbox>
                    <Checkbox colorScheme="red">отчётные документы</Checkbox>
                    <Checkbox colorScheme="red">без посредников</Checkbox>
                    <Checkbox colorScheme="red">
                      Жильё для самоизоляции
                    </Checkbox>
                  </Stack>
                </FormCard>
                <Center
                  bgColor={"white"}
                  py={4}
                  w={"full"}
                  position={"sticky"}
                  bottom={0}
                  zIndex={1}
                  borderTop={"1px solid"}
                  borderColor={"gray.300"}
                >
                  <Button colorScheme="red" variant={"outline"}>
                    Сбросить все фильтры
                  </Button>
                </Center>
              </Stack>
            </GridItem>
          </Hide>

          <GridItem area={"main"}>
            <VStack spacing={5}>
              <Hide below="xl">
                <ObjectCard />
                <ObjectCard />
                <ObjectCard />
                <ObjectCard />
                <ObjectCard />
                <ObjectCard />
              </Hide>

              <Show below="xl">
                <SimpleGrid columns={[1]} spacing={5}>
                  <SimpleObjectCard />
                  <SimpleObjectCard />
                  <SimpleObjectCard />
                  <SimpleObjectCard />
                  <SimpleObjectCard />
                  <SimpleObjectCard />
                  <SimpleObjectCard />
                  <SimpleObjectCard />
                </SimpleGrid>
              </Show>
            </VStack>
          </GridItem>
          <GridItem
            position={"sticky"}
            overflow={"hidden"}
            top={24}
            area={"map"}
            h={"100vh"}
          >
            <Box w="full" h="full">
              <SearchMap
                inputHtmlMarkers={[
                  {
                    coordinates: [77.1757361557851, 42.64472838750217],
                  },
                  {
                    coordinates: [77.17437800783786, 42.645238409366385],
                  },
                  {
                    coordinates: [77.17292784537554, 42.645017610523716],
                  },
                  {
                    coordinates: [77.15253297654283, 42.63014881066871],
                  },
                  {
                    coordinates: [77.1981040743652, 42.658896258910474],
                  },
                ]}
              />
            </Box>
          </GridItem>
        </Grid>

        <Show below="2xl">
          <Drawer
            isOpen={desktopFilterIsOpen}
            placement="left"
            onClose={desktopFilterOnClose}
          >
            <DrawerOverlay />
            <DrawerContent bgColor={"none"}>
              <DrawerCloseButton />

              <DrawerBody p={0} bgColor={"white"}>
                <Stack>
                  <FormCard title="Выбирайте лучшее">
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      mt={2}
                    >
                      <HStack>
                        <Icon as={HiLightningBolt} color={"red.500"} />
                        <Text
                          color={"gray.500"}
                          fontSize={"sm"}
                          fontWeight={"medium"}
                        >
                          Быстрое бронирование
                        </Text>
                      </HStack>
                      <Switch colorScheme="red" />
                    </HStack>
                    <HStack
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      mt={2}
                    >
                      <HStack>
                        <Icon as={FaHeart} color={"red.500"} />
                        <Text
                          color={"gray.500"}
                          fontSize={"sm"}
                          fontWeight={"medium"}
                        >
                          Избранное
                        </Text>
                      </HStack>
                      <Switch colorScheme="red" />
                    </HStack>
                  </FormCard>
                  <FormCard title="Варианты размещения">
                    <Stack>
                      <Checkbox colorScheme="red">
                        Квартиры, апартаменты
                      </Checkbox>
                      <Checkbox colorScheme="red">Дома, коттеджи</Checkbox>
                      <Checkbox colorScheme="red">Комнаты</Checkbox>
                      <Checkbox colorScheme="red">Отели, гостиницы</Checkbox>
                      <Checkbox colorScheme="red">Апарт-отели</Checkbox>
                      <Checkbox colorScheme="red">Мини-гостиницы</Checkbox>
                      <Checkbox colorScheme="red">Гостевые дома</Checkbox>
                      <Checkbox colorScheme="red">
                        Глэмпинги, базы отдыха
                      </Checkbox>
                      <Checkbox colorScheme="red">Хостелы</Checkbox>
                    </Stack>
                  </FormCard>
                  <FormCard title="Отдельные спальни">
                    <Select>
                      <option>любое</option>
                      <option value="is_studio">студия</option>
                      <option value="1">не менее 1</option>
                      <option value="2">не менее 2</option>
                      <option value="3">не менее 3</option>
                      <option value="4">4 и более</option>
                    </Select>
                  </FormCard>
                  <FormCard
                    title={
                      <>
                        <HStack>
                          <Text>Спальные места</Text>

                          <Tooltip
                            hasArrow
                            label="Вы можете выбрать раздельные или двуспальные места, а также отметить оба этих типа"
                            placement="top"
                          >
                            <QuestionOutlineIcon />
                          </Tooltip>
                        </HStack>
                      </>
                    }
                  >
                    <Stack>
                      <FormControl>
                        <Stack>
                          <FormHelperText>Кровати/диваны</FormHelperText>
                          <Select>
                            <option>любое количество</option>
                            <option value="2">2 и более</option>
                            <option value="3">3 и более</option>
                            <option value="4">4 и более</option>
                            <option value="5">5 и более</option>
                          </Select>
                        </Stack>
                      </FormControl>
                      <FormControl>
                        <Stack>
                          <FormHelperText>Двуспальные</FormHelperText>
                          <Select>
                            <option>любое количество</option>
                            <option value="2">2 и более</option>
                            <option value="3">3 и более</option>
                          </Select>
                        </Stack>
                      </FormControl>
                    </Stack>
                  </FormCard>
                  <FormCard title="Площадь">
                    <HStack>
                      <InputGroup>
                        <Input placeholder="от" type="number" />
                        <InputRightElement>
                          м<sup>2</sup>
                        </InputRightElement>
                      </InputGroup>
                      <Box>-</Box>
                      <InputGroup>
                        <Input placeholder="до" type="number" />
                        <InputRightElement>
                          м<sup>2</sup>
                        </InputRightElement>
                      </InputGroup>
                    </HStack>
                  </FormCard>
                  <FormCard
                    title={
                      <>
                        <HStack>
                          <Text>Правила размещения </Text>

                          <Tooltip
                            hasArrow
                            label="В большинстве объектов запрещены вечеринки, животные и курение"
                            placement="top"
                          >
                            <QuestionOutlineIcon />
                          </Tooltip>
                        </HStack>
                      </>
                    }
                  >
                    <Stack>
                      <HStack justifyContent={"space-between"}>
                        <Text
                          color={"gray.500"}
                          fontSize={"sm"}
                          fontWeight={"medium"}
                        >
                          Курение разрешено
                        </Text>

                        <Switch colorScheme="red" />
                      </HStack>
                      <HStack justifyContent={"space-between"}>
                        <Text
                          color={"gray.500"}
                          fontSize={"sm"}
                          fontWeight={"medium"}
                        >
                          Вечеринки разрешены
                        </Text>

                        <Switch colorScheme="red" />
                      </HStack>
                    </Stack>
                  </FormCard>
                  <FormCard
                    title={
                      <>
                        <HStack>
                          <Text>Без депозита </Text>

                          <Tooltip
                            hasArrow
                            label="Хозяин жилья не берёт залог при заселении"
                            placement="top"
                          >
                            <QuestionOutlineIcon />
                          </Tooltip>
                        </HStack>
                      </>
                    }
                  >
                    <Stack>
                      <HStack justifyContent={"space-between"}>
                        <Text
                          color={"gray.500"}
                          fontSize={"sm"}
                          fontWeight={"medium"}
                        >
                          Депозит не требуется
                        </Text>

                        <Switch colorScheme="red" />
                      </HStack>
                    </Stack>
                  </FormCard>
                  <FormCard
                    title={
                      <>
                        <HStack>
                          <Text> В помещении </Text>

                          <Tooltip
                            hasArrow
                            label="Непосредственно в квартире, доме или номере"
                            placement="top"
                          >
                            <QuestionOutlineIcon />
                          </Tooltip>
                        </HStack>
                      </>
                    }
                  >
                    <Stack>
                      <Checkbox colorScheme="red">Интернет Wi-Fi</Checkbox>
                      <Checkbox colorScheme="red">кондиционер</Checkbox>
                      <Checkbox colorScheme="red">кухня</Checkbox>
                      <Checkbox colorScheme="red">кухня</Checkbox>
                      <Checkbox colorScheme="red">холодильник</Checkbox>
                      <Checkbox colorScheme="red">балкон / лоджия</Checkbox>
                      <Checkbox colorScheme="red">детская кроватка</Checkbox>
                      <Checkbox colorScheme="red">стиральная машина</Checkbox>
                      <Checkbox colorScheme="red">телевизор</Checkbox>
                      <Checkbox colorScheme="red">электрочайник</Checkbox>
                      <Checkbox colorScheme="red">
                        посуда и принадлежности
                      </Checkbox>
                      <Checkbox colorScheme="red">микроволновка</Checkbox>
                      <Checkbox colorScheme="red">полотенца</Checkbox>
                      <Checkbox colorScheme="red">
                        утюг с гладильной доской
                      </Checkbox>
                      <Checkbox colorScheme="red">фен</Checkbox>
                      <Checkbox colorScheme="red">джакузи</Checkbox>
                      <Checkbox colorScheme="red">сауна / баня</Checkbox>
                      <Checkbox colorScheme="red">
                        Посудомоечная машина
                      </Checkbox>
                      <Checkbox colorScheme="red">мультиварка</Checkbox>
                      <Checkbox colorScheme="red">терраса</Checkbox>
                      <Checkbox colorScheme="red">водонагреватель</Checkbox>
                    </Stack>
                  </FormCard>
                  <FormCard
                    title={
                      <>
                        <HStack>
                          <Text> На территории </Text>

                          <Tooltip
                            hasArrow
                            label="Во дворе дома или на территории гостиницы"
                            placement="top"
                          >
                            <QuestionOutlineIcon />
                          </Tooltip>
                        </HStack>
                      </>
                    }
                  >
                    <Stack>
                      <Checkbox colorScheme="red">Парковка</Checkbox>
                      <Checkbox colorScheme="red">Беседка</Checkbox>
                      <Checkbox colorScheme="red">Мангал</Checkbox>
                      <Checkbox colorScheme="red">Бассейн</Checkbox>
                      <Checkbox colorScheme="red">Детская площадка</Checkbox>
                    </Stack>
                  </FormCard>
                  <FormCard title="Этаж">
                    <HStack>
                      <Input type="number" placeholder="с" />
                      <Box>-</Box>
                      <Input type="number" placeholder="по" />
                    </HStack>
                    <Box mt={4}>
                      <CheckboxList
                        value={floor}
                        onChange={setFloor}
                        checkboxes={[
                          {
                            value: "lastFloor",
                            label: "Последний",
                          },
                          {
                            value: "notFirstFloor",
                            label: "Не первый",
                          },
                          {
                            value: "notLastFloor",
                            label: "Не последний",
                          },
                          {
                            value: "notGroundFloor",
                            label: "Не цоколь",
                          },
                        ]}
                      />
                    </Box>
                  </FormCard>
                  <FormCard
                    title={
                      <>
                        <HStack>
                          <Text> Вид из окна </Text>

                          <Tooltip
                            hasArrow
                            label="Укажите, что вы хотите видеть из окна во время проживания"
                            placement="top"
                          >
                            <QuestionOutlineIcon />
                          </Tooltip>
                        </HStack>
                      </>
                    }
                  >
                    <CheckboxList
                      value={windowView}
                      onChange={setWindowView}
                      checkboxes={[
                        {
                          label: "На море",
                          value: "sea",
                        },
                        {
                          label: "На горы",
                          value: "mountains",
                        },
                        {
                          label: "На город",
                          value: "city",
                        },
                        {
                          label: "На реку/озеро",
                          value: "river/lake",
                        },
                      ]}
                    />
                  </FormCard>
                  <FormCard title="Санузел">
                    <Stack>
                      <Checkbox colorScheme="red">Своя ванная комната</Checkbox>
                      <Checkbox colorScheme="red">Свой туалет</Checkbox>
                    </Stack>
                  </FormCard>
                  <FormCard
                    title={
                      <>
                        <HStack>
                          <Text>Питание</Text>

                          <Tooltip
                            hasArrow
                            label="Входит в стоимость проживания или оплачивается отдельно"
                            placement="top"
                          >
                            <QuestionOutlineIcon />
                          </Tooltip>
                        </HStack>
                      </>
                    }
                  >
                    <Stack>
                      <Checkbox colorScheme="red">Завтрак</Checkbox>
                      <Checkbox colorScheme="red">Обед</Checkbox>
                      <Checkbox colorScheme="red">Ужин</Checkbox>
                    </Stack>
                  </FormCard>
                  <FormCard
                    title={
                      <>
                        <HStack>
                          <Text>Количество звёзд отеля </Text>

                          <Tooltip
                            hasArrow
                            label="Звёздность отелей подтверждена официальными сертификатами"
                            placement="top"
                          >
                            <QuestionOutlineIcon />
                          </Tooltip>
                        </HStack>
                      </>
                    }
                  >
                    <Stack>
                      <Checkbox colorScheme="red">5 звёзд</Checkbox>
                      <Checkbox colorScheme="red">4 звёзд</Checkbox>
                      <Checkbox colorScheme="red">3 звёзд</Checkbox>
                      <Checkbox colorScheme="red">2 звёзд</Checkbox>
                      <Checkbox colorScheme="red">1 звёзд и без звёзд</Checkbox>
                    </Stack>
                  </FormCard>
                  <FormCard title="Доступность">
                    <Stack>
                      <Checkbox colorScheme="red">Лифт</Checkbox>
                      <Checkbox colorScheme="red">
                        Доступ для инвалидов
                      </Checkbox>
                    </Stack>
                  </FormCard>
                  <FormCard title="Дополнительно">
                    <Stack>
                      <Checkbox colorScheme="red">быстро отвечают</Checkbox>
                      <Checkbox colorScheme="red">Суперхозяева</Checkbox>
                      <Checkbox colorScheme="red">Трансфер</Checkbox>
                      <Checkbox colorScheme="red">С хорошими отзывами</Checkbox>
                      <Checkbox colorScheme="red">
                        Ранний заезд разрешён
                      </Checkbox>
                      <Checkbox colorScheme="red">
                        Поздний отъезд разрешён
                      </Checkbox>
                      <Checkbox colorScheme="red">
                        Бесконтактное заселение
                      </Checkbox>
                      <Checkbox colorScheme="red">отчётные документы</Checkbox>
                      <Checkbox colorScheme="red">без посредников</Checkbox>
                      <Checkbox colorScheme="red">
                        Жильё для самоизоляции
                      </Checkbox>
                    </Stack>
                  </FormCard>
                  <Center
                    bgColor={"white"}
                    py={4}
                    w={"full"}
                    position={"sticky"}
                    bottom={0}
                    zIndex={1}
                    borderTop={"1px solid"}
                    borderColor={"gray.300"}
                  >
                    <Button colorScheme="red" variant={"outline"}>
                      Сбросить все фильтры
                    </Button>
                  </Center>
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Show>
        <Footer />
      </Show>
      <Show breakpoint="(max-width: 900px)">
        <Header />
        <Box h="calc(100dvh - 48px)">
          <SearchMap
            inputHtmlMarkers={[
              {
                coordinates: [77.1757361557851, 42.64472838750217],
              },
              {
                coordinates: [77.17437800783786, 42.645238409366385],
              },
              {
                coordinates: [77.17292784537554, 42.645017610523716],
              },
              {
                coordinates: [77.15253297654283, 42.63014881066871],
              },
              {
                coordinates: [77.1981040743652, 42.658896258910474],
              },
            ]}
          />
          <DraggbleDrawer
            header={
              <>
                <FormControl w={"full"}>
                  <InputGroup w={"full"}>
                    <InputLeftElement>
                      <SearchIcon />
                    </InputLeftElement>
                    <Input
                      _focus={{
                        bgColor: "white",
                      }}
                      bgColor={"white"}
                      variant="filled"
                      placeholder="Поиск"
                    />
                  </InputGroup>
                </FormControl>
                <Button bgColor={"white"} onClick={mobileFilterOnOpen}>
                  <HamburgerIcon />
                </Button>
              </>
            }
          >
            <Box>
              <Swiper
                slidesPerView={3.5}
                spaceBetween={30}
                freeMode={true}
                modules={[FreeMode]}
              >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
                <SwiperSlide>Slide 5</SwiperSlide>
                <SwiperSlide>Slide 6</SwiperSlide>
                <SwiperSlide>Slide 7</SwiperSlide>
                <SwiperSlide>Slide 8</SwiperSlide>
                <SwiperSlide>Slide 9</SwiperSlide>
              </Swiper>
            </Box>
            <SimpleGrid
              columns={{
                ...(isLessThan630
                  ? {
                      base: 1,
                    }
                  : { base: 1, sm: 2 }),
              }}
              spacing={5}
            >
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
            </SimpleGrid>
          </DraggbleDrawer>
        </Box>
        <Drawer
          isOpen={mobileFilterIsOpen}
          placement="right"
          onClose={mobileFilterOnClose}
          size={"full"}
        >
          <DrawerOverlay />
          <DrawerContent
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            bgColor={"none"}
            h={"100dvh"}
          >
            <DrawerCloseButton />
            <DrawerHeader p={2}>
              <Button
                size={"sm"}
                colorScheme="red"
                rounded={"full"}
                variant={"outline"}
              >
                Сбросить все фильтры
              </Button>
            </DrawerHeader>
            <DrawerBody h={"100dvh"} p={0} bgColor={"white"}>
              <Stack>
                <FormCard title="Выбирайте лучшее">
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mt={2}
                  >
                    <HStack>
                      <Icon as={HiLightningBolt} color={"red.500"} />
                      <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        fontWeight={"medium"}
                      >
                        Быстрое бронирование
                      </Text>
                    </HStack>
                    <Switch colorScheme="red" />
                  </HStack>
                  <HStack
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    mt={2}
                  >
                    <HStack>
                      <Icon as={FaHeart} color={"red.500"} />
                      <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        fontWeight={"medium"}
                      >
                        Избранное
                      </Text>
                    </HStack>
                    <Switch colorScheme="red" />
                  </HStack>
                </FormCard>
                <FormCard title="Варианты размещения">
                  <Stack>
                    <Checkbox colorScheme="red">Квартиры, апартаменты</Checkbox>
                    <Checkbox colorScheme="red">Дома, коттеджи</Checkbox>
                    <Checkbox colorScheme="red">Комнаты</Checkbox>
                    <Checkbox colorScheme="red">Отели, гостиницы</Checkbox>
                    <Checkbox colorScheme="red">Апарт-отели</Checkbox>
                    <Checkbox colorScheme="red">Мини-гостиницы</Checkbox>
                    <Checkbox colorScheme="red">Гостевые дома</Checkbox>
                    <Checkbox colorScheme="red">
                      Глэмпинги, базы отдыха
                    </Checkbox>
                    <Checkbox colorScheme="red">Хостелы</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard title="Отдельные спальни">
                  <Select>
                    <option>любое</option>
                    <option value="is_studio">студия</option>
                    <option value="1">не менее 1</option>
                    <option value="2">не менее 2</option>
                    <option value="3">не менее 3</option>
                    <option value="4">4 и более</option>
                  </Select>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text>Спальные места</Text>

                        <Tooltip
                          hasArrow
                          label="Вы можете выбрать раздельные или двуспальные места, а также отметить оба этих типа"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <Stack>
                    <FormControl>
                      <Stack>
                        <FormHelperText>Кровати/диваны</FormHelperText>
                        <Select>
                          <option>любое количество</option>
                          <option value="2">2 и более</option>
                          <option value="3">3 и более</option>
                          <option value="4">4 и более</option>
                          <option value="5">5 и более</option>
                        </Select>
                      </Stack>
                    </FormControl>
                    <FormControl>
                      <Stack>
                        <FormHelperText>Двуспальные</FormHelperText>
                        <Select>
                          <option>любое количество</option>
                          <option value="2">2 и более</option>
                          <option value="3">3 и более</option>
                        </Select>
                      </Stack>
                    </FormControl>
                  </Stack>
                </FormCard>
                <FormCard title="Площадь">
                  <HStack>
                    <InputGroup>
                      <Input placeholder="от" type="number" />
                      <InputRightElement>
                        м<sup>2</sup>
                      </InputRightElement>
                    </InputGroup>
                    <Box>-</Box>
                    <InputGroup>
                      <Input placeholder="до" type="number" />
                      <InputRightElement>
                        м<sup>2</sup>
                      </InputRightElement>
                    </InputGroup>
                  </HStack>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text>Правила размещения </Text>

                        <Tooltip
                          hasArrow
                          label="В большинстве объектов запрещены вечеринки, животные и курение"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <Stack>
                    <HStack justifyContent={"space-between"}>
                      <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        fontWeight={"medium"}
                      >
                        Курение разрешено
                      </Text>

                      <Switch colorScheme="red" />
                    </HStack>
                    <HStack justifyContent={"space-between"}>
                      <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        fontWeight={"medium"}
                      >
                        Вечеринки разрешены
                      </Text>

                      <Switch colorScheme="red" />
                    </HStack>
                  </Stack>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text>Без депозита </Text>

                        <Tooltip
                          hasArrow
                          label="Хозяин жилья не берёт залог при заселении"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <Stack>
                    <HStack justifyContent={"space-between"}>
                      <Text
                        color={"gray.500"}
                        fontSize={"sm"}
                        fontWeight={"medium"}
                      >
                        Депозит не требуется
                      </Text>

                      <Switch colorScheme="red" />
                    </HStack>
                  </Stack>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text> В помещении </Text>

                        <Tooltip
                          hasArrow
                          label="Непосредственно в квартире, доме или номере"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <Stack>
                    <Checkbox colorScheme="red">Интернет Wi-Fi</Checkbox>
                    <Checkbox colorScheme="red">кондиционер</Checkbox>
                    <Checkbox colorScheme="red">кухня</Checkbox>
                    <Checkbox colorScheme="red">кухня</Checkbox>
                    <Checkbox colorScheme="red">холодильник</Checkbox>
                    <Checkbox colorScheme="red">балкон / лоджия</Checkbox>
                    <Checkbox colorScheme="red">детская кроватка</Checkbox>
                    <Checkbox colorScheme="red">стиральная машина</Checkbox>
                    <Checkbox colorScheme="red">телевизор</Checkbox>
                    <Checkbox colorScheme="red">электрочайник</Checkbox>
                    <Checkbox colorScheme="red">
                      посуда и принадлежности
                    </Checkbox>
                    <Checkbox colorScheme="red">микроволновка</Checkbox>
                    <Checkbox colorScheme="red">полотенца</Checkbox>
                    <Checkbox colorScheme="red">
                      утюг с гладильной доской
                    </Checkbox>
                    <Checkbox colorScheme="red">фен</Checkbox>
                    <Checkbox colorScheme="red">джакузи</Checkbox>
                    <Checkbox colorScheme="red">сауна / баня</Checkbox>
                    <Checkbox colorScheme="red">Посудомоечная машина</Checkbox>
                    <Checkbox colorScheme="red">мультиварка</Checkbox>
                    <Checkbox colorScheme="red">терраса</Checkbox>
                    <Checkbox colorScheme="red">водонагреватель</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text> На территории </Text>

                        <Tooltip
                          hasArrow
                          label="Во дворе дома или на территории гостиницы"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <Stack>
                    <Checkbox colorScheme="red">Парковка</Checkbox>
                    <Checkbox colorScheme="red">Беседка</Checkbox>
                    <Checkbox colorScheme="red">Мангал</Checkbox>
                    <Checkbox colorScheme="red">Бассейн</Checkbox>
                    <Checkbox colorScheme="red">Детская площадка</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard title="Этаж">
                  <HStack>
                    <Input type="number" placeholder="с" />
                    <Box>-</Box>
                    <Input type="number" placeholder="по" />
                  </HStack>
                  <Box mt={4}>
                    <CheckboxList
                      value={floor}
                      onChange={setFloor}
                      checkboxes={[
                        {
                          value: "lastFloor",
                          label: "Последний",
                        },
                        {
                          value: "notFirstFloor",
                          label: "Не первый",
                        },
                        {
                          value: "notLastFloor",
                          label: "Не последний",
                        },
                        {
                          value: "notGroundFloor",
                          label: "Не цоколь",
                        },
                      ]}
                    />
                  </Box>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text> Вид из окна </Text>

                        <Tooltip
                          hasArrow
                          label="Укажите, что вы хотите видеть из окна во время проживания"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <CheckboxList
                    value={windowView}
                    onChange={setWindowView}
                    checkboxes={[
                      {
                        label: "На море",
                        value: "sea",
                      },
                      {
                        label: "На горы",
                        value: "mountains",
                      },
                      {
                        label: "На город",
                        value: "city",
                      },
                      {
                        label: "На реку/озеро",
                        value: "river/lake",
                      },
                    ]}
                  />
                </FormCard>
                <FormCard title="Санузел">
                  <Stack>
                    <Checkbox colorScheme="red">Своя ванная комната</Checkbox>
                    <Checkbox colorScheme="red">Свой туалет</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text>Питание</Text>

                        <Tooltip
                          hasArrow
                          label="Входит в стоимость проживания или оплачивается отдельно"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <Stack>
                    <Checkbox colorScheme="red">Завтрак</Checkbox>
                    <Checkbox colorScheme="red">Обед</Checkbox>
                    <Checkbox colorScheme="red">Ужин</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard
                  title={
                    <>
                      <HStack>
                        <Text>Количество звёзд отеля </Text>

                        <Tooltip
                          hasArrow
                          label="Звёздность отелей подтверждена официальными сертификатами"
                          placement="top"
                        >
                          <QuestionOutlineIcon />
                        </Tooltip>
                      </HStack>
                    </>
                  }
                >
                  <Stack>
                    <Checkbox colorScheme="red">5 звёзд</Checkbox>
                    <Checkbox colorScheme="red">4 звёзд</Checkbox>
                    <Checkbox colorScheme="red">3 звёзд</Checkbox>
                    <Checkbox colorScheme="red">2 звёзд</Checkbox>
                    <Checkbox colorScheme="red">1 звёзд и без звёзд</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard title="Доступность">
                  <Stack>
                    <Checkbox colorScheme="red">Лифт</Checkbox>
                    <Checkbox colorScheme="red">Доступ для инвалидов</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard title="Дополнительно">
                  <Stack>
                    <Checkbox colorScheme="red">быстро отвечают</Checkbox>
                    <Checkbox colorScheme="red">Суперхозяева</Checkbox>
                    <Checkbox colorScheme="red">Трансфер</Checkbox>
                    <Checkbox colorScheme="red">С хорошими отзывами</Checkbox>
                    <Checkbox colorScheme="red">Ранний заезд разрешён</Checkbox>
                    <Checkbox colorScheme="red">
                      Поздний отъезд разрешён
                    </Checkbox>
                    <Checkbox colorScheme="red">
                      Бесконтактное заселение
                    </Checkbox>
                    <Checkbox colorScheme="red">отчётные документы</Checkbox>
                    <Checkbox colorScheme="red">без посредников</Checkbox>
                    <Checkbox colorScheme="red">
                      Жильё для самоизоляции
                    </Checkbox>
                  </Stack>
                </FormCard>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Show>
    </>
  );
};
