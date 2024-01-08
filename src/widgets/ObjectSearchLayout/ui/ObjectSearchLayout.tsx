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
  Stack,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";

import { useSearchMap } from "@entites/Map";

import { CalendarIcon, SearchIcon } from "@chakra-ui/icons";
import { memo, useCallback, useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { MdApartment, MdBookmarkBorder } from "react-icons/md";
import { VscSettings } from "react-icons/vsc";

import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import { GuestsModal } from "@entites/Object/ui/GuestsModal";
import { useSearchObjects } from "@features/SearchObjects";
import { MobileCalendarDrawer } from "@shared/ui/MobileCalendarDrawer";
import { getWordByNum } from "@shared/utils/getWordByNum";

import { FilterObjects } from "@features/FilterObjects";
import { useHeader } from "@widgets/Header";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { ObjectSearchHeader } from "./ObjectSearchHeader";
import { ObjectSearchList } from "./ObjectSearchList";
import { ObjectSearchMap } from "./ObjectSearchMap";
export const ObjectSearchLayout = memo(() => {
  const { headerHeight } = useHeader();
  const [mapIsLoaded, setMapIsLoaded] = useState(false);
  const { mapInstance } = useSearchMap();

  useEffect(() => {
    if (mapInstance) {
      setMapIsLoaded(true);
    }
  }, [mapInstance]);

  const { isOpen: mapIsOpen, onToggle: mapOnToggle } = useDisclosure();

  const {
    isOpen: datepickerIsOpen,
    onOpen: datepickerOnOpen,
    onClose: datepickerOnClose,
  } = useDisclosure();

  const {
    isOpen: mobileFilterIsOpen,
    onOpen: mobileFilterOnOpen,
    onClose: mobileFilterOnClose,
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
  const {
    isOpen: searchResultIsOpen,
    onClose: searchResultOnClose,
    onOpen: searchResultOnOpen,
  } = useDisclosure();

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
            <ObjectSearchHeader />
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
                <ObjectSearchList mapIsLoaded={mapIsLoaded} />
              </Hide>

              <Show below="xl">
                <ObjectSearchList isMobile mapIsLoaded={mapIsLoaded} />
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
              <ObjectSearchMap
                mapIsLoaded={mapIsLoaded}
                mapIsOpen={mapIsOpen}
                mapOnToggle={mapOnToggle}
              />
            </Box>
          </GridItem>
        </Grid>
      </Show>
      <Show breakpoint="(max-width: 900px)">
        <Box h="calc(100dvh - 80px)" position={"relative"} overflow={"hidden"}>
          <ObjectSearchMap
            mapIsOpen={mapIsOpen}
            mapOnToggle={mapOnToggle}
            mapIsLoaded={mapIsLoaded}
          />
          <Box
            pos="fixed"
            textAlign={"center"}
            bottom={10}
            left={0}
            right={0}
            zIndex={"dropdown"}
          >
            <Button
              colorScheme="blue"
              onClick={searchResultOnOpen}
              rounded={"full"}
              leftIcon={<SearchIcon />}
            >
              Показать обекты
            </Button>
          </Box>

          <Drawer
            placement="bottom"
            onClose={searchResultOnClose}
            isOpen={searchResultIsOpen}
          >
            <DrawerOverlay />
            <DrawerContent h={"95dvh"} roundedTop={"2xl"}>
              <DrawerCloseButton />
              <DrawerHeader
                px={2}
                pt="14"
                bgColor={"gray.200"}
                roundedTop={"2xl"}
              >
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
              </DrawerHeader>

              <DrawerBody p="0" bgColor={"gray.100"}>
                <Box mt={"4"} p="2">
                  <ObjectSearchList
                    withGrid
                    isMobile
                    mapIsLoaded={mapIsLoaded}
                  />
                </Box>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
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
});
