import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const ForgotPage = () => {
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
        <Heading lineHeight={1.1}>Забыли пороль?</Heading>
        <Text
          fontSize={{ base: "md", sm: "lg" }}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Вы получите электронное письмо со ссылкой для сброса.
        </Text>
        <FormControl id="email">
          <Input
            placeholder="your-email@example.com"
            _placeholder={{ color: "gray.500" }}
            type="email"
          />
        </FormControl>
        <Stack spacing={6}>
          <Button colorScheme="red">Сбросить</Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default ForgotPage;
