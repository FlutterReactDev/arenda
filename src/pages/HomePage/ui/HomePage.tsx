import {
  Box,
  Card,
  CardBody,
  Container,
  Flex,
  Heading,
  Image,
  LinkOverlay,
  SimpleGrid,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SimpleObjectCard } from "@entites/Object";
import { ReviewCard } from "@entites/Review";
import { MainSearch } from "@features/SearchObjects";

const HomePage = () => {
  const testimonials = [
    {
      name: "Brandon P.",
      role: "Chief Marketing Officer",
      content:
        "It really saves me time and effort. It is exactly what our business has been lacking. EEZY is the most valuable business resource we have EVER purchased. After using EEZY my business skyrocketed!",
      avatar:
        "https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    },
    {
      name: "Krysta B.",
      role: "Entrepreneur",
      content:
        "I didn't even need training. We've used EEZY for the last five years. I have gotten at least 50 times the value from EEZY. I made back the purchase price in just 48 hours!",
      avatar:
        "https://images.unsplash.com/photo-1598550874175-4d0ef436c909?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    },
    {
      name: "Darcy L.",
      role: "Movie star",
      content:
        "Thank you for making it painless, pleasant and most of all, hassle free! I'm good to go. No matter where you go, EEZY is the coolest, most happening thing around! I love EEZY!",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=334&q=80",
    },
    {
      name: "Daniel T.",
      role: "Musician",
      content:
        "I am so pleased with this product. EEZY is both attractive and highly adaptable. Without EEZY, we would have gone bankrupt by now. Thank you for creating this product!",
      avatar:
        "https://images.unsplash.com/photo-1606513542745-97629752a13b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
    },
  ];

  return (
    <Box bgColor={"blackAlpha.50"} py={32}>
      <main>
        <Heading color="blackAlpha.900" size="3xl" textAlign="center">
          Ваш отдых начинается здесь
        </Heading>
        <Text
          color="blackAlpha.300"
          fontWeight={"bold"}
          textAlign="center"
          mt={"4"}
          fontSize={"larger"}
        >
          Квартиры, отели, гостевые дома — по Кыргызстану
        </Text>
        <MainSearch />
        <Box>
          <Heading color="blackAlpha.900" size="xl" textAlign="center" mt={16}>
            Куда поехать
          </Heading>
          <Container maxW="container.xl">
            <SimpleGrid mt={"6"} minChildWidth="280px" spacing="40px">
              <Card data-group rounded={"2xl"}>
                <LinkOverlay href="#" h={"full"}>
                  <CardBody
                    overflow={"hidden"}
                    rounded={"2xl"}
                    padding={0}
                    position={"relative"}
                    h={"full"}
                  >
                    <Image
                      _groupHover={{
                        transform: "scale(1.1)",
                      }}
                      transition="0.3s all"
                      rounded={"2xl"}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      src="https://invest.gov.kg/wp-content/uploads/2019/10/Balykchy2-1-1024x768.jpg"
                    />

                    <Box
                      position="absolute"
                      top={0}
                      width={"100%"}
                      h={"100%"}
                      px={"4"}
                      py={"6"}
                    >
                      <VStack
                        h={"100%"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Tag rounded={"full"} variant="solid">
                          16 602 варианта
                        </Tag>
                        <Heading color="white" size={"lg"}>
                          Балыкчы
                        </Heading>
                      </VStack>
                    </Box>
                  </CardBody>
                </LinkOverlay>
              </Card>
              <Card data-group rounded={"2xl"}>
                <LinkOverlay href="#" h={"full"}>
                  <CardBody
                    overflow={"hidden"}
                    rounded={"2xl"}
                    padding={0}
                    position={"relative"}
                    h={"full"}
                  >
                    <Image
                      _groupHover={{
                        transform: "scale(1.1)",
                      }}
                      transition="0.3s all"
                      rounded={"2xl"}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      src="https://sputnik.kg/img/07e7/05/1f/1075806125_253:0:2582:1747_1920x0_80_0_0_1a84755e75883c80671af316bfbef484.jpg"
                    />

                    <Box
                      position="absolute"
                      top={0}
                      width={"100%"}
                      h={"100%"}
                      px={"4"}
                      py={"6"}
                    >
                      <VStack
                        h={"100%"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Tag rounded={"full"} variant="solid">
                          16 602 варианта
                        </Tag>
                        <Heading color="white" size={"lg"}>
                          Чолпон-Ата
                        </Heading>
                      </VStack>
                    </Box>
                  </CardBody>
                </LinkOverlay>
              </Card>
              <Card data-group rounded={"2xl"}>
                <LinkOverlay href="#" h={"full"}>
                  <CardBody
                    overflow={"hidden"}
                    rounded={"2xl"}
                    padding={0}
                    position={"relative"}
                    h={"full"}
                  >
                    <Image
                      _groupHover={{
                        transform: "scale(1.1)",
                      }}
                      transition="0.3s all"
                      rounded={"2xl"}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      src="https://w-sail.com/wp-content/uploads/2022/09/bosteri.jpg"
                    />

                    <Box
                      position="absolute"
                      top={0}
                      width={"100%"}
                      h={"100%"}
                      px={"4"}
                      py={"6"}
                    >
                      <VStack
                        h={"100%"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Tag rounded={"full"} variant="solid">
                          16 602 варианта
                        </Tag>
                        <Heading color="white" size={"lg"}>
                          Бостери
                        </Heading>
                      </VStack>
                    </Box>
                  </CardBody>
                </LinkOverlay>
              </Card>
              <Card data-group rounded={"2xl"}>
                <LinkOverlay href="#" h={"full"}>
                  <CardBody
                    overflow={"hidden"}
                    rounded={"2xl"}
                    padding={0}
                    position={"relative"}
                    h={"full"}
                  >
                    <Image
                      _groupHover={{
                        transform: "scale(1.1)",
                      }}
                      transition="0.3s all"
                      rounded={"2xl"}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      src="https://rosskurort.com/upload/iblock/7f5/102482460.jpg"
                    />

                    <Box
                      position="absolute"
                      top={0}
                      width={"100%"}
                      h={"100%"}
                      px={"4"}
                      py={"6"}
                    >
                      <VStack
                        h={"100%"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Tag rounded={"full"} variant="solid">
                          16 602 варианта
                        </Tag>
                        <Heading color="white" size={"lg"}>
                          Тамчы
                        </Heading>
                      </VStack>
                    </Box>
                  </CardBody>
                </LinkOverlay>
              </Card>
              <Card data-group rounded={"2xl"}>
                <LinkOverlay href="#" h={"full"}>
                  <CardBody
                    overflow={"hidden"}
                    rounded={"2xl"}
                    padding={0}
                    position={"relative"}
                    h={"full"}
                  >
                    <Image
                      _groupHover={{
                        transform: "scale(1.1)",
                      }}
                      transition="0.3s all"
                      rounded={"2xl"}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      src="https://sputnik.kg/img/104024/34/1040243488_16:0:1891:1406_1400x0_80_0_0_e006daf1d8e61498ed4df575d6fd1912.jpg"
                    />

                    <Box
                      position="absolute"
                      top={0}
                      width={"100%"}
                      h={"100%"}
                      px={"4"}
                      py={"6"}
                    >
                      <VStack
                        h={"100%"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Tag rounded={"full"} variant="solid">
                          16 602 варианта
                        </Tag>
                        <Heading color="white" size={"lg"}>
                          Тору-Айгыр
                        </Heading>
                      </VStack>
                    </Box>
                  </CardBody>
                </LinkOverlay>
              </Card>
              <Card data-group rounded={"2xl"}>
                <LinkOverlay href="#" h={"full"}>
                  <CardBody
                    overflow={"hidden"}
                    rounded={"2xl"}
                    padding={0}
                    position={"relative"}
                    h={"full"}
                  >
                    <Image
                      _groupHover={{
                        transform: "scale(1.1)",
                      }}
                      transition="0.3s all"
                      rounded={"2xl"}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      src="https://aff.bstatic.com/images/hotel/max500/728/72835530.jpg"
                    />

                    <Box
                      position="absolute"
                      top={0}
                      width={"100%"}
                      h={"100%"}
                      px={"4"}
                      py={"6"}
                    >
                      <VStack
                        h={"100%"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Tag rounded={"full"} variant="solid">
                          16 602 варианта
                        </Tag>
                        <Heading color="white" size={"lg"}>
                          Чок-Тал
                        </Heading>
                      </VStack>
                    </Box>
                  </CardBody>
                </LinkOverlay>
              </Card>
              <Card data-group rounded={"2xl"}>
                <LinkOverlay href="#" h={"full"}>
                  <CardBody
                    overflow={"hidden"}
                    rounded={"2xl"}
                    padding={0}
                    position={"relative"}
                    h={"full"}
                  >
                    <Image
                      _groupHover={{
                        transform: "scale(1.1)",
                      }}
                      transition="0.3s all"
                      rounded={"2xl"}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      src="https://triptokyrgyzstan.com/sites/default/files/media/image/c_dmitrii_luzhanskii.jpg"
                    />

                    <Box
                      position="absolute"
                      top={0}
                      width={"100%"}
                      h={"100%"}
                      px={"4"}
                      py={"6"}
                    >
                      <VStack
                        h={"100%"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Tag rounded={"full"} variant="solid">
                          16 602 варианта
                        </Tag>
                        <Heading color="white" size={"lg"}>
                          Орнок
                        </Heading>
                      </VStack>
                    </Box>
                  </CardBody>
                </LinkOverlay>
              </Card>
              <Card data-group rounded={"2xl"}>
                <LinkOverlay href="#" h={"full"}>
                  <CardBody
                    overflow={"hidden"}
                    rounded={"2xl"}
                    padding={0}
                    position={"relative"}
                    h={"full"}
                  >
                    <Image
                      _groupHover={{
                        transform: "scale(1.1)",
                      }}
                      transition="0.3s all"
                      rounded={"2xl"}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/23/55/0c/1b/caption.jpg?w=600&h=400&s=1"
                    />

                    <Box
                      position="absolute"
                      top={0}
                      width={"100%"}
                      h={"100%"}
                      px={"4"}
                      py={"6"}
                    >
                      <VStack
                        h={"100%"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Tag rounded={"full"} variant="solid">
                          16 602 варианта
                        </Tag>
                        <Heading color="white" size={"lg"}>
                          Бактуу-Долоноту
                        </Heading>
                      </VStack>
                    </Box>
                  </CardBody>
                </LinkOverlay>
              </Card>
            </SimpleGrid>
            <SimpleGrid mt={"6"} minChildWidth="160px" spacing="40px">
              <Card data-group rounded={"2xl"}>
                <LinkOverlay href="#" h={"full"}>
                  <CardBody
                    overflow={"hidden"}
                    rounded={"2xl"}
                    padding={0}
                    position={"relative"}
                    h={"full"}
                  >
                    <Image
                      _groupHover={{
                        transform: "scale(1.1)",
                      }}
                      transition="0.3s all"
                      rounded={"2xl"}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      src="https://invest.gov.kg/wp-content/uploads/2019/10/Balykchy2-1-1024x768.jpg"
                    />

                    <Box
                      position="absolute"
                      top={0}
                      width={"100%"}
                      h={"100%"}
                      px={"2"}
                      py={"3"}
                    >
                      <VStack
                        h={"100%"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Tag rounded={"full"} size={"sm"} variant="solid">
                          16 602 варианта
                        </Tag>
                        <Heading color="white" size={"md"}>
                          Балыкчы
                        </Heading>
                      </VStack>
                    </Box>
                  </CardBody>
                </LinkOverlay>
              </Card>
              <Card data-group rounded={"2xl"}>
                <LinkOverlay href="#" h={"full"}>
                  <CardBody
                    overflow={"hidden"}
                    rounded={"2xl"}
                    padding={0}
                    position={"relative"}
                    h={"full"}
                  >
                    <Image
                      _groupHover={{
                        transform: "scale(1.1)",
                      }}
                      transition="0.3s all"
                      rounded={"2xl"}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      src="https://sputnik.kg/img/07e7/05/1f/1075806125_253:0:2582:1747_1920x0_80_0_0_1a84755e75883c80671af316bfbef484.jpg"
                    />

                    <Box
                      position="absolute"
                      top={0}
                      width={"100%"}
                      h={"100%"}
                      px={"2"}
                      py={"3"}
                    >
                      <VStack
                        h={"100%"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Tag rounded={"full"} size="sm" variant="solid">
                          16 602 варианта
                        </Tag>
                        <Heading color="white" size={"md"}>
                          Чолпон-Ата
                        </Heading>
                      </VStack>
                    </Box>
                  </CardBody>
                </LinkOverlay>
              </Card>
              <Card data-group rounded={"2xl"}>
                <LinkOverlay href="#" h={"full"}>
                  <CardBody
                    overflow={"hidden"}
                    rounded={"2xl"}
                    padding={0}
                    position={"relative"}
                    h={"full"}
                  >
                    <Image
                      _groupHover={{
                        transform: "scale(1.1)",
                      }}
                      transition="0.3s all"
                      rounded={"2xl"}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      src="https://w-sail.com/wp-content/uploads/2022/09/bosteri.jpg"
                    />

                    <Box
                      position="absolute"
                      top={0}
                      width={"100%"}
                      h={"100%"}
                      px={"2"}
                      py={"3"}
                    >
                      <VStack
                        h={"100%"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Tag rounded={"full"} size={"sm"} variant="solid">
                          16 602 варианта
                        </Tag>
                        <Heading color="white" size={"md"}>
                          Бостери
                        </Heading>
                      </VStack>
                    </Box>
                  </CardBody>
                </LinkOverlay>
              </Card>
              <Card data-group rounded={"2xl"}>
                <LinkOverlay href="#" h={"full"}>
                  <CardBody
                    overflow={"hidden"}
                    rounded={"2xl"}
                    padding={0}
                    position={"relative"}
                    h={"full"}
                  >
                    <Image
                      _groupHover={{
                        transform: "scale(1.1)",
                      }}
                      transition="0.3s all"
                      rounded={"2xl"}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      src="https://rosskurort.com/upload/iblock/7f5/102482460.jpg"
                    />

                    <Box
                      position="absolute"
                      top={0}
                      width={"100%"}
                      h={"100%"}
                      px={"2"}
                      py={"3"}
                    >
                      <VStack
                        h={"100%"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Tag rounded={"full"} size="sm" variant="solid">
                          16 602 варианта
                        </Tag>
                        <Heading color="white" size={"md"}>
                          Тамчы
                        </Heading>
                      </VStack>
                    </Box>
                  </CardBody>
                </LinkOverlay>
              </Card>
              <Card data-group rounded={"2xl"}>
                <LinkOverlay href="#" h={"full"}>
                  <CardBody
                    overflow={"hidden"}
                    rounded={"2xl"}
                    padding={0}
                    position={"relative"}
                    h={"full"}
                  >
                    <Image
                      _groupHover={{
                        transform: "scale(1.1)",
                      }}
                      transition="0.3s all"
                      rounded={"2xl"}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      src="https://sputnik.kg/img/104024/34/1040243488_16:0:1891:1406_1400x0_80_0_0_e006daf1d8e61498ed4df575d6fd1912.jpg"
                    />

                    <Box
                      position="absolute"
                      top={0}
                      width={"100%"}
                      h={"100%"}
                      px={"2"}
                      py={"3"}
                    >
                      <VStack
                        h={"100%"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Tag size={"sm"} rounded={"full"} variant="solid">
                          16 602 варианта
                        </Tag>
                        <Heading size="md" color="white">
                          Тору-Айгыр
                        </Heading>
                      </VStack>
                    </Box>
                  </CardBody>
                </LinkOverlay>
              </Card>
              <Card data-group rounded={"2xl"}>
                <LinkOverlay href="#" h={"full"}>
                  <CardBody
                    overflow={"hidden"}
                    rounded={"2xl"}
                    padding={0}
                    position={"relative"}
                    h={"full"}
                  >
                    <Image
                      _groupHover={{
                        transform: "scale(1.1)",
                      }}
                      transition="0.3s all"
                      rounded={"2xl"}
                      w={"100%"}
                      h={"100%"}
                      objectFit={"cover"}
                      src="https://aff.bstatic.com/images/hotel/max500/728/72835530.jpg"
                    />

                    <Box
                      position="absolute"
                      top={0}
                      width={"100%"}
                      h={"100%"}
                      px={"2"}
                      py={"3"}
                    >
                      <VStack
                        h={"100%"}
                        alignItems={"flex-start"}
                        justifyContent={"space-between"}
                      >
                        <Tag size="sm" rounded={"full"} variant="solid">
                          16 602 варианта
                        </Tag>
                        <Heading size="md" color="white">
                          Чок-Тал
                        </Heading>
                      </VStack>
                    </Box>
                  </CardBody>
                </LinkOverlay>
              </Card>
            </SimpleGrid>
          </Container>
        </Box>
        <Box mt={"6"}>
          <Heading color="blackAlpha.900" size="xl" textAlign="center" mt={16}>
            Популярные объекты
          </Heading>
          <Container maxW="container.xl">
            <SimpleGrid columns={[1, 2, 2, 3]} spacing={5} mt={5}>
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
            </SimpleGrid>
          </Container>
        </Box>
        <Box mt={"6"}>
          <Heading color="blackAlpha.900" size="xl" textAlign="center" mt={16}>
            Определенно рекомендуем
          </Heading>
          <Container maxW="container.xl">
            <SimpleGrid columns={[1, 2, 2, 3]} spacing={5} mt={5}>
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
              <SimpleObjectCard />
            </SimpleGrid>
          </Container>
        </Box>
        <Box>
          <Heading color="blackAlpha.900" size="xl" textAlign="center" mt={16}>
            Отзывы
          </Heading>
          <Flex
            textAlign={"center"}
            justifyContent={"center"}
            direction={"column"}
            width={"full"}
            overflow={"hidden"}
            mt={4}
          >
            <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={"10"} mx={"auto"}>
              {testimonials.map((cardInfo, index) => (
                <ReviewCard key={index} {...cardInfo} index={index} />
              ))}
            </SimpleGrid>
          </Flex>
        </Box>
      </main>
    </Box>
  );
};

export default HomePage;
