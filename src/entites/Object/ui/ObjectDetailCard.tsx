import { QuestionOutlineIcon, StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  Button,
  Text,
  Center,
  CircularProgress,
  Tag,
  TagLabel,
  Collapse,
  useDisclosure,
  Stack,
  List,
  ListItem,
  ListIcon,
  Alert,
  Tooltip,
  Progress,
} from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { ObjectDetailInfoCard } from "./ObjectDetailInfoCard";
import { CommentItem, CommentOwner } from "@entites/Comments";
import { Map2GIS } from "@shared/ui/2GIS";
import { Marker2GIS } from "@shared/ui/2GIS/Marker2GIS";

const Slider = lazy(() => import("./ObjectDetailSlider"));
export const ObjectDetailCard = () => {
  const { isOpen: descriptionTextIsOpen, onToggle: descriptionTextOnToggle } =
    useDisclosure();
  const { isOpen: facilitiesIsOpen, onToggle: facilitiesOnToggle } =
    useDisclosure();
  return (
    <Box w={"full"}>
      <Heading fontSize={"22px"}>
        Просторные апартаменты Веста на Спасском переулке
      </Heading>
      <HStack spacing={4} mt={2}>
        <HStack fontSize={"md"} cursor={"pointer"}>
          <HStack spacing={1}>
            <StarIcon color={"red.500"} />
            <Text fontSize={"14px"} fontWeight={"medium"}>
              9,5
            </Text>
          </HStack>
          <Text fontSize={"14px"} color={"gray.500"} fontWeight={"medium"}>
            1028 отзывов
          </Text>
        </HStack>
        <Text color={"gray.500"} fontSize={"14px"} fontWeight={"medium"}>
          Бостери, Казак Тукуму, 75а/10
        </Text>
        <Button variant={"link"} colorScheme="red">
          Показать на карте
        </Button>
      </HStack>
      <Box mt={4} w={"100%"}>
        <Suspense
          fallback={
            <Center>
              <CircularProgress isIndeterminate color="red.600" />
            </Center>
          }
        >
          <Slider />
        </Suspense>
      </Box>
      <Stack mt={5} spacing={5}>
        <ObjectDetailInfoCard
          title={
            <>
              3-комнатная квартира 90м<sup>2</sup>
            </>
          }
        >
          <Box color="gray.500" fontWeight={"medium"} fontSize={"md"} mt={1}>
            6 гостей &bull; 3 кровати &bull; 2 спальни &bull; кухня-гостиная
            &bull; этаж 3 из 4.
          </Box>

          <Tag borderRadius="full" variant="solid" colorScheme="blue" mt={2}>
            <TagLabel>Гости рекомендуют</TagLabel>
          </Tag>
          <Text mt={2}>
            <Collapse
              in={descriptionTextIsOpen}
              startingHeight={70}
              style={{
                display: "block",
              }}
            >
              Просторная 3-х комнатная квартира, с двумя изолированными
              комнатами, расположена в Адмиралтейском районе Петербурга, в 1
              минуте от метро Сенная/Садовая/Спасская. Квартира порадует Вас
              комфортом – в ней есть пол с подогревом, посудомоечная машина, а
              также удобная рабочая зона. Расположение квартиры позволит Вам
              начать изучение города прямо с порога, а после длительных прогулок
              Вы сможете быстро добраться обратно из любой точки города. Почему
              эта квартира отлично подходит вам? расположена в 5 минутах пешком
              от метро Сенная/Спасская/Садовая; двуспальная кровать в спальне и
              комфортный двуспальный диван в гостиной и во второй спальне; пол с
              подогревом; бесплатный WI-Fi и техника (телевизор, стиральная
              машина, плита, холодильник, духовка, кофеварка, посудомоечная
              машина, микроволновая печь, электрочайник, фен, утюг); +посуда и
              кухонные принадлежности для приготовления и приема пищи. У нас
              высокие стандарты уборки! Гарантируем чистоту и порядок. Квартира
              расположена в самом центре города, в Золотом Треугольнике, что
              является одним из основных преимуществ – Вам не придется ездить на
              транспорте или метро. Вы с легкостью доберетесь пешком до основных
              достопримечательностей - Казанский и Исаакиевский собор, Спас на
              Крови, Дворцовая площадь с Эрмитажем, Адмиралтейство, Дворцовая
              набережная и набережная Канала Грибоедова. До Невского проспекта –
              всего 7 минут пешком. Размещаем командированных гостей, работаем с
              юридическими лицами и организациями; Мы предоставляем полный пакет
              отчетных документов; Оплата любым удобным способом: наличные,
              безналичный расчет, оплата по терминалу! Возможно проживание с
              домашними животными - по предварительному согласованию! Организуем
              дополнительный сервис: трансфер, питание и заказ продуктов,
              удобства для проживания с детьми (детская кроватка, манеж,
              стульчик), заказ экскурсий и билетов, а также украшение
              апартаментов и заказ цветов, десертов и шаров. Бронируйте, ждем
              вас в гости!
            </Collapse>
            <Box as="span">...</Box>
            <Button onClick={descriptionTextOnToggle} variant={"link"}>
              еще
            </Button>
          </Text>
          <Text fontSize={"md"} fontWeight={"medium"}>
            Спальные места: 6
          </Text>
          <Text>3 двуспальных кровати</Text>
        </ObjectDetailInfoCard>
        <ObjectDetailInfoCard title={"Правила объекта размещения"}>
          <HStack justifyContent={"space-between"}>
            <HStack w="full" maxW={"96"} justifyContent={"space-between"}>
              <Stack>
                <Text fontSize={"lg"} fontWeight={"medium"}>
                  Заезд
                </Text>
                <Text fontSize={"lg"}>после 15:00</Text>
              </Stack>
              <Stack>
                <Text fontSize={"lg"} fontWeight={"medium"}>
                  Отъезд
                </Text>
                <Text fontSize={"lg"}>до 12:00</Text>
              </Stack>
            </HStack>
            <Stack w={"50%"}>
              <Text fontSize={"lg"} fontWeight={"medium"}>
                Минимальный срок проживания
              </Text>
              <Text fontSize={"lg"}>от 1 до 6 суток</Text>
            </Stack>
          </HStack>
          <List mt={4} spacing={2}>
            <ListItem fontWeight={"medium"}>
              <ListIcon />
              можно с детьми любого возраста
            </ListItem>
            <ListItem fontWeight={"medium"}>
              <ListIcon />
              можно с детьми любого возраста
            </ListItem>{" "}
            <ListItem fontWeight={"medium"}>
              <ListIcon />
              можно с детьми любого возраста
            </ListItem>
          </List>
          <Alert mt={4} status="warning" rounded={"md"}>
            <HStack>
              <HStack spacing={4}>
                <Text fontWeight={"medium"}>5000$</Text>
                <Text>страховой депозит (возвращается при отъезде)</Text>
              </HStack>

              <Tooltip
                hasArrow
                label="Залог за сохранность имущества. Хозяин может взять его при заселении и вернуть при отъезде, если ничего не испорчено."
                placement="top"
              >
                <QuestionOutlineIcon />
              </Tooltip>
            </HStack>
          </Alert>
        </ObjectDetailInfoCard>
        <ObjectDetailInfoCard title="Основные удобства">
          <List
            mt={4}
            gap={2}
            flexWrap={"wrap"}
            display={"flex"}
            alignItems={"center"}
          >
            <ListItem
              maxW={"calc(50% - 0.5rem)"}
              w={"calc(50% - 0.5rem)"}
              fontWeight={"medium"}
            >
              <ListIcon />
              можно с детьми любого возраста
            </ListItem>
            <ListItem
              maxW={"calc(50% - 0.5rem)"}
              w={"calc(50% - 0.5rem)"}
              fontWeight={"medium"}
            >
              <ListIcon />
              можно с детьми любого возраста
            </ListItem>
            <ListItem
              maxW={"calc(50% - 0.5rem)"}
              w={"calc(50% - 0.5rem)"}
              fontWeight={"medium"}
            >
              <ListIcon />
              можно с детьми любого возраста
            </ListItem>
            <ListItem
              maxW={"calc(50% - 0.5rem)"}
              w={"calc(50% - 0.5rem)"}
              fontWeight={"medium"}
            >
              <ListIcon />
              можно с детьми любого возраста
            </ListItem>
            <ListItem
              maxW={"calc(50% - 0.5rem)"}
              w={"calc(50% - 0.5rem)"}
              fontWeight={"medium"}
            >
              <ListIcon />
              можно с детьми любого возраста
            </ListItem>
            <ListItem
              maxW={"calc(50% - 0.5rem)"}
              w={"calc(50% - 0.5rem)"}
              fontWeight={"medium"}
            >
              <ListIcon />
              можно с детьми любого возраста
            </ListItem>
          </List>
          <Box mt={4}>
            <Collapse in={facilitiesIsOpen}>
              <HStack flexWrap={"wrap"}>
                <Box maxW="calc(50% - 0.5rem)" w="calc(50% - 0.5rem)">
                  <Text fontSize={"lg"} fontWeight={"medium"}>
                    Ванная комната
                  </Text>
                  <Stack spacing={1} mt={3}>
                    <Text>Количество ванных комнат с туалетом 1</Text>
                    <Text>Количество ванных комнат с туалетом 1</Text>
                    <Text>Количество ванных комнат с туалетом 1</Text>
                    <Text>Количество ванных комнат с туалетом 1</Text>
                    <Text>Количество ванных комнат с туалетом 1</Text>
                  </Stack>
                </Box>
                <Box maxW="calc(50% - 0.5rem)" w="calc(50% - 0.5rem)">
                  <Text fontSize={"lg"} fontWeight={"medium"}>
                    Ванная комната
                  </Text>
                  <Stack spacing={1} mt={3}>
                    <Text>Количество ванных комнат с туалетом 1</Text>
                    <Text>Количество ванных комнат с туалетом 1</Text>
                    <Text>Количество ванных комнат с туалетом 1</Text>
                    <Text>Количество ванных комнат с туалетом 1</Text>
                    <Text>Количество ванных комнат с туалетом 1</Text>
                  </Stack>
                </Box>
              </HStack>

              <Box mt={4}>
                <Text fontSize={"lg"} fontWeight={"medium"}>
                  Трансфер
                </Text>
                <Stack spacing={1} mt={3}>
                  <Text>
                    Трансфер предоставляется по запросу и за дополнительную
                    стоимость.
                  </Text>
                </Stack>
              </Box>
            </Collapse>
          </Box>

          <Button variant={"outline"} onClick={facilitiesOnToggle} mt={6}>
            {!facilitiesIsOpen && "Показать все удобства"}
            {facilitiesIsOpen && "Скрыть все удобства"}
          </Button>
        </ObjectDetailInfoCard>
        <ObjectDetailInfoCard
          title={
            <HStack alignItems={"center"} spacing={12}>
              <Text>Оценка гостей</Text>
              <HStack fontSize={"xl"} cursor={"pointer"}>
                <HStack spacing={1}>
                  <StarIcon color={"red.500"} />
                  <Text fontWeight={"medium"}>9,5</Text>
                </HStack>
                <Text
                  mt={1}
                  color={"gray.500"}
                  fontSize={"sm"}
                  fontWeight={"medium"}
                >
                  37 отзывов
                </Text>
              </HStack>
            </HStack>
          }
        >
          <HStack mt={4} flexWrap={"wrap"}>
            <HStack w="calc(50% - 0.5rem)" spacing={0}>
              <Text maxW="50%" w="50%">
                Цена - качество
              </Text>
              <HStack maxW="50%" w="50%" spacing={4}>
                <Progress
                  value={93}
                  size="xs"
                  colorScheme="red"
                  rounded={"full"}
                  w={"full"}
                  h={2}
                />
                <Text>9,3</Text>
              </HStack>
            </HStack>
            <HStack w="calc(50% - 0.5rem)" spacing={0}>
              <Text maxW="50%" w="50%">
                Цена - качество
              </Text>
              <HStack maxW="50%" w="50%" spacing={4}>
                <Progress
                  value={93}
                  size="xs"
                  colorScheme="red"
                  rounded={"full"}
                  w={"full"}
                  h={2}
                />
                <Text>9,3</Text>
              </HStack>
            </HStack>
            <HStack w="calc(50% - 0.5rem)" spacing={0}>
              <Text maxW="50%" w="50%">
                Цена - качество
              </Text>
              <HStack maxW="50%" w="50%" spacing={4}>
                <Progress
                  value={93}
                  size="xs"
                  colorScheme="red"
                  rounded={"full"}
                  w={"full"}
                  h={2}
                />
                <Text>9,3</Text>
              </HStack>
            </HStack>
          </HStack>
          <Stack spacing={4} mt={20}>
            <CommentItem>
              <CommentOwner />
            </CommentItem>
            <CommentItem>
              <CommentOwner />
            </CommentItem>
            <CommentItem>
              <CommentOwner />
            </CommentItem>
            <Button variant={"outline"}>Показать еще 5</Button>
          </Stack>
        </ObjectDetailInfoCard>
        <ObjectDetailInfoCard title={"Бостери, Казак Тукуму, 75а/10"}>
          <Box h={"96"}>
            <Map2GIS
              initialMapOptions={{
                center: [77.1757361557851, 42.64472838750217],
                zoom: 18,
                key: _2GIS_KEY_,

                scaleControl: true,
                minZoom: 5,
              }}
            >
              <Marker2GIS coordinates={[77.1757361557851, 42.64472838750217]} />
            </Map2GIS>
          </Box>
        </ObjectDetailInfoCard>
      </Stack>
    </Box>
  );
};
