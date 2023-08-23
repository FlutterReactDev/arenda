import {
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  Box,
  Text,
  DrawerBody,
} from "@chakra-ui/react";

export const MobileSearchGuests = () => {
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
          Гости
        </Text>
        <Text fontWeight="medium" fontSize="14px" lineHeight="20px">
          9 взрослых 2 ребенка
        </Text>
      </Box>
      <Drawer size="full" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent >
          <DrawerBody>
            <DrawerCloseButton />
            <DrawerHeader>Выбрать направления</DrawerHeader>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
