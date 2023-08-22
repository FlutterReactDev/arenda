import { SearchIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  InputGroup,
  Input,
  InputLeftElement,
  ScaleFade,
  List,
  Box,
  ListIcon,
  Text,
  Flex,
  Link,
} from "@chakra-ui/react";

// interface DesktopSearchInputProps {}

export const DesktopSearchInput = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position="relative"
      w="full"
      onFocus={onOpen}
      onBlur={onClose}
      tabIndex={1}
    >
      <InputGroup w="full" h={"full"}>
        <Input
          boxShadow="xs"
          h={"auto"}
          borderLeft={"0"}
          borderLeftRadius={"full"}
          placeholder="Куда едем"
          padding={0}
          paddingLeft={"5"}
          paddingTop={"3"}
          minW={"full"}
        />

        <InputLeftElement
          paddingLeft={"5"}
          paddingTop={"2"}
          width={"auto"}
          height={"auto"}
        >
          <Text fontSize="sm">Курорт, город или адрес</Text>
        </InputLeftElement>
      </InputGroup>
      <Box
        position="absolute"
        bottom={"-10px"}
        left={0}
        transform={"translateY(100%)"}
        zIndex={isOpen ? "popover" : "hide"}
        w="full"
      >
        <ScaleFade initialScale={0.9} in={isOpen}>
          <Box
            maxW="full"
            w={"full"}
            p={"2"}
            background="white"
            border="1px solid"
            borderColor="gray.400"
            rounded={"lg"}
          >
            <Text>Популярные направления </Text>
            <List color="blackAlpha.800" fontSize="xs" spacing={3} mt={2}>
              <Flex alignItems="center">
                <ListIcon as={SearchIcon} color="blackAlpha.800" />
                <Link>Санкт-Петербург, Санкт-Петербург и область, Россия</Link>
              </Flex>
            </List>
          </Box>
        </ScaleFade>
      </Box>
    </Box>
  );
};
