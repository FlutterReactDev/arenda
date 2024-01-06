import { Box, Container } from "@chakra-ui/react";
import { Table } from "@features/ObjectTable";

const MyObjectsPage = () => {
  return (
    <Box p={4} bgColor={"blackAlpha.50"}>
      <Container maxW="container.xl">
        <Table />
      </Container>
    </Box>
  );
};

export default MyObjectsPage;
