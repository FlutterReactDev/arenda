import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { Container, Stack, Box, Heading, Button } from "@chakra-ui/react";
import { LoginForm } from "@features/LoginForm";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <Box bgColor={"blackAlpha.50"}>
      <Container maxW="xl" h={"66dvh"}>
        <Stack w={"full"} h="full" justifyContent={"center"}>
          <Box bgColor={"white"} p={4} rounded={"lg"}>
            <Heading size={"lg"} mb={3}>
              Вход
            </Heading>
            <LoginForm />
            <Button
              as={Link}
              to={RouteName.REGISTER_PAGE}
              colorScheme="red"
              mt={2}
              variant="link"
            >
              Нет аккаунта?
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default LoginPage;
