import {
  Box,
  Button,
  Center,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormHelperText,
  Grid,
  GridItem,
  HStack,
  Hide,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Show,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  Tooltip,
  VStack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { ObjectCard, SimpleObjectCard } from "@entites/Object";

import { SearchMap, useSearchMap } from "@entites/Map";

import {
  CalendarIcon,
  QuestionOutlineIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { CheckboxList } from "@shared/ui/CheckboxList";
import { DraggbleDrawer } from "@shared/ui/DraggbleDrawer";
import { FormCard } from "@shared/ui/FormCard";
import { useCallback, useEffect, useState } from "react";
import { FaHeart, FaUsers } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";
import { MdBookmarkBorder } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";

import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { GuestsModal } from "@entites/Object/ui/GuestsModal";
import {
  ResultSearch,
  searchObjectAction,
  useSearchObjectData,
} from "@features/SearchObjects";
import { MobileCalendarDrawer } from "@shared/ui/MobileCalendarDrawer";
import { getWordByNum } from "@shared/utils/getWordByNum";
import { useAppDispatch } from "@shared/utils/hooks/useAppDispatch";

import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { BiCollapse, BiExpand } from "react-icons/bi";
import { BsGeoAlt } from "react-icons/bs";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FilterObjects } from "@features/FilterObjects";
import { useHeader } from "@widgets/Header";
export const ObjectSearchLayout = () => {
  const { headerHeight } = useHeader();
  const [windowView, setWindowView] = useState<(string | number)[]>([]);

  const [floor, setFloor] = useState<(string | number)[]>([]);
  const {
    addMarkers,
    setMarkerBounds,
    setUserGeolocation,
    setCenter,
    userGeolocation,
    setZoom,
  } = useSearchMap();

  const markers = [
    {
      longitude: 77.1757361557851,
      latitude: 42.64472838750217,
      price: 1000,
    },
    {
      latitude: 42.645238409366385,
      longitude: 77.17437800783786,
      price: 2000,
    },
    {
      latitude: 42.645017610523716,
      longitude: 77.17292784537554,
      price: 1450,
    },

    {
      latitude: 42.658896258910474,
      longitude: 77.1981040743652,
      price: 1850,
    },
    {
      latitude: 42.872791,
      longitude: 74.597399,
      price: 17080,
    },
    { latitude: 42.880191, longitude: 74.621265, price: 1200 },
    { latitude: 42.880218, longitude: 74.620338, price: 1900 },
    {
      latitude: 41.413604,
      longitude: 75.054927,
      price: 1700,
    },

    { latitude: 42.517291, longitude: 72.239297, price: 6900 },
    { latitude: 40.265527, longitude: 72.616967, price: 8150 },
    { latitude: 39.466743, longitude: 75.984931, price: 7900 },
    {
      latitude: 42.117053,
      longitude: 76.995835,
      price: 2670,
    },
    {
      latitude: 42.489932,
      longitude: 78.392196,
      price: 5600,
    },
    {
      latitude: 42.642381,
      longitude: 77.100584,
      price: 1250,
    },
  ];

  const {
    isOpen: mapIsOpen,
    onToggle: mapOnToggle,
    onOpen: mapOnOpen,
  } = useDisclosure();
  const dispatch = useAppDispatch();
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

  const {
    isOpen: datepickerIsOpen,
    onOpen: datepickerOnOpen,
    onClose: datepickerOnClose,
  } = useDisclosure();

  const {
    isOpen: guestsIsOpen,
    onClose: guestsOnClose,
    onOpen: guestsOnOpen,
  } = useDisclosure();

  const [isLessThan630] = useMediaQuery("(max-width: 630px)");

  const { guests, dates } = useSearchObjectData();
  const [calendarDates, setCalendarDates] = useState<Date[]>([
    dates?.checkIn,
    dates?.checkOut,
  ]);

  const handleSelectDate = useCallback((dates: Date[]) => {
    setCalendarDates(dates);
  }, []);

  useEffect(() => {
    if (calendarDates.length == 2) {
      dispatch(
        searchObjectAction.setDates({
          checkIn: calendarDates[0],
          checkOut: calendarDates[1],
        })
      );
    }
  }, [calendarDates, dispatch]);

  useEffect(() => {
    addMarkers(markers);
  }, []);

  const onSetFitBounds = () => {
    setMarkerBounds();
  };

  const findMe = () => {
    navigator.geolocation.watchPosition(
      function (position) {
        // Successfully obtained the current position
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setUserGeolocation({
          latitude,
          longitude,
        });
      },
      function (error) {
        // Handle any errors that occurred while getting the position
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
        }
      }
    );

    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Successfully obtained the current position
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        setCenter([longitude, latitude]);
        setZoom(18);
      },
      function (error) {
        // Handle any errors that occurred while getting the position
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            break;
        }
      }
    );

    if (userGeolocation) {
      const { latitude, longitude } = userGeolocation;
      setCenter([longitude, latitude]);
      setZoom(18);
    }
  };

  return (
    <>
      <Show breakpoint="(min-width: 901px)">
        <Grid
          templateAreas={{
            "2xl": !mapIsOpen
              ? ` "header header header"
                    "filter main map"
            `
              : `"header header header"
            ". main map"
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
            "2xl": !mapIsOpen
              ? "300px minmax(750px,1fr) 1fr"
              : "0px minmax(750px,750px) 1fr",
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
            bg="gray.50"
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
                maxW={{ base: "5xl", xl: "5xl", "2xl": "7xl" }}
                w={"full"}
              />
            </HStack>
          </GridItem>
          {!mapIsOpen && (
            <Hide below="2xl">
              <GridItem
                position={"sticky"}
                top={"28"}
                h={`calc(100dvh - 112px - ${headerHeight}px)`}
                area={"filter"}
                overflow={"hidden"}
                rounded={"lg"}
              >
                <FilterObjects />
              </GridItem>
            </Hide>
          )}

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
            h={`calc(100dvh - 112px - ${headerHeight}px)`}
          >
            <Box w="full" h="full" position={"relative"}>
              <HStack position={"absolute"} top={2} left={2} zIndex={"popover"}>
                <IconButton
                  rounded={"full"}
                  colorScheme="red"
                  aria-label="asdas"
                  size={"lg"}
                  onClick={mapOnToggle}
                  icon={
                    <>
                      {!mapIsOpen && <Icon as={BiExpand} h={6} w={6} />}
                      {mapIsOpen && <Icon as={BiCollapse} h={6} w={6} />}
                    </>
                  }
                />

                <Button colorScheme="blue" onClick={findMe}>
                  <Icon as={BsGeoAlt} />
                </Button>
              </HStack>

              <Button
                position={"absolute"}
                top={4}
                right={4}
                onClick={onSetFitBounds}
                zIndex={"popover"}
              >
                Заполнить
              </Button>

              <SearchMap onMove={mapOnOpen} />
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
              <DrawerHeader p={2}>Фильтры</DrawerHeader>

              <DrawerBody p={0} bgColor={"white"}>
                <FilterObjects />
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Show>
      </Show>
      <Show breakpoint="(max-width: 900px)">
        <Box h="calc(100dvh - 48px)" position={"relative"}>
          <HStack position={"absolute"} top={2} left={2} zIndex={"banner"}>
            <Button colorScheme="blue" onClick={findMe}>
              <Icon as={BsGeoAlt} />
            </Button>
          </HStack>

          <SearchMap />
          <DraggbleDrawer
            header={
              <>
                <HStack w={"full"}>
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
                        _hover={{
                          bgColor: "white",
                        }}
                      />
                    </InputGroup>
                  </FormControl>
                  <Button bgColor={"white"} onClick={mobileFilterOnOpen}>
                    <Icon as={VscSettings} />
                  </Button>
                </HStack>

                <Box w={"full"} mt={3}>
                  <Swiper
                    slidesPerView={"auto"}
                    spaceBetween={10}
                    freeMode={true}
                    modules={[FreeMode]}
                  >
                    <SwiperSlide
                      style={{
                        width: "40px",
                      }}
                    >
                      <IconButton
                        aria-label="favorite button"
                        colorScheme="red"
                        size={"md"}
                      >
                        <Icon as={MdBookmarkBorder} fontSize={"lg"} />
                      </IconButton>
                    </SwiperSlide>
                    <SwiperSlide
                      style={{
                        maxWidth: "240px",
                      }}
                    >
                      <Button
                        w="full"
                        size={"md"}
                        colorScheme="red"
                        rounded={"full"}
                        leftIcon={<CalendarIcon />}
                        onClick={datepickerOnOpen}
                      >
                        {dates?.checkIn
                          ? format(dates.checkIn, "dd MMMM", { locale: ru })
                          : "Заезд"}{" "}
                        -{" "}
                        {dates?.checkOut
                          ? format(dates.checkOut, "dd MMMM", { locale: ru })
                          : "Отъезд"}
                      </Button>
                    </SwiperSlide>
                    <SwiperSlide
                      style={{
                        width: "auto",
                      }}
                    >
                      <Button
                        w="150px"
                        size={"md"}
                        colorScheme="blackAlpha"
                        rounded={"full"}
                        leftIcon={<Icon as={FaUsers} fontSize={"lg"} />}
                        onClick={guestsOnOpen}
                      >
                        {guests.adultsCount + guests.childrenAges.length}{" "}
                        {getWordByNum(
                          guests.adultsCount + guests.childrenAges.length,
                          ["Гость", "Гостя", "Гостей"]
                        )}
                      </Button>
                    </SwiperSlide>
                  </Swiper>
                </Box>
              </>
            }
          >
            <SimpleGrid
              columns={{
                ...(isLessThan630
                  ? {
                      base: 1,
                    }
                  : { base: 1, sm: 2 }),
              }}
              spacing={5}
              pt={5}
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
          placement="bottom"
          onClose={mobileFilterOnClose}
          size={"full"}
        >
          <DrawerOverlay />
          <DrawerContent
            onTouchStart={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            bgColor={"none"}
            h={"95dvh"}
            roundedTop={"2xl"}
          >
            <DrawerHeader p={6}>Фильтры</DrawerHeader>
            <DrawerCloseButton />
            <DrawerBody h={"100dvh"} p={0} bgColor={"white"}>
              <Stack
                spacing={4}
                w="full"
                h="full"
                overflowY={"auto"}
                position={"relative"}
                bgColor={"white"}
                rounded={"lg"}
              >
                <FormCard disableBg title="Выбирайте лучшее">
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
                <FormCard disableBg title="Варианты размещения">
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
                <FormCard disableBg title="Отдельные спальни">
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
                  disableBg
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
                <FormCard disableBg title="Площадь">
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
                  disableBg
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
                  disableBg
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
                  disableBg
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
                  disableBg
                >
                  <Stack>
                    <Checkbox colorScheme="red">Парковка</Checkbox>
                    <Checkbox colorScheme="red">Беседка</Checkbox>
                    <Checkbox colorScheme="red">Мангал</Checkbox>
                    <Checkbox colorScheme="red">Бассейн</Checkbox>
                    <Checkbox colorScheme="red">Детская площадка</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard title="Этаж" disableBg>
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
                  disableBg
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
                <FormCard title="Санузел" disableBg>
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
                  disableBg
                >
                  <Stack>
                    <Checkbox colorScheme="red">Завтрак</Checkbox>
                    <Checkbox colorScheme="red">Обед</Checkbox>
                    <Checkbox colorScheme="red">Ужин</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard
                  disableBg
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
                <FormCard title="Доступность" disableBg>
                  <Stack>
                    <Checkbox colorScheme="red">Лифт</Checkbox>
                    <Checkbox colorScheme="red">Доступ для инвалидов</Checkbox>
                  </Stack>
                </FormCard>
                <FormCard title="Дополнительно" disableBg>
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
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <GuestsModal
          onGuestsChange={(value) => {
            dispatch(searchObjectAction.setGuestData(value));
          }}
          value={guests}
          isOpen={guestsIsOpen}
          onClose={guestsOnClose}
        />
        <MobileCalendarDrawer
          isOpen={datepickerIsOpen}
          onClose={datepickerOnClose}
          dates={calendarDates}
          handleSelectDate={handleSelectDate}
        />
      </Show>
    </>
  );
};
