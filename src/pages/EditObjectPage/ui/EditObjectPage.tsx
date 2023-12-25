import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Container, Button } from "@chakra-ui/react";
import { EditObject } from "@features/EditObject";

import { Link } from "react-router-dom";

const EdtiObjectPage = () => {
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

        <EditObject />
      </Container>
    </Box>
  );
};

export default EdtiObjectPage;
