import { Box, Grid, GridItem } from "@chakra-ui/react";
import { ObjectDetailCard } from "@entites/Object";
import { BookingForm } from "@features/BookingForm";

const ObjectDetailPage = () => {
  return (
    <Box bgColor={"blackAlpha.50"} w={"full"}>
      <Grid
        templateAreas={`"leftSpace content aside rightSpace"`}
        gridTemplateColumns={"1fr minmax(600px,830px) 360px 1fr"}
        gap={6}
        overflow={"hidden"}
      >
        <GridItem area={"leftSpace"}></GridItem>
        <GridItem area={"content"}>
          <ObjectDetailCard />
        </GridItem>
        <GridItem
          area={"aside"}
          position={"sticky"}
          top={0}
          h={"100px"}
          zIndex={"dropdown"}
        >
          <Box bgColor={"white"} rounded={"xl"} p={4}>
            <BookingForm />
          </Box>
        </GridItem>
        <GridItem area={"rightSpace"}></GridItem>
      </Grid>
    </Box>
  );
};

export default ObjectDetailPage;
