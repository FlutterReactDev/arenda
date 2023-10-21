import { StarIcon } from "@chakra-ui/icons";
import {
  Box,
  Text,
  Center,
  Heading,
  Stack,
  HStack,
  Tag,
  CircularProgress,
  Divider,
  Icon,
  Grid,
  GridItem,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  Progress,
} from "@chakra-ui/react";
import { Suspense, lazy, memo } from "react";

import { FaHeart } from "react-icons/fa";
import { HiLightningBolt } from "react-icons/hi";
import { BiSolidLike } from "react-icons/bi";
const Slider = lazy(() => import("./ObjectSlider"));
export const ObjectCard = memo(() => {
  const IMAGE =
    "https://images.unsplash.com/photo-1518051870910-a46e30d9db16?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80";

  const images = [
    {
      src: "https://bit.ly/2Z4KKcF",
      id: 1,
    },
    {
      src: IMAGE,
      id: 2,
    },
    {
      src: "https://bit.ly/2Z4KKcF",
      id: 3,
    },
    {
      src: IMAGE,
      id: 4,
    },
  ];
  return (
    <Grid
      role={"group"}
      p={6}
      maxW={"full"}
      w={"full"}
      bg={"white"}
      rounded={"lg"}
      pos={"relative"}
      gridTemplateRows={"180px"}
      gridTemplateColumns={"260px 1fr 2.5px 199px"}
      gap={2}
    >
      <HStack
        position={"absolute"}
        top={0}
        left={"10px"}
        transform={"translateY(-50%)"}
        spacing={2}
      >
        <Tag bgColor={"red.600"} color="white" rounded="full">
          ТОП-10
        </Tag>
      </HStack>

      <GridItem mr={"40px"} pos={"relative"}>
        <Suspense
          fallback={
            <Center>
              <CircularProgress isIndeterminate color="red.600" />
            </Center>
          }
        >
          <Slider images={images} />
        </Suspense>
        <Box
          top={2}
          right={2}
          position={"absolute"}
          w={8}
          h={8}
          rounded={"full"}
          bgColor={"gray.100"}
          zIndex={8}
          color={"blackAlpha.500"}
          cursor={"pointer"}
          transition={"0.3s all"}
          _hover={{
            color: "red.600",
          }}
        >
          <Center h="full" w="full">
            <FaHeart />
          </Center>
        </Box>
      </GridItem>
      <GridItem>
        <Stack justifyContent={"space-between"} h={"full"}>
          <Box>
            <Box fontWeight={"medium"} fontSize={"sm"}>
              <Box as="span" color={"gray.500"} mr={2}>
                3{" "}
                <sup>
                  <StarIcon />
                </sup>
              </Box>
              <Box as="span" color={"gray.500"}>
                Апарт-отель {`"`}Хороший отель{`"`}
              </Box>
            </Box>
            <Heading size={"sm"} fontWeight={"medium"}>
              Уютный дом с площадкой для барбекю
            </Heading>

            <Box color="gray.500" fontWeight={"medium"} fontSize={"sm"} mt={1}>
              2 гостя &bull; 2 кровати &bull; 1 спальня &bull; 30 м<sup>2</sup>
            </Box>
          </Box>
          <Box>
            <Text color={"gray.500"} fontSize={"sm"} fontWeight={"medium"}>
              Бостери, Казак Тукуму, 75а/10
            </Text>
          </Box>
        </Stack>
      </GridItem>
      <GridItem>
        <Divider orientation="vertical" h={"full"} borderColor={"gray.500"} />
      </GridItem>
      <GridItem>
        <Stack
          justifyContent={"space-between"}
          alignItems={"flex-end"}
          textAlign={"right"}
          h={"full"}
        >
          <Popover
            trigger="hover"
            openDelay={0}
            closeDelay={0}
            placement="bottom-end"
          >
            <PopoverTrigger>
              <HStack fontSize={"sm"} cursor={"pointer"}>
                <Text color={"gray.500"} fontWeight={"medium"}>
                  1028 отзывов
                </Text>
                <HStack spacing={1}>
                  <StarIcon color={"red.500"} />
                  <Text fontWeight={"medium"}>9,5</Text>
                </HStack>
              </HStack>
            </PopoverTrigger>
            <PopoverContent w={"420px"}>
              <PopoverHeader>
                <HStack justifyContent={"space-between"}>
                  <Text
                    fontSize={"sm"}
                    fontWeight={"bold"}
                    color={"blackAlpha.800"}
                  >
                    Гости рекомендуют
                  </Text>
                  <Center bgColor={"red.500"} rounded={"full"} p={2}>
                    <Icon as={BiSolidLike} color={"white"} />
                  </Center>
                </HStack>
              </PopoverHeader>
              <PopoverBody p={2}>
                <Box fontSize={"sm"}>
                  <Box as="span" fontWeight={"bold"}>
                    1028
                  </Box>{" "}
                  отзывов о проживании со средней оценкой{" "}
                  <Box as="span" fontWeight={"bold"}>
                    9,5
                  </Box>{" "}
                  из{" "}
                  <Box as="span" fontWeight={"bold"}>
                    10,0
                  </Box>
                </Box>
                <HStack spacing={0} mt={4} flexWrap={"wrap"} fontSize={"small"}>
                  <HStack w="50%" gap={2}>
                    <Text> Цена - качество</Text>
                    <Progress
                      value={93}
                      size="xs"
                      colorScheme="red"
                      rounded={"full"}
                      maxW={"16"}
                      w="full"
                    />
                    <Text>9,3</Text>
                  </HStack>
                  <HStack w="50%">
                    <Text> Цена - качество</Text>
                    <Progress
                      value={93}
                      size="xs"
                      colorScheme="red"
                      rounded={"full"}
                      maxW={"16"}
                      w="full"
                    />
                    <Text>9,3</Text>
                  </HStack>
                  <HStack w="50%">
                    <Text> Цена - качество</Text>
                    <Progress
                      value={93}
                      size="xs"
                      colorScheme="red"
                      rounded={"full"}
                      maxW={"16"}
                      w="full"
                    />
                    <Text>9,3</Text>
                  </HStack>
                  <HStack w="50%">
                    <Text> Цена - качество</Text>
                    <Progress
                      value={93}
                      size="xs"
                      colorScheme="red"
                      rounded={"full"}
                      maxW={"16"}
                      w="full"
                    />
                    <Text>9,3</Text>
                  </HStack>
                </HStack>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          <Box>
            <HStack spacing={1} justifyContent={"center"} alignItems={"center"}>
              <Icon as={HiLightningBolt} color={"red.500"} />
              <Text color={"gray.500"} fontSize={"x-small"}>
                Быстрое бронирование
              </Text>
            </HStack>
            <HStack spacing={1} justifyContent={"flex-end"}>
              <Text fontWeight={"bold"}>1000 $</Text>
              <Text>за сутки</Text>
            </HStack>
            <Text color={"gray.500"} fontWeight={"medium"}>
              Всего 8000$
            </Text>
          </Box>
        </Stack>
      </GridItem>
    </Grid>
  );
});
{
  /* <div data-v-af99fcc6="" data-v-683af460="" class="avg-rating-wrapp">
  <div data-v-af99fcc6="" class="avg-rating">
    <div data-v-af99fcc6="" class="avg-rating__recommend-box">
      <p data-v-af99fcc6="" class="avg-rating__recommend-box__text">
        Гости рекомендуют
      </p>
      <span
        data-v-4d973a4f=""
        data-v-af99fcc6=""
        class="sutochno-icon icon-app-finger-like-alt"
        style="--b4d6d1cc: #f51449; --5b894a9e: 28px; --6e548142: white; --6dfd750d: 14px;"
      ></span>
    </div>
    <div data-v-af99fcc6="" class="avg-rating__container">
      <p data-v-af99fcc6="" class="avg-rating__text">
        <span data-v-af99fcc6="" class="avg-rating__text-b">
          1028 отзывов
        </span>
        <span data-v-af99fcc6=""> о проживании со средней оценкой </span>
        <span data-v-af99fcc6="" class="avg-rating__text-b">
          9,5
        </span>
        <span data-v-af99fcc6=""> из </span>
        <span data-v-af99fcc6="" class="avg-rating__text-b">
          10,0
        </span>
      </p>
      <div data-v-af99fcc6="" class="reviews__rating loading_primary">
        <div data-v-af99fcc6="" class="rating__calc">
          <div data-v-af99fcc6="" class="calc__range">
            <div data-v-af99fcc6="" class="range__item">
              <div data-v-af99fcc6="" class="range__text">
                Чистота
              </div>
              <div data-v-af99fcc6="" class="range__line">
                <div data-v-af99fcc6="" class="line">
                  <div
                    data-v-af99fcc6=""
                    class="line_complete"
                    style="width: 90.8485%; background-color: rgb(245, 20, 73);"
                  ></div>
                </div>
                <div data-v-af99fcc6="" class="range__rating">
                  9,1
                </div>
              </div>
            </div>
            <div data-v-af99fcc6="" class="range__item">
              <div data-v-af99fcc6="" class="range__text">
                Цена - качество
              </div>
              <div data-v-af99fcc6="" class="range__line">
                <div data-v-af99fcc6="" class="line">
                  <div
                    data-v-af99fcc6=""
                    class="line_complete"
                    style="width: 93.0509%; background-color: rgb(245, 20, 73);"
                  ></div>
                </div>
                <div data-v-af99fcc6="" class="range__rating">
                  9,3
                </div>
              </div>
            </div>
            <div data-v-af99fcc6="" class="range__item">
              <div data-v-af99fcc6="" class="range__text">
                Качество обслуживания
              </div>
              <div data-v-af99fcc6="" class="range__line">
                <div data-v-af99fcc6="" class="line">
                  <div
                    data-v-af99fcc6=""
                    class="line_complete"
                    style="width: 93.78%; background-color: rgb(245, 20, 73);"
                  ></div>
                </div>
                <div data-v-af99fcc6="" class="range__rating">
                  9,4
                </div>
              </div>
            </div>
            <div data-v-af99fcc6="" class="range__item">
              <div data-v-af99fcc6="" class="range__text">
                Расположение
              </div>
              <div data-v-af99fcc6="" class="range__line">
                <div data-v-af99fcc6="" class="line">
                  <div
                    data-v-af99fcc6=""
                    class="line_complete"
                    style="width: 94.9376%; background-color: rgb(245, 20, 73);"
                  ></div>
                </div>
                <div data-v-af99fcc6="" class="range__rating">
                  9,5
                </div>
              </div>
            </div>
            <div data-v-af99fcc6="" class="range__item">
              <div data-v-af99fcc6="" class="range__text">
                Своевременность заселения
              </div>
              <div data-v-af99fcc6="" class="range__line">
                <div data-v-af99fcc6="" class="line">
                  <div
                    data-v-af99fcc6=""
                    class="line_complete"
                    style="width: 98.4901%; background-color: rgb(245, 20, 73);"
                  ></div>
                </div>
                <div data-v-af99fcc6="" class="range__rating">
                  9,8
                </div>
              </div>
            </div>
            <div data-v-af99fcc6="" class="range__item">
              <div data-v-af99fcc6="" class="range__text">
                Соответствие фото
              </div>
              <div data-v-af99fcc6="" class="range__line">
                <div data-v-af99fcc6="" class="line">
                  <div
                    data-v-af99fcc6=""
                    class="line_complete"
                    style="width: 96.7782%; background-color: rgb(245, 20, 73);"
                  ></div>
                </div>
                <div data-v-af99fcc6="" class="range__rating">
                  9,7
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>; */
}
