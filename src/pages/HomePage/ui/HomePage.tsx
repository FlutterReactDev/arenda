import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { MainSearch } from "@features/SearchObjects";
const HomePage = () => {
  return (
    <Box bgColor={"blackAlpha.50"} py={12}>
      <main>
        <Heading
          color="blackAlpha.900"
          size={["2xl", "3xl"]}
          textAlign="center"
        >
          Ваш отдых начинается здесь
        </Heading>
        <Text
          color="blackAlpha.300"
          fontWeight={"bold"}
          textAlign="center"
          mt={"4"}
          fontSize={"larger"}
        >
          Квартиры, отели, гостевые дома — по всему Кыргызстану
        </Text>
        <MainSearch />
        <Box mt={"6"}>
          <Heading color="blackAlpha.900" size="xl" textAlign="center" mt={16}>
            Популярные объекты
          </Heading>
        </Box>
        <Box mt={"6"}>
          <Heading color="blackAlpha.900" size="xl" textAlign="center" mt={16}>
            Определенно рекомендуем
          </Heading>
          <Container maxW="container.xl">
            {/* <Slider
              slidesPerView={4}
              breakpoint={{
                "@1.00": {
                  slidesPerView: 4,
                },
                "@0.90": {
                  slidesPerView: 3,
                },
                "@0.70": {
                  slidesPerView: 2,
                },
                "@0.40": {
                  slidesPerView: 1,
                },
              }}
            >
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
            </Slider> */}
          </Container>
        </Box>
      </main>
    </Box>
  );
};

export default HomePage;
