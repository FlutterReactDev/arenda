import AppStore from "@assets/images/AppStore.png";
import GooglePlay from "@assets/images/GooglePlay.png";
import {
  Box,
  Container,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Image,
  HStack,
  Divider,
  Button,
} from "@chakra-ui/react";
import { ReactNode, memo } from "react";
import { BsInstagram, BsTelegram, BsWhatsapp, BsYoutube } from "react-icons/bs";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export const Footer = memo(() => {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"1340"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr", md: "1fr 1fr 1fr" }}
          spacing={10}
          py={2}
        >
          <Stack spacing={6}>
            <Box>
              <HStack>
                <Text fontWeight={"bold"} fontSize={"2xl"} color={"red.600"}>
                  Turak.KG
                </Text>
              </HStack>
            </Box>
            <Text fontSize={"sm"}>
              Turak.kg — сервис бронирования жилья: отели, квартиры посуточно,
              гостевые дома, коттеджи в частном секторе
            </Text>
            <Stack direction={"row"} spacing={6}>
              <Image alt="AppStore" src={AppStore} />
              <Image alt="GooglePlay" src={GooglePlay} />
            </Stack>
          </Stack>
          <Stack>
            <ListHeader>Компания</ListHeader>
            <Box as="a" href={"#"}>
              Каталог
            </Box>
            <Box as="a" href={"#"}>
              Избранное
            </Box>
            <Box as="a" href={"#"}>
              Личный кабинет
            </Box>
          </Stack>
          <Stack>
            <ListHeader>Контакты</ListHeader>
            <Stack>
              <Box>
                <Text fontWeight={"bold"}>Email:</Text>
                <Box>
                  <Text as="a" href="mailto:momondo18@gmail.com">
                    momondo18@gmail.com
                  </Text>
                </Box>
              </Box>
              <Box>
                <Text fontWeight={"bold"}>Телефон:</Text>
                <Stack spacing={0} mt={2}>
                  <Text as="a" href="tel:+996706284777">
                    +996 (706) 284-777
                  </Text>
                  <Text as="a" href="tel:+996222999338">
                    +996 (222) 999-338
                  </Text>
                  <Text as="a" href="tel:+996(502)198-704">
                    +996 (502) 198-704
                  </Text>
                </Stack>
              </Box>
            </Stack>
            <Button
              leftIcon={<BsWhatsapp />}
              rounded={"full"}
              colorScheme="whatsapp"
              maxW={"40"}
            >
              WhatsApp
            </Button>
          </Stack>
        </SimpleGrid>
        <Divider />
        <HStack justifyContent={"space-between"} flexWrap={"wrap"}>
          <Text>
            © 2023 Turak.kg - Сервис по поиску отелей, квартир посуточно,
            гостевых домов, коттеджи в частном секторе
          </Text>
          <HStack>
            <IconButton
              aria-label="Instagram"
              icon={<BsInstagram />}
              isRound
              bgGradient={
                "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)"
              }
              color={"white"}
              _hover={{
                bgColor: "transparent",
              }}
              as={"a"}
              href="https://www.instagram.com/zhaniko91"
            />

            <IconButton
              colorScheme={"red"}
              aria-label="youtube"
              icon={<BsYoutube />}
              isRound
              as="a"
              href="https://www.youtube.com/@kg_sound_karaoke"
            />

            <IconButton
              colorScheme={"telegram"}
              aria-label="telegram"
              icon={<BsTelegram />}
              isRound
              as="a"
              href="https://t.me/Gemini2_0"
            />
          </HStack>
        </HStack>
      </Container>
    </Box>
  );
});
