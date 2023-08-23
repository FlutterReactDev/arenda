import {
  Box,
  useDisclosure,
  Text,
  DrawerOverlay,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
} from "@chakra-ui/react";

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
        <DrawerContent h="100dvh">
          <DrawerCloseButton />
          <DrawerHeader>Выбрать направления</DrawerHeader>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
