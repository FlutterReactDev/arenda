import { Box, Container } from "@chakra-ui/react";
import { EditRoom } from "@features/EditRoom";

const EditRoomPage = () => {
  return (
    <Box pt={4} pb={"24"} bgColor={"blackAlpha.100"}>
      <Container maxW={"container.md"}>
        <EditRoom />
      </Container>
    </Box>
  );
};

export default EditRoomPage;
