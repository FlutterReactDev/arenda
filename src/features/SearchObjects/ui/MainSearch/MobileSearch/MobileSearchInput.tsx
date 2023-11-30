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
import { LegacyRef, MutableRefObject, forwardRef, useEffect } from "react";
interface MobileSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  hasError: boolean;
}
export const MobileSearchInput = forwardRef<
  MutableRefObject<HTMLDivElement>,
  MobileSearchInputProps
>((props, ref) => {
  const { onChange, value, hasError } = props;
  const { onClose, onOpen, isOpen } = useDisclosure();
  useEffect(() => {
    if (hasError) {
      onOpen();
    }
  }, [hasError, onOpen]);
  return (
    <>
      <Box w={"full"} ref={ref as LegacyRef<HTMLDivElement>}>
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
            {value || "Курорт, город или адрес"}
          </Text>
        </Box>
      </Box>
      <Drawer placement="bottom" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent h={"90dvh"} roundedTop={"2xl"}>
          <DrawerBody>
            <DrawerCloseButton />
            <DrawerHeader>Выбрать направления</DrawerHeader>

            <DrawerBody p="0">
              <InputGroup>
                <Input
                  onChange={(e) => {
                    onChange(e.target.value);
                  }}
                  value={value || ""}
                  placeholder="Курорт, город или адрес"
                />
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
                  <Flex
                    alignItems="center"
                    gap="2"
                    cursor="pointer"
                    onClick={() => {
                      onChange("Кыргызстан, Ыссык-кол, Бостери");
                    }}
                  >
                    <Center
                      w="8"
                      h="8"
                      rounded="full"
                      bgColor={"gray.600"}
                      color="white"
                    >
                      <SearchIcon />
                    </Center>

                    <Text>Кыргызстан, Ыссык-кол, Бостери</Text>
                  </Flex>
                </VStack>
              </Box>
            </DrawerBody>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
});
