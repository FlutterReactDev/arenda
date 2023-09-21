import { SearchIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Link,
  Box,
  Text,
  Input,
  ScaleFade,
  List,
  Flex,
  ListIcon,
} from "@chakra-ui/react";
import { useState } from "react";

export const ResultSearchInput = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHidden, setIsHidden] = useState(false);

  return (
    <Box
      position="relative"
      w="full"
      onFocus={() => {
        onOpen();
        setIsHidden(true);
      }}
      onBlur={onClose}
      tabIndex={1}
    >
      <Input
        placeholder="Курорт, город или адрес"
        border={"none"}
        rounded={"full"}
        _focus={{
          outline: "none",
          border: "none",
          boxShadow: "0 0 15px 0 rgba(0,0,0,.14)",
          bgColor: "white",
        }}
      />
      <Box
        position="absolute"
        bottom={"-10px"}
        left={0}
        transform={"translateY(100%)"}
        zIndex={!isHidden ? "hide" : "popover"}
        w="full"
        display={!isHidden ? "none" : "block"}
      >
        <ScaleFade
          onAnimationComplete={() => {
            if (!isOpen) {
              setIsHidden(false);
            }
          }}
          initialScale={0.9}
          in={isOpen}
        >
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
