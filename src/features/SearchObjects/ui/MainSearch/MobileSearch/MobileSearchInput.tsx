import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListIcon,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { LegacyRef, MutableRefObject, forwardRef, useEffect } from "react";
import { MdApartment } from "react-icons/md";
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
          bgColor={"white"}
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

              <Box mt={"4"} p="4">
                <List color="blackAlpha.800" spacing={3} mt={2}>
                  <Flex
                    alignItems="flex-start"
                    onClick={() => {
                      onChange("Балыкчы");
                      onClose();
                    }}
                    cursor={"pointer"}
                  >
                    <ListIcon
                      as={MdApartment}
                      fontSize={"3xl"}
                      color="blackAlpha.800"
                    />
                    <Stack
                      spacing={0}
                      borderBottom={"1px solid"}
                      borderColor={"gray.300"}
                      w="full"
                      pb={2}
                    >
                      <Text fontWeight={"medium"} fontSize={"sm"}>
                        Балыкчы
                      </Text>
                      <Text color="gray.500" fontSize={"small"}>
                        Ыссык-кол
                      </Text>
                    </Stack>
                  </Flex>
                </List>
              </Box>
            </DrawerBody>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
});
