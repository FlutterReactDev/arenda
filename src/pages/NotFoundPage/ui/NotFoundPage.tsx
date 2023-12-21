import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Box, Button, Center, Heading, Stack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <Box h="80dvh">
      <Center h="full" w="full">
        <Stack h="full" alignItems={"center"} justifyContent={"center"}>
          <Heading>404 Страница не найдена</Heading>
          <Button
            as={Link}
            to={RouteName.MAIN_PAGE}
            colorScheme="facebook"
            fontSize={"lg"}
            leftIcon={<ChevronLeftIcon />}
          >
            Вернуться на главную
          </Button>
        </Stack>
      </Center>
    </Box>
  );
};

export default NotFoundPage;
