import {
  Box,
  useDisclosure,
  Text,
  DrawerOverlay,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Input,
  InputGroup,
  InputLeftElement,
  Flex,
  Center,
  VStack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
export const MobileSearchInput = () => {
  const { onClose, onOpen, isOpen } = useDisclosure();

  return (
    <Box w={"full"}>
      <Box
        rounded={"full"}
        h={"50px"}
        px={"4"}
        onClick={onOpen}
        border={"1px solid"}
        borderColor={"gray.200"}
        display={"flex"}
        flexDirection="column"
        justifyContent="center"
        cursor="pointer"
      >
        <Text
          fontWeight="medium"
          fontSize="12px"
          lineHeight="20px"
          color={"gray.300"}
        >
          Курорт, город или адрес
        </Text>
        <Text fontWeight="medium" fontSize="14px" lineHeight="20px">
          Киргизия
        </Text>
      </Box>
      <Drawer size="full" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <DrawerCloseButton />
            <DrawerHeader>Выбрать направления</DrawerHeader>

            <DrawerBody p="0">
              <InputGroup>
                <Input placeholder="Курорт, город или адрес" />
                <InputLeftElement>
                  <SearchIcon />
                </InputLeftElement>
              </InputGroup>

              <Box
                mt={"4"}
                border="1px solid"
                borderColor="gray.400"
                borderRadius="lg"
                p="4"
              >
                <VStack alignItems={"start"}>
                  <Flex alignItems="center" gap="2" cursor="pointer">
                    <Center
                      w="8"
                      h="8"
                      rounded="full"
                      bgColor={"gray.600"}
                      color="white"
                    >
                      <SearchIcon />
                    </Center>

                    <Text>Что то Что то Что то</Text>
                  </Flex>
                  <Flex alignItems="center" gap="2" cursor="pointer">
                    <Center
                      w="8"
                      h="8"
                      rounded="full"
                      bgColor={"gray.600"}
                      color="white"
                    >
                      <SearchIcon />
                    </Center>

                    <Text>Что то Что то Что то</Text>
                  </Flex>
                  <Flex alignItems="center" gap="2" cursor="pointer">
                    <Center
                      w="8"
                      h="8"
                      rounded="full"
                      bgColor={"gray.600"}
                      color="white"
                    >
                      <SearchIcon />
                    </Center>

                    <Text>Что то Что то Что то</Text>
                  </Flex>
                </VStack>
              </Box>
              <Box
                mt={"4"}
                border="1px solid"
                borderColor="gray.400"
                borderRadius="lg"
                p="4"
              >
                <VStack alignItems={"start"}>
                  <Flex alignItems="center" gap="2" cursor="pointer">
                    <Center
                      w="8"
                      h="8"
                      rounded="full"
                      bgColor={"gray.600"}
                      color="white"
                    >
                      <SearchIcon />
                    </Center>

                    <Text>Что то Что то Что то</Text>
                  </Flex>
                  <Flex alignItems="center" gap="2" cursor="pointer">
                    <Center
                      w="8"
                      h="8"
                      rounded="full"
                      bgColor={"gray.600"}
                      color="white"
                    >
                      <SearchIcon />
                    </Center>

                    <Text>Что то Что то Что то</Text>
                  </Flex>
                  <Flex alignItems="center" gap="2" cursor="pointer">
                    <Center
                      w="8"
                      h="8"
                      rounded="full"
                      bgColor={"gray.600"}
                      color="white"
                    >
                      <SearchIcon />
                    </Center>

                    <Text>Что то Что то Что то</Text>
                  </Flex>
                </VStack>
              </Box>
            </DrawerBody>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
