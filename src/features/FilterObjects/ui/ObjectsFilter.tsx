import { QuestionOutlineIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  FormControl,
  FormHelperText,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Stack,
  Switch,
  Tooltip,
  Text,
  Button,
  Center,
} from "@chakra-ui/react";
import { CheckboxList } from "@shared/ui/CheckboxList";
import { FormCard } from "@shared/ui/FormCard";
import { memo, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";

export const FilterObjects = memo(() => {
  const [windowView, setWindowView] = useState<(string | number)[]>([]);
  const [floor, setFloor] = useState<(string | number)[]>([]);
  return (
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
        <HStack justifyContent={"space-between"} alignItems={"center"} mt={2}>
          <HStack>
            <Icon as={HiLightningBolt} color={"red.500"} />
            <Text color={"gray.500"} fontSize={"sm"} fontWeight={"medium"}>
              Быстрое бронирование
            </Text>
          </HStack>
          <Switch colorScheme="red" />
        </HStack>
        <HStack justifyContent={"space-between"} alignItems={"center"} mt={2}>
          <HStack>
            <Icon as={FaHeart} color={"red.500"} />
            <Text color={"gray.500"} fontSize={"sm"} fontWeight={"medium"}>
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
          <Checkbox colorScheme="red">Глэмпинги, базы отдыха</Checkbox>
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
            <Text color={"gray.500"} fontSize={"sm"} fontWeight={"medium"}>
              Курение разрешено
            </Text>

            <Switch colorScheme="red" />
          </HStack>
          <HStack justifyContent={"space-between"}>
            <Text color={"gray.500"} fontSize={"sm"} fontWeight={"medium"}>
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
            <Text color={"gray.500"} fontSize={"sm"} fontWeight={"medium"}>
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
          <Checkbox colorScheme="red">посуда и принадлежности</Checkbox>
          <Checkbox colorScheme="red">микроволновка</Checkbox>
          <Checkbox colorScheme="red">полотенца</Checkbox>
          <Checkbox colorScheme="red">утюг с гладильной доской</Checkbox>
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
          <Checkbox colorScheme="red">Поздний отъезд разрешён</Checkbox>
          <Checkbox colorScheme="red">Бесконтактное заселение</Checkbox>
          <Checkbox colorScheme="red">отчётные документы</Checkbox>
          <Checkbox colorScheme="red">без посредников</Checkbox>
          <Checkbox colorScheme="red">Жильё для самоизоляции</Checkbox>
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
  );
});
