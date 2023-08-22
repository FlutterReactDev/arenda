import {
  Button,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Stack,
  HStack,
  Tag,
  Box,
  Center,
  Divider,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { DubleCalendar } from "../Calendar";
import { useState } from "react";
import { CalendarDate, CalendarValues } from "@uselessdev/datepicker";


export const DesktopSearch = () => {
  const [dates, setDates] = useState<CalendarValues | CalendarDate>({});

  const handleSelectDate = (dates: CalendarValues | CalendarDate) => {
    setDates(dates);
  };

  return (
    <Box>
      <Stack direction="row" gap={0} w="870px"  minH={14} mt={10}>
        <Popover>
          <Popover>
            <InputGroup w="100%">
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
                <Text fontSize="sm">Курорт, город или адрес</Text>
              </InputLeftElement>
            </InputGroup>
            <PopoverContent minW={"full"} p={"2"}>
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
            <HStack gap={0} maxW="215px" w="full" cursor={"pointer"}>
              <Box
                p={"2"}
                w={"100%"}
                h={"full"}
                border={"1px solid"}
                borderColor="gray.200"
                borderRight={"none"}
              >
                <Text color="blackAlpha.700" fontSize={"sm"}>
                  Заезд
                </Text>
                <Text>Когда</Text>
              </Box>
              <Box
                p={"2"}
                w={"100%"}
                h={"full"}
                border={"1px solid"}
                borderColor="gray.200"
              >
                <Text color="blackAlpha.700" fontSize={"sm"}>
                  Заезд
                </Text>
                <Text>Когда</Text>
              </Box>
            </HStack>
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

            <HStack
              border={"1px solid"}
              borderColor="gray.200"
              gap={0}
              maxW="215px"
              w="full"
              cursor={"pointer"}
              borderRightRadius={"full"}
              justifyContent={"space-between"}
              pr={"1"}
            >
              <PopoverTrigger>
                <Box p={"2"} h={"full"}>
                  <Text color="blackAlpha.700" fontSize={"sm"}>
                    Гости
                  </Text>
                  <Text>2 Взрослых</Text>
                </Box>
              </PopoverTrigger>

              <Button colorScheme="red" w={12} h={12} borderRadius={"full"}>
                <SearchIcon />
              </Button>
            </HStack>
          </Popover>

          <PopoverContent borderRadius={"20px"} border={"none"} w={"100%"}>
            <DubleCalendar
              dates={dates as CalendarValues}
              handleSelectDate={handleSelectDate}
            />
          </PopoverContent>
        </Popover>
      </Stack>
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
