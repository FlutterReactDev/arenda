import { Center, Heading } from "@chakra-ui/react";
import {
  Button,
  FormControl,
  Flex,
  Stack,
  useColorModeValue,
  HStack,
} from "@chakra-ui/react";
import { PinInput, PinInputField } from "@chakra-ui/react";

const VerifyPage = () => {
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
        maxW={"2xl"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={10}
      >
        <Center>
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Подтвердите Ваш электронный адрес
          </Heading>
        </Center>
        <Center
          fontSize={"lg"}
          color={useColorModeValue("gray.800", "gray.400")}
        >
          Мы отправили код на вашу электронную почту
        </Center>
        <Center
          fontSize={"xl"}
          fontWeight="medium"
          color={useColorModeValue("gray.800", "gray.400")}
        >
          denaeshev@gmail.com
        </Center>
        <FormControl>
          <Center>
            <HStack>
              <PinInput size="lg">
                <PinInputField />
                <PinInputField />
                <PinInputField />
                <PinInputField />
              </PinInput>
            </HStack>
          </Center>
        </FormControl>
        <Stack spacing={6}>
          <Button colorScheme="red">Подтвердить</Button>
        </Stack>
      </Stack>
    </Flex>
  );
};

export default VerifyPage;
