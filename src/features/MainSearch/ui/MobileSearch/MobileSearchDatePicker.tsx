import {
  HStack,
  Box,
  useDisclosure,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";

export const MobileSearchDatePicker = () => {
  const { onClose, onOpen, isOpen } = useDisclosure();
  return (
    <Box w={"full"}>
      <HStack w="full" gap={"2"}>
        <Box
          rounded={"full"}
          h={"50px"}
          px={"4"}
          w={"full"}
          onClick={onOpen}
          border={"1px solid"}
          borderColor={"gray.200"}
          display={"flex"}
          flexDirection="column"
          justifyContent="center"
        >
          <Text
            fontWeight="medium"
            fontSize="12px"
            lineHeight="20px"
            color={"gray.300"}
          >
            Заезд
          </Text>
          <Text fontWeight="medium" fontSize="14px" lineHeight="20px">
            Когда
          </Text>
        </Box>
        <Box
          rounded={"full"}
          h={"50px"}
          px={"4"}
          onClick={onOpen}
          border={"1px solid"}
          w={"full"}
          borderColor={"gray.200"}
          display={"flex"}
          flexDirection="column"
          justifyContent="center"
        >
          <Text
            fontWeight="medium"
            fontSize="12px"
            lineHeight="20px"
            color={"gray.300"}
          >
            Заезд
          </Text>
          <Text fontWeight="medium" fontSize="14px" lineHeight="20px">
            Когда
          </Text>
        </Box>
      </HStack>
      <Drawer size="full" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Выбрать направления</DrawerHeader>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
