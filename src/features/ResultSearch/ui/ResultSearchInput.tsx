import { SearchIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Link,
  Box,
  Text,
  Input,
  List,
  Flex,
  ListIcon,
  InputProps,
  SlideFade,
} from "@chakra-ui/react";
import { useState } from "react";

export const ResultSearchInput = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isHidden, setIsHidden] = useState(false);
  const isSelected: InputProps = {
    boxShadow: "0 0 15px 0 rgba(0,0,0,.14)",
    bgColor: "white",
  };
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
      pl={2}
      h={"full"}
      minH={"full"}
    >
      <Input
        placeholder="Курорт, город или адрес"
        border={"none"}
        rounded={"full"}
        h={"full"}
        p={"4"}
        pl={"6"}
        minH={"full"}
        _focus={{
          outline: "none",
          border: "none",
          boxShadow: "0 0 15px 0 rgba(0,0,0,.14)",
        }}
        _placeholder={{
          fontWeight: "medium",
          fontSize: "14px",
          lineHeight: "20px",
        }}
        tabIndex={-1}
        {...(isHidden && isSelected)}
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
        <SlideFade
          onAnimationComplete={() => {
            if (!isOpen) {
              setIsHidden(false);
            }
          }}
          offsetY={"60px"}
          in={isOpen}
        >
          <Box
            maxW={{ base: "96", "2xl": "full" }}
            w={{ base: "96", "2xl": "full" }}
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
        </SlideFade>
      </Box>
    </Box>
  );
};
