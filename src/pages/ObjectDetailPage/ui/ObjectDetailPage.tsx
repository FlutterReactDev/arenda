import { Box, Container, Grid, GridItem } from "@chakra-ui/react";
import { ObjectDetailCard } from "@entites/Object";
import { BookingForm } from "@features/BookingForm";
import { Footer } from "@widgets/Footer";
import { Header } from "@widgets/Header";

export const ObjectDetailPage = () => {
  return (
    <Box bgColor={"blackAlpha.50"}>
      <Header />
      <Container maxW={"8xl"}>
        <Grid
          templateAreas={`"content aside"`}
          gridTemplateColumns={"830px 360px"}
          gap={6}
        >
          <GridItem area={"content"}>
            <ObjectDetailCard />
          </GridItem>
          <GridItem area={"aside"} position={"sticky"} top={0} h={"100px"} zIndex={"dropdown"}>
            <Box bgColor={"white"} rounded={"xl"} p={4}>
              <BookingForm />
            </Box>
          </GridItem>
        </Grid>
      </Container>

      <Footer />
    </Box>
  );
};
