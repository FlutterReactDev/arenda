import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Button, Container } from "@chakra-ui/react";
import { EditHotel } from "@features/EditHotel";
import { Link } from "react-router-dom";

const EditHotelPage = () => {
  return (
    <Box pt={4} pb={"24"} bgColor={"blackAlpha.100"}>
      <Container maxW={"container.md"}>
        <Button
          leftIcon={<ChevronLeftIcon />}
          as={Link}
          to={RouteName.MY_OBJECTS}
          mb={4}
          colorScheme="facebook"
        >
          Назад
        </Button>

        <EditHotel />
      </Container>
    </Box>
  );
};

export default EditHotelPage;
