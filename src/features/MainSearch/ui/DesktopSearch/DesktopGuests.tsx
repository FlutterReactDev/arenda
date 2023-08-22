import { SearchIcon } from "@chakra-ui/icons";
import {
  HStack,
  Button,
  Divider,
  Text,
  useDisclosure,
  Box,
  ScaleFade,
} from "@chakra-ui/react";
import { useState } from "react";

export const DesktopGuests = () => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isHidden, setIsHidden] = useState(false);
  return (
    <Box
      position="relative"
      maxW="250px"
      w={"full"}
      onFocus={() => {
        onOpen();
        setIsHidden(true);
      }}
      onBlur={onClose}
      tabIndex={1}
    >
      <HStack
        border={"1px solid"}
        borderColor="gray.200"
        gap={0}
        cursor={"pointer"}
        borderRightRadius={"full"}
        justifyContent={"space-between"}
        pr={"1"}
      >
        <Box p={"2"} h={"full"}>
          <Text color="blackAlpha.700" fontSize={"sm"}>
            Гости
          </Text>
          <Text>2 Взрослых</Text>
        </Box>

        <Button colorScheme="red" w={12} h={12} borderRadius={"full"}>
          <SearchIcon />
        </Button>
      </HStack>
      <Box
        position="absolute"
        bottom={"-10px"}
        left={0}
        transform={"translateY(100%)"}
        zIndex={!isHidden ? "hide" : "popover"}
        w="full"
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
            w="full"
            p={"2"}
            background="white"
            border="1px solid"
            borderColor="gray.400"
            rounded={"lg"}
          >
            <HStack justifyContent={"space-between"} p={"4"}>
              <Box>
                Взрослые
                <Box>от 18 лет</Box>
              </Box>
              <HStack gap={"2"}>
                <Button rounded={"full"} p={4}>
                  +
                </Button>
                <Box as="span">0</Box>
                <Button rounded={"full"} p={4}>
                  -
                </Button>
              </HStack>
            </HStack>
            <Divider />
            <HStack justifyContent={"space-between"} p={"4"}>
              <Box>
                Взрослые
                <Box>от 18 лет</Box>
              </Box>
              <HStack gap={"2"}>
                <Button rounded={"full"} p={4}>
                  +
                </Button>
                <Box as="span">0</Box>
                <Button rounded={"full"} p={4}>
                  -
                </Button>
              </HStack>
            </HStack>
            <Divider />
            <Box p={4}>
              <Button w="full">Готово</Button>
            </Box>
          </Box>
        </ScaleFade>
      </Box>
    </Box>
  );
};
