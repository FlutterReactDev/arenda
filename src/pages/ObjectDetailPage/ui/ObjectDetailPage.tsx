import { Box, Grid, GridItem } from "@chakra-ui/react";
import { ObjectDetailCard } from "@entites/Object";
import { BookingForm } from "@widgets/BookingForm";

const ObjectDetailPage = () => {
  return (
    <Box bgColor={"blackAlpha.50"} w={"full"}>
      <Grid
        templateAreas={`"leftSpace content aside rightSpace"`}
        gridTemplateColumns={"1fr minmax(600px,830px) 360px 1fr"}
        alignItems={"start"}
        gap={6}
      >
        <GridItem
          position={"sticky"}
          top={0}
          area={"aside"}
          bgColor={"white"}
          rounded={"lg"}
          p={3}
        >
          <BookingForm />
        </GridItem>
        <GridItem area={"leftSpace"}></GridItem>
        <GridItem area={"content"}>
          <ObjectDetailCard />
        </GridItem>
        <GridItem area={"rightSpace"}></GridItem>
      </Grid>
    </Box>
  );
};

export default ObjectDetailPage;
