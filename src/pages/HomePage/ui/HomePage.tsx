import { Box, Heading, Text } from "@chakra-ui/react";
import { MainSearch } from "@features/SearchObjects";
const HomePage = () => {
  return (
    <Box bgColor={"blackAlpha.50"} py={12} minHeight={"60dvh"}>
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
      </main>
    </Box>
  );
};

export default HomePage;
