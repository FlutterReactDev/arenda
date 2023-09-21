import { ObjectCard } from "@entites/Object";
import { Box, Grid, GridItem, VStack, Text } from "@chakra-ui/react";

import { SearchMap } from "@entites/Map";
import { Header } from "@widgets/Header";
import { Footer } from "@widgets/Footer";
import { ResultSearch } from "@features/ResultSearch";

export const SearchResultPage = () => {
  return (
    <>
      <Header />
      <Grid
        templateAreas={`"header header header"
                  "filter main map"
                  `}
        gridTemplateRows={"auto 1fr"}
        gridTemplateColumns={"260px 385px 1fr"}
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
        >
          <Box h={"16"} as="header" bgColor={"white"}>
            <ResultSearch />
          </Box>
        </GridItem>
        <GridItem
          position={"sticky"}
          overflow={"hidden"}
          top={16}
          h={"100dvh"}
          pl={4}
          area={"filter"}
        >
          <Box
            w="full"
            h="full"
            bgColor="white"
            as="aside"
            rounded={"md"}
          ></Box>
        </GridItem>
        <GridItem area={"main"} minH={"100dvh"}>
          <VStack spacing={10}>
            <ObjectCard />
            <ObjectCard />
            <ObjectCard />
            <ObjectCard />
            <ObjectCard />
            <ObjectCard />
          </VStack>
        </GridItem>
        <GridItem
          position={"sticky"}
          overflow={"hidden"}
          top={16}
          area={"map"}
          h={"100dvh"}
        >
          <Box w="full" h="full">
            <SearchMap
              inputHtmlMarkers={[
                {
                  coordinates: [77.1757361557851, 42.64472838750217],
                },
                {
                  coordinates: [77.17437800783786, 42.645238409366385],
                },
                {
                  coordinates: [77.17292784537554, 42.645017610523716],
                },
                {
                  coordinates: [77.15253297654283, 42.63014881066871],
                },
                {
                  coordinates: [77.1981040743652, 42.658896258910474],
                },
                {
                  coordinates: [77.15253297654283, 42.63014881066871],
                },
              ]}
            />
          </Box>
        </GridItem>
      </Grid>
      <Footer />
    </>
  );
};
