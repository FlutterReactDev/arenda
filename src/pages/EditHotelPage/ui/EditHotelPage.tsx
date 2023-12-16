import { Box, Container } from "@chakra-ui/react";
import { EditHotel } from "@features/EditHotel";

const EditHotelPage = () => {
  return (
    <Box pt={4} pb={"24"} bgColor={"blackAlpha.100"}>
      <Container maxW={"container.md"}>
        <EditHotel />
      </Container>
    </Box>
  );
};

export default EditHotelPage;
