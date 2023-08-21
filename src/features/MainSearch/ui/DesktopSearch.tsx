import {
  Button,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  List,
  ListItem,
  ListIcon,
  HStack,
  Tag,
  Box,
  Center,
  Divider,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { DubleCalendar } from "./Calendar";
import { useState } from "react";
import { CalendarDate, CalendarValues } from "@uselessdev/datepicker";

export const DesktopSearch = () => {
  const [dates, setDates] = useState<CalendarValues | CalendarDate>({});

  const handleSelectDate = (dates: CalendarValues | CalendarDate) => {
    setDates(dates);
  };

  return (
    <Box>
      <Popover>
        <Stack direction="row" gap={0} maxW="3xl" w="100%" minH={14} mt={10}>
          <Popover>
            <InputGroup>
              <PopoverTrigger>
                <Input
                  boxShadow="xs"
                  h={"auto"}
                  borderLeft={"0"}
                  borderLeftRadius={"full"}
                  placeholder="Куда едем"
                  padding={0}
                  paddingLeft={"5"}
                  paddingTop={"3"}
                  w={"full"}
                />
              </PopoverTrigger>

              <InputLeftElement
                paddingLeft={"5"}
                paddingTop={"2"}
                width={"auto"}
                height={"auto"}
              >
                <Text fontSize="xs">Курорт, город или адрес</Text>
              </InputLeftElement>
            </InputGroup>
            <PopoverContent p={"2"}>
              <Text>Популярные направления </Text>
              <List color="blackAlpha.800" fontSize="xs" spacing={3} mt={2}>
                <ListItem>
                  <ListIcon as={SearchIcon} color="blackAlpha.800" />
                  Санкт-Петербург, Санкт-Петербург и область, Россия
                </ListItem>
                <ListItem>
                  <ListIcon as={SearchIcon} color="blackAlpha.800" />
                  Санкт-Петербург, Санкт-Петербург и область, Россия
                </ListItem>
                <ListItem>
                  <ListIcon as={SearchIcon} color="blackAlpha.800" />
                  Санкт-Петербург, Санкт-Петербург и область, Россия
                </ListItem>
                <ListItem>
                  <ListIcon as={SearchIcon} color="blackAlpha.800" />
                  Санкт-Петербург, Санкт-Петербург и область, Россия
                </ListItem>
                <ListItem>
                  <ListIcon as={SearchIcon} color="blackAlpha.800" />
                  Санкт-Петербург, Санкт-Петербург и область, Россия
                </ListItem>
                <ListItem>
                  <ListIcon as={SearchIcon} color="blackAlpha.800" />
                  Санкт-Петербург, Санкт-Петербург и область, Россия
                </ListItem>
              </List>
            </PopoverContent>
          </Popover>

          <PopoverTrigger>
            <Stack direction="row" gap={0}>
              <InputGroup>
                <Input
                  placeholder="Когда"
                  padding={0}
                  paddingLeft={"2"}
                  paddingTop={"3"}
                  h={"auto"}
                  borderRadius={"none"}
                />
                <InputLeftElement
                  paddingLeft={"2"}
                  paddingTop={"2"}
                  width={"auto"}
                  height={"auto"}
                >
                  <Text fontSize="xs">Заезд</Text>
                </InputLeftElement>
              </InputGroup>

              <InputGroup>
                <Input
                  placeholder="Когда"
                  padding={0}
                  paddingLeft={"2"}
                  paddingTop={"3"}
                  h={"auto"}
                  borderRadius={"none"}
                />
                <InputLeftElement
                  paddingLeft={"2"}
                  paddingTop={"2"}
                  width={"auto"}
                  height={"auto"}
                >
                  <Text fontSize="xs">Отъезд</Text>
                </InputLeftElement>
              </InputGroup>
            </Stack>
          </PopoverTrigger>
          <Popover>
            <PopoverContent rounded={"2xl"} p={2}>
              <HStack justifyContent={"space-between"} p={"4"}>
                <Box>
                  Взрослые
                  <Box>от 18 лет</Box>
                </Box>
                <HStack gap={"2"}>
                  <Button rounded={"full"} p={4}>
                    +
                  </Button>
                  <Box as="span">0</Box>
                  <Button rounded={"full"} p={4}>
                    -
                  </Button>
                </HStack>
              </HStack>
              <Divider />
              <HStack justifyContent={"space-between"} p={"4"}>
                <Box>
                  Взрослые
                  <Box>от 18 лет</Box>
                </Box>
                <HStack gap={"2"}>
                  <Button rounded={"full"} p={4}>
                    +
                  </Button>
                  <Box as="span">0</Box>
                  <Button rounded={"full"} p={4}>
                    -
                  </Button>
                </HStack>
              </HStack>
              <Divider />
              <Box p={4}>
                <Button w="full">Готово</Button>
              </Box>
            </PopoverContent>
            <InputGroup>
              <InputLeftElement
                paddingLeft={"2"}
                paddingTop={"2"}
                width={"auto"}
                height={"auto"}
              >
                <Text fontSize="xs">Гости</Text>
              </InputLeftElement>
              <PopoverTrigger>
                <Input
                  padding={0}
                  paddingLeft={"2"}
                  paddingTop={"3"}
                  h={"auto"}
                  borderRightRadius={"full"}
                />
              </PopoverTrigger>

              <InputRightElement w={14} height={"100%"}>
                <Button colorScheme="red" w={12} h={12} borderRadius={"full"}>
                  <SearchIcon />
                </Button>
              </InputRightElement>
            </InputGroup>
          </Popover>

          <PopoverContent borderRadius={"20px"} border={"none"} w={"100%"}>
            <DubleCalendar
              dates={dates as CalendarValues}
              handleSelectDate={handleSelectDate}
            />
          </PopoverContent>
        </Stack>
      </Popover>
      <Center>
        <HStack gap={"2"} mt={5}>
          <Text>Например:</Text>
          <Tag rounded={"full"}>Санкт-Петербург</Tag>
          <Tag rounded={"full"}>Санкт-Петербург</Tag>
          <Tag rounded={"full"}>Санкт-Петербург</Tag>
          <Tag rounded={"full"}>Санкт-Петербург</Tag>
        </HStack>
      </Center>
    </Box>
  );
};
