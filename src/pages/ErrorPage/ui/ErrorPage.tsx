import {
  Button,
  Center,
  ChakraProvider,
  Stack,
  Text,
  theme,
} from "@chakra-ui/react";

export const ErrorPage = () => {
  const reloadPage = () => {
    location.reload();
  };

  return (
    <ChakraProvider theme={theme}>
      <Center minH={"80dvh"}>
        <Stack>
          <Text>Произошла непредвиденная ошибка</Text>
          <Button onClick={reloadPage}>Обновить страницу</Button>
        </Stack>
      </Center>
    </ChakraProvider>
  );
};
