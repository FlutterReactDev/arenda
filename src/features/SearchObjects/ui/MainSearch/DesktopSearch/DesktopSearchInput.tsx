import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListIcon,
  ScaleFade,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { LegacyRef, MutableRefObject, forwardRef, useState } from "react";
import { MdApartment } from "react-icons/md";

interface DesktopSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  trigger: () => void;
}

export const DesktopSearchInput = forwardRef<
  MutableRefObject<HTMLDivElement>,
  DesktopSearchInputProps
>((props, ref) => {
  const { onChange, value, trigger } = props;
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
      ref={ref as LegacyRef<HTMLDivElement>}
    >
      <InputGroup w="full" h={"full"} border={"none"}>
        <Input
          h={"auto"}
          border={"none"}
          borderLeftRadius={"full"}
          outline={"none"}
          placeholder="Куда едем"
          padding={0}
          paddingLeft={"5"}
          paddingTop={"5"}
          minW={"full"}
          _placeholder={{
            fontWeight: "medium",
            fontSize: "17px",
            color: "black",
          }}
          _focusVisible={{
            boxShadow: "none",
          }}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          fontWeight={"medium"}
        />

        <InputLeftElement
          paddingLeft={"5"}
          paddingTop={"0"}
          width={"auto"}
          height={"auto"}
        >
          <Text
            fontWeight="medium"
            fontSize="14px"
            lineHeight="20px"
            color={"gray.300"}
          >
            Курорт, город или адрес
          </Text>
        </InputLeftElement>
      </InputGroup>
      <Box
        position="absolute"
        bottom={"-20px"}
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
            boxShadow={"lg"}
            maxW="full"
            w={"full"}
            p={"2"}
            background="white"
            rounded={"lg"}
          >
            <Text>Популярные направления </Text>
            <List color="blackAlpha.800" spacing={3} mt={2}>
              <Flex
                alignItems="flex-start"
                onClick={() => {
                  onChange("Бостери");
                  trigger();
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
                    Бостери
                  </Text>
                  <Text color="gray.500" fontSize={"small"}>
                    Ыссык-кол
                  </Text>
                </Stack>
              </Flex>
            </List>
          </Box>
        </ScaleFade>
      </Box>
    </Box>
  );
});
