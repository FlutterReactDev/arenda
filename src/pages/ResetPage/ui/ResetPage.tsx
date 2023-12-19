import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
const ResetPage = () => {
  return (
    <Flex
      minH={"70vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        spacing={4}
        w={"full"}
        maxW={"lg"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Введите новый пароль
        </Heading>
        <FormControl id="email" isRequired>
          <FormLabel>Адрес электронной почты</FormLabel>
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Пароль</FormLabel>
          <Input type="password" />
        </FormControl>
        <Stack spacing={6}>
          <Button colorScheme="red">Изменить</Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ResetPage;
