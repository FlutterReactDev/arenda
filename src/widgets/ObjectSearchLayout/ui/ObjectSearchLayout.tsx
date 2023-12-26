import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  FormControl,
  Grid,
  GridItem,
  HStack,
  Hide,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListIcon,
  Show,
  SimpleGrid,
  Stack,
  Text,
  VStack,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";
import { ObjectCard, SimpleObjectCard } from "@entites/Object";

import { SearchMap, useSearchMap } from "@entites/Map";

import { CalendarIcon, SearchIcon } from "@chakra-ui/icons";
import { DraggbleDrawer } from "@shared/ui/DraggbleDrawer";
import { useCallback, useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { MdApartment, MdBookmarkBorder } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";

import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { GuestsModal } from "@entites/Object/ui/GuestsModal";
import { ResultSearch, useSearchObjects } from "@features/SearchObjects";
import { MobileCalendarDrawer } from "@shared/ui/MobileCalendarDrawer";
import { getWordByNum } from "@shared/utils/getWordByNum";

import Pagination from "@choc-ui/paginator";
import { FilterObjects } from "@features/FilterObjects";
import { useHeader } from "@widgets/Header";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { BiCollapse, BiExpand } from "react-icons/bi";
import { BsGeoAlt } from "react-icons/bs";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
export const ObjectSearchLayout = () => {
  const { headerHeight } = useHeader();

  const {
    addMarkers,
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

  const {
    isOpen: searchIsOpen,
    onClose: searchOnClose,
    onOpen: searchOnOpen,
  } = useDisclosure();

  const [isLessThan630] = useMediaQuery("(max-width: 630px)");
  const [isLessThen900] = useMediaQuery("(max-width: 900px)");
  const { guests, dates, setGuestData, setDates } = useSearchObjects();

  const [calendarDates, setCalendarDates] = useState<Date[]>([
    dates?.checkIn,
    dates?.checkOut,
  ]);

  const handleSelectDate = useCallback((dates: Date[]) => {
    setCalendarDates(dates);
  }, []);

  useEffect(() => {
    if (calendarDates.length == 2) {
      setDates({
        checkIn: calendarDates[0],
        checkOut: calendarDates[1],
      });
    }
  }, [calendarDates]);

  useEffect(() => {
    addMarkers(markers);
  }, []);

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
            <VStack spacing={5} pb={4}>
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
              <Pagination
                defaultCurrent={5}
                total={500}
                paginationProps={{
                  display: "flex",
                }}
                pageNeighbours={2}
                colorScheme="red"
              />
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
        <Box h="calc(100dvh - 80px)" position={"relative"}>
          <HStack position={"absolute"} top={2} left={2} zIndex={"docked"}>
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
                        onClick={searchOnOpen}
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
            <Box py={4} w="full">
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
              <HStack pt={3} justifyContent={"center"} w="full">
                <Pagination
                  pageSize={1}
                  total={10}
                  {...(isLessThen900 && {
                    size: "sm",
                    pageNeighbours: 2,
                  })}
                  {...(isLessThan630 && {
                    size: "sm",
                    pageNeighbours: 0,
                  })}
                  colorScheme="red"
                  paginationProps={{
                    display: "flex",
                  }}
                />
              </HStack>
            </Box>
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
              <FilterObjects />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <Drawer
          placement="bottom"
          onClose={searchOnClose}
          isOpen={searchIsOpen}
        >
          <DrawerOverlay />
          <DrawerContent h={"90dvh"} roundedTop={"2xl"}>
            <DrawerBody>
              <DrawerCloseButton />
              <DrawerHeader>Выбрать направления</DrawerHeader>

              <DrawerBody p="0">
                <InputGroup>
                  <Input placeholder="Курорт, город или адрес" />
                  <InputLeftElement>
                    <SearchIcon />
                  </InputLeftElement>
                </InputGroup>

                <Box mt={"4"} p="4">
                  <List color="blackAlpha.800" spacing={3} mt={2}>
                    <Flex
                      alignItems="flex-start"
                      onClick={() => {
                        searchOnClose();
                      }}
                      cursor={"pointer"}
                    >
                      <ListIcon
                        as={MdApartment}
                        fontSize={"3xl"}
                        color="blackAlpha.800"
                      />
                      <Stack
                        spacing={0}
                        borderBottom={"1px solid"}
                        borderColor={"gray.300"}
                        w="full"
                        pb={2}
                      >
                        <Text fontWeight={"medium"} fontSize={"sm"}>
                          Бостери
                        </Text>
                        <Text color="gray.500" fontSize={"small"}>
                          Ыссык-кол
                        </Text>
                      </Stack>
                    </Flex>
                  </List>
                </Box>
              </DrawerBody>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <GuestsModal
          onGuestsChange={setGuestData}
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
