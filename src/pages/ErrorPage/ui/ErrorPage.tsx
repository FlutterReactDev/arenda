import { Button, Center, Text } from "@chakra-ui/react";

export const ErrorPage = () => {
  const reloadPage = () => {
    location.reload();
  };

  return (
    <Center minH={"80dvh"}>
      <Text>Произошла непредвиденная ошибка</Text>
      <Button onClick={reloadPage}>Обновить страницу</Button>
    </Center>
  );
};
