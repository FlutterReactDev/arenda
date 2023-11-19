import { RouteName } from "@app/providers/RouterProvier/config/routeConfig";
import { Box, Container, Stack, Heading, Button } from "@chakra-ui/react";
import { RegisterForm } from "@features/RegisterForm";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  return (
    <Box bgColor={"blackAlpha.50"}>
      <Container maxW="2xl" py={4}>
        <Stack w={"full"} h="full" justifyContent={"center"}>
          <Box bgColor={"white"} p={4} rounded={"lg"}>
            <Heading size={"lg"} mb={3}>
              Регистрация
            </Heading>
            <RegisterForm />
            <Button
              as={Link}
              colorScheme="red"
              to={RouteName.LOGIN_PAGE}
              mt={2}
              variant={"link"}
            >
              Есть аккаунт?
            </Button>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default RegisterPage;
