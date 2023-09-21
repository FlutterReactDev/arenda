import {
  useDisclosure,
  Box,
  HStack,
  Button,
  Divider,
  Text,
  BoxProps,
  SlideFade,
} from "@chakra-ui/react";
import { memo, useState } from "react";

export const ResultSearchGuest = memo(() => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const [isHidden, setIsHidden] = useState(false);
  const isSelected: BoxProps = {
    boxShadow: "0 0 15px 0 rgba(0,0,0,.14)",
    bgColor: "white",
  };
  return (
    <Box
      position="relative"
      maxW="350px"
      w={"full"}
      onFocus={() => {
        onOpen();
        setIsHidden(true);
      }}
      onBlur={onClose}
      tabIndex={3}
    >
      <Box
        p={"2"}
        pl="4"
        h={"full"}
        rounded={"full"}
        w={"80%"}
        {...(isOpen && isSelected)}
      >
        <Text
          fontWeight="medium"
          fontSize="14px"
          lineHeight="20px"
          color={"gray.300"}
        >
          Гости
        </Text>
        <Text fontWeight="medium" fontSize="17px">
          2 Взрослых
        </Text>
      </Box>

      <Box
        position="absolute"
        bottom={"-10px"}
        left={0}
        transform={"translateY(100%)"}
        zIndex={!isHidden ? "hide" : "popover"}
        w="full"
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
        </SlideFade>
      </Box>
    </Box>
  );
});
